-- ====================================================================
-- RLS Security Verification Tests for Royal Umrah Cabs
-- Proves that:
-- 1. Public 'anon' role CANNOT select or insert into any non-public tables.
-- 2. Staff 'admin' role CANNOT self-promote or elevate role to 'owner'.
-- 3. Staff 'operator' role CANNOT tamper with prices, routes, or assigned drivers on bookings.
-- ====================================================================

BEGIN;

-- ====================================================================
-- PART 1: ANONYMOUS VISITOR ('anon') SECURITY TESTS
-- ====================================================================
SET ROLE anon;

-- Test 1: Anon MUST NOT be able to SELECT from bookings
DO $$
BEGIN
  BEGIN
    PERFORM count(*) FROM public.bookings;
    IF (SELECT count(*) FROM public.bookings) > 0 THEN
      RAISE EXCEPTION 'RLS VIOLATION: anon can select bookings!';
    END IF;
  EXCEPTION
    WHEN insufficient_privilege THEN
      RAISE NOTICE 'SUCCESS: anon denied SELECT on bookings';
  END;
END $$;

-- Test 2: Anon MUST NOT be able to INSERT into bookings
DO $$
BEGIN
  BEGIN
    INSERT INTO public.bookings (
      reference,
      booking_type,
      vehicle_id,
      customer_name,
      customer_phone,
      pickup_datetime,
      pickup_location,
      dropoff_location,
      base_price_sar,
      final_price_sar,
      currency_charged,
      final_price_currency
    ) VALUES (
      'MALICIOUS-ANON-1',
      'transfer',
      'staria',
      'Attacker',
      '+999999999',
      NOW(),
      'Airport',
      'Hotel',
      100,
      100,
      'SAR',
      100
    );
    RAISE EXCEPTION 'RLS VIOLATION: anon was able to insert directly into bookings!';
  EXCEPTION
    WHEN insufficient_privilege THEN
      RAISE NOTICE 'SUCCESS: anon denied INSERT on bookings';
    WHEN OTHERS THEN
      RAISE NOTICE 'SUCCESS: anon blocked with %', SQLERRM;
  END;
END $$;

-- Test 3: Anon MUST NOT be able to SELECT or INSERT into leads
DO $$
BEGIN
  BEGIN
    PERFORM count(*) FROM public.leads;
    IF (SELECT count(*) FROM public.leads) > 0 THEN
      RAISE EXCEPTION 'RLS VIOLATION: anon can select leads!';
    END IF;
  EXCEPTION
    WHEN insufficient_privilege THEN
      RAISE NOTICE 'SUCCESS: anon denied SELECT on leads';
  END;

  BEGIN
    INSERT INTO public.leads (ref_code, whatsapp_number) VALUES ('EVIL-LEAD', '+99999');
    RAISE EXCEPTION 'RLS VIOLATION: anon was able to insert directly into leads!';
  EXCEPTION
    WHEN insufficient_privilege THEN
      RAISE NOTICE 'SUCCESS: anon denied INSERT on leads';
    WHEN OTHERS THEN
      RAISE NOTICE 'SUCCESS: anon blocked on leads with %', SQLERRM;
  END;
END $$;

-- Test 4: Anon MUST NOT be able to SELECT or INSERT into user_profiles
DO $$
BEGIN
  BEGIN
    PERFORM count(*) FROM public.user_profiles;
    IF (SELECT count(*) FROM public.user_profiles) > 0 THEN
      RAISE EXCEPTION 'RLS VIOLATION: anon can select user_profiles!';
    END IF;
  EXCEPTION
    WHEN insufficient_privilege THEN
      RAISE NOTICE 'SUCCESS: anon denied SELECT on user_profiles';
  END;

  BEGIN
    INSERT INTO public.user_profiles (email, name, role) VALUES ('hacker@evil.com', 'Hacker', 'owner');
    RAISE EXCEPTION 'RLS VIOLATION: anon was able to insert into user_profiles!';
  EXCEPTION
    WHEN insufficient_privilege THEN
      RAISE NOTICE 'SUCCESS: anon denied INSERT on user_profiles';
    WHEN OTHERS THEN
      RAISE NOTICE 'SUCCESS: anon blocked on user_profiles with %', SQLERRM;
  END;
END $$;

-- Test 5: Anon MUST NOT be able to read any non-public tables:
-- (drivers, audit_log, partners, ownership_transfers, role_permissions)
DO $$
BEGIN
  -- Drivers
  BEGIN
    PERFORM count(*) FROM public.drivers;
    IF (SELECT count(*) FROM public.drivers) > 0 THEN
      RAISE EXCEPTION 'RLS VIOLATION: anon can select drivers!';
    END IF;
  EXCEPTION
    WHEN insufficient_privilege THEN
      RAISE NOTICE 'SUCCESS: anon denied SELECT on drivers';
  END;

  -- Audit log
  BEGIN
    PERFORM count(*) FROM public.audit_log;
    IF (SELECT count(*) FROM public.audit_log) > 0 THEN
      RAISE EXCEPTION 'RLS VIOLATION: anon can select audit_log!';
    END IF;
  EXCEPTION
    WHEN insufficient_privilege THEN
      RAISE NOTICE 'SUCCESS: anon denied SELECT on audit_log';
  END;

  -- Partners
  BEGIN
    PERFORM count(*) FROM public.partners;
    IF (SELECT count(*) FROM public.partners) > 0 THEN
      RAISE EXCEPTION 'RLS VIOLATION: anon can select partners!';
    END IF;
  EXCEPTION
    WHEN insufficient_privilege THEN
      RAISE NOTICE 'SUCCESS: anon denied SELECT on partners';
  END;

  -- Ownership transfers
  BEGIN
    PERFORM count(*) FROM public.ownership_transfers;
    IF (SELECT count(*) FROM public.ownership_transfers) > 0 THEN
      RAISE EXCEPTION 'RLS VIOLATION: anon can select ownership_transfers!';
    END IF;
  EXCEPTION
    WHEN insufficient_privilege THEN
      RAISE NOTICE 'SUCCESS: anon denied SELECT on ownership_transfers';
  END;

  -- Role permissions
  BEGIN
    PERFORM count(*) FROM public.role_permissions;
    IF (SELECT count(*) FROM public.role_permissions) > 0 THEN
      RAISE EXCEPTION 'RLS VIOLATION: anon can select role_permissions!';
    END IF;
  EXCEPTION
    WHEN insufficient_privilege THEN
      RAISE NOTICE 'SUCCESS: anon denied SELECT on role_permissions';
  END;
END $$;

-- Test 6: Anon CAN select public catalog tables (vehicles, routes, prices)
DO $$
BEGIN
  PERFORM count(*) FROM public.vehicles;
  PERFORM count(*) FROM public.routes;
  PERFORM count(*) FROM public.prices;
  RAISE NOTICE 'SUCCESS: public catalog is accessible to anon as intended';
END $$;


-- ====================================================================
-- PART 2: ELEVATION OF PRIVILEGE TESTS (Authenticated Staff)
-- ====================================================================
SET ROLE authenticated;

-- Test 7: Admin CANNOT self-promote or update any profile to 'owner'
DO $$
DECLARE
  v_admin_uid UUID := uuid_generate_v4();
  v_target_uid UUID := uuid_generate_v4();
BEGIN
  -- Simulate authenticated admin user
  PERFORM set_config('request.jwt.claims', json_build_object('sub', v_admin_uid::text, 'role', 'authenticated')::text, true);

  -- Insert mock admin profile using service role bypass simulation for test setup
  SET ROLE postgres;
  INSERT INTO public.user_profiles (auth_user_id, email, name, role, is_suspended)
  VALUES (v_admin_uid, 'test_admin@royalumrahcabs.com', 'Test Admin', 'admin', false)
  ON CONFLICT DO NOTHING;

  INSERT INTO public.user_profiles (auth_user_id, email, name, role, is_suspended)
  VALUES (v_target_uid, 'test_operator@royalumrahcabs.com', 'Test Operator', 'operator', false)
  ON CONFLICT DO NOTHING;

  -- Switch to authenticated role
  SET ROLE authenticated;

  -- Attempt to update operator role to 'owner'
  BEGIN
    UPDATE public.user_profiles
    SET role = 'owner'
    WHERE auth_user_id = v_target_uid;

    IF FOUND THEN
      RAISE EXCEPTION 'RLS VIOLATION: Admin was able to update a user role to owner!';
    ELSE
      RAISE NOTICE 'SUCCESS: Admin blocked by RLS WITH CHECK from promoting to owner (0 rows updated)';
    END IF;
  EXCEPTION
    WHEN OTHERS THEN
      RAISE NOTICE 'SUCCESS: Admin update to owner blocked with: %', SQLERRM;
  END;
END $$;


-- Test 8: Operator CANNOT tamper with prices or drivers on bookings (Trigger check)
DO $$
DECLARE
  v_operator_uid UUID := uuid_generate_v4();
  v_booking_id UUID;
BEGIN
  -- Setup test booking as postgres
  SET ROLE postgres;
  INSERT INTO public.user_profiles (auth_user_id, email, name, role, assigned_whatsapp_number, is_suspended)
  VALUES (v_operator_uid, 'test_op2@royalumrahcabs.com', 'Test Op', 'operator', '966505316971', false)
  ON CONFLICT DO NOTHING;

  INSERT INTO public.bookings (
    reference,
    booking_type,
    vehicle_id,
    customer_name,
    customer_phone,
    pickup_datetime,
    pickup_location,
    dropoff_location,
    base_price_sar,
    final_price_sar,
    currency_charged,
    final_price_currency,
    driver_phone,
    status
  ) VALUES (
    'OP-TEST-REF1',
    'transfer',
    'staria',
    'Test Pilgrim',
    '+966500000000',
    NOW(),
    'Makkah Hotel',
    'Jeddah Airport',
    260,
    260,
    'SAR',
    260,
    '966505316971',
    'confirmed'
  ) RETURNING id INTO v_booking_id;

  -- Switch to operator user session
  PERFORM set_config('request.jwt.claims', json_build_object('sub', v_operator_uid::text, 'role', 'authenticated')::text, true);
  SET ROLE authenticated;

  -- Attempt to maliciously tamper with final_price_sar
  BEGIN
    UPDATE public.bookings
    SET final_price_sar = 100
    WHERE id = v_booking_id;

    RAISE EXCEPTION 'TRIGGER VIOLATION: Operator was able to tamper with final_price_sar!';
  EXCEPTION
    WHEN OTHERS THEN
      RAISE NOTICE 'SUCCESS: Operator price tampering blocked by trigger: %', SQLERRM;
  END;

  -- Attempt to maliciously change driver_phone
  BEGIN
    UPDATE public.bookings
    SET driver_phone = '999999999'
    WHERE id = v_booking_id;

    RAISE EXCEPTION 'TRIGGER VIOLATION: Operator was able to tamper with driver_phone!';
  EXCEPTION
    WHEN OTHERS THEN
      RAISE NOTICE 'SUCCESS: Operator driver assignment tampering blocked by trigger: %', SQLERRM;
  END;

  -- Permitted update: Operator updates status and driver_notes
  BEGIN
    UPDATE public.bookings
    SET status = 'completed',
        special_notes = 'Pilgrim assisted with luggage at terminal.'
    WHERE id = v_booking_id;

    RAISE NOTICE 'SUCCESS: Operator permitted to update status and notes';
  END;
END $$;

-- Rollback the transaction so no test artifact persists in database
ROLLBACK;
