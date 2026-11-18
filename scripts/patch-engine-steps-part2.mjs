import { readFileSync, writeFileSync } from 'fs';

let c = readFileSync('src/components/booking/BookingEngine.tsx', 'utf8');

// 1. Update props parameter to accept hideInternalStepper, onStepChange, stepOverride
c = c.replace(
  'export function BookingEngine({\r\n  locale,\r\n  dict,\r\n  settings,\r\n  initialRoute,\r\n  initialVehicle,\r\n  initialDate,\r\n  initialTime,\r\n  initialPassengers,\r\n  initialLuggage,\r\n  initialType = \'transfer\',\r\n  initialDuration,\r\n  initialPickup,\r\n  initialDropoff,\r\n  initialRates,\r\n}: BookingEngineProps)',
  'export function BookingEngine({\r\n  locale,\r\n  dict,\r\n  settings,\r\n  initialRoute,\r\n  initialVehicle,\r\n  initialDate,\r\n  initialTime,\r\n  initialPassengers,\r\n  initialLuggage,\r\n  initialType = \'transfer\',\r\n  initialDuration,\r\n  initialPickup,\r\n  initialDropoff,\r\n  initialRates,\r\n  hideInternalStepper = false,\r\n  onStepChange,\r\n  stepOverride,\r\n}: BookingEngineProps)'
);

// Fallback for LF line endings if CRLF didn't match
if (!c.includes('hideInternalStepper = false')) {
  c = c.replace(
    /export function BookingEngine\(\{([^}]+)\}: BookingEngineProps\)/,
    (m, p) => `export function BookingEngine({${p}, hideInternalStepper = false, onStepChange, stepOverride }: BookingEngineProps)`
  );
}

// 2. Update currentStep state to 1 | 2 | 3 | 4 with changeStep helper
const oldStateBlock = `  // Wizard Step: 1 = Journey Schedule, 2 = Vehicle & Fare Selection, 3 = Passenger & Confirmation
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(() => {
    // If vehicle and route/pickup are already provided (e.g. from Homepage quick-reserve draft), jump straight to Step 3
    if (initialVehicle && (initialRoute || initialPickup)) {
      return 3;
    }
    if (initialRoute || initialPickup) {
      return 2;
    }
    return 1;
  });`;

const newStateBlock = `  // 4-Step Booking Wizard: 1 = Route, 2 = Vehicle, 3 = Trip Details, 4 = Passenger & Confirmation
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(() => {
    if (stepOverride) return stepOverride;
    if (initialVehicle && (initialRoute || initialPickup)) {
      return 3;
    }
    if (initialRoute || initialPickup) {
      return 2;
    }
    return 1;
  });

  const changeStep = (s: 1 | 2 | 3 | 4) => {
    setCurrentStep(s);
    if (onStepChange) onStepChange(s);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('booking-wizard-step', { detail: { step: s } }));
    }
  };

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('booking-wizard-step', { detail: { step: currentStep } }));
    }
  }, [currentStep]);`;

c = c.replace(oldStateBlock, newStateBlock);

// 3. Update step transition handlers
const oldHandlers = `  // Validate Step 1
  const handleProceedToStep2 = () => {
    if (!pickupDate) {
      setStep1Error(t.dateRequiredError);
      return;
    }
    setStep1Error(null);
    trackEvent({
      event: 'route_selected',
      service_type: bookingType,
      route: routeId,
      passengers,
      luggage,
    });
    setCurrentStep(2);
  };

  // Validate Step 2
  const handleProceedToStep3 = () => {
    trackEvent({
      event: 'quote_calculated',
      service_type: bookingType,
      route: routeId,
      vehicle_id: vehicleId,
      price_sar: currentPriceSAR,
      currency,
    });
    setCurrentStep(3);
  };`;

const newHandlers = `  // Step 1 -> Step 2 (Route -> Vehicle)
  const handleProceedToStep2 = () => {
    trackEvent({
      event: 'route_selected',
      service_type: bookingType,
      route: routeId,
      passengers,
      luggage,
    });
    changeStep(2);
  };

  // Step 2 -> Step 3 (Vehicle -> Schedule & Trip Details)
  const handleProceedToStep3 = () => {
    trackEvent({
      event: 'quote_calculated',
      service_type: bookingType,
      route: routeId,
      vehicle_id: vehicleId,
      price_sar: currentPriceSAR,
      currency,
    });
    changeStep(3);
  };

  // Step 3 -> Step 4 (Schedule -> Passenger Details)
  const handleProceedToStep4 = () => {
    if (!pickupDate) {
      setStep1Error(t.dateRequiredError);
      return;
    }
    setStep1Error(null);
    changeStep(4);
  };`;

c = c.replace(oldHandlers, newHandlers);

writeFileSync('src/components/booking/BookingEngine.tsx', c, 'utf8');
console.log('Successfully patched BookingEngine state and handlers.');
