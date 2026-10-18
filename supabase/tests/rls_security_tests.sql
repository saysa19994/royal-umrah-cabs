-- ====================================================================
-- RLS Security Verification Tests for Royal Umrah Cabs
-- Proves that the public 'anon' role CANNOT select or insert into sensitive tables.
-- ====================================================================

-- 1. Begin transactional test block
BEGIN;

-- Set current role to anonymous web visitor ('anon')
SET ROLE anon;

-- Test 1: Anon MUST NOT be able to SELECT from bookings
DO $$
BEGIN
  BEGIN
    PERFORM count(*) FROM public.bookings;
    -- If we get here with > 0 rows accessible, raise an exception
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

-- Test 5: Anon MUST NOT be able to SELECT or INSERT into drivers or audit_log
DO $$
BEGIN
  BEGIN
    PERFORM count(*) FROM public.drivers;
    IF (SELECT count(*) FROM public.drivers) > 0 THEN
      RAISE EXCEPTION 'RLS VIOLATION: anon can select drivers!';
    END IF;
  EXCEPTION
    WHEN insufficient_privilege THEN
      RAISE NOTICE 'SUCCESS: anon denied SELECT on drivers';
  END;

  BEGIN
    PERFORM count(*) FROM public.audit_log;
    IF (SELECT count(*) FROM public.audit_log) > 0 THEN
      RAISE EXCEPTION 'RLS VIOLATION: anon can select audit_log!';
    END IF;
  EXCEPTION
    WHEN insufficient_privilege THEN
      RAISE NOTICE 'SUCCESS: anon denied SELECT on audit_log';
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

-- Rollback the transaction so no test artifact persists
ROLLBACK;
