import { readFileSync, writeFileSync } from 'fs';

let c = readFileSync('src/components/booking/BookingEngine.tsx', 'utf8');

// 1. Add CONCIERGE_VEHICLES after VEHICLE_SPECS
const coasterEnd = `  coaster: {
    name: 'Toyota Coaster VIP Coach',
    category: 'Executive Coach',
    seats: 21,
    bags: 20,
    img: '/assets/images/coaster_exterior.webp',
  },
};`;

const conciergeDefs = `  coaster: {
    name: 'Toyota Coaster VIP Coach',
    category: 'Executive Coach',
    seats: 21,
    bags: 20,
    img: '/assets/images/coaster_exterior.webp',
  },
};

const CONCIERGE_VEHICLES: Record<string, VehicleInfo> = {
  maybach: {
    name: 'Mercedes-Maybach S-Class VIP',
    category: 'Ultra VIP Presidential Sedan',
    seats: 3,
    bags: 3,
    img: '/assets/images/maybach_exterior.webp',
  },
  h1: {
    name: 'Hyundai H1 Starex VIP',
    category: 'Family Executive Minivan',
    seats: 7,
    bags: 6,
    img: '/assets/images/h1_exterior.webp',
  },
};`;

if (!c.includes('const CONCIERGE_VEHICLES')) {
  c = c.replace(coasterEnd, conciergeDefs);
  console.log('Added CONCIERGE_VEHICLES');
}

// 2. Fix currentStep state and add changeStep helper
const stepStateRegex = /\/\/ Wizard Step: 1 = Journey Schedule[\s\S]*?const \[currentStep, setCurrentStep\] = useState<1 \| 2 \| 3>\(\(\) => \{[\s\S]*?return 1;\r?\n\s*\}\);/;

const newStepState = `// 4-Step Booking Wizard: 1 = Route, 2 = Vehicle, 3 = Trip Details, 4 = Passenger & Confirmation
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

c = c.replace(stepStateRegex, newStepState);
console.log('Updated currentStep state and changeStep helper.');

// 3. Fix step transition handlers
const handlersRegex = /\/\/ Validate Step 1[\s\S]*?setCurrentStep\(3\);\r?\n\s*\};/;

const newHandlers = `// Step 1 -> Step 2 (Route -> Vehicle)
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

c = c.replace(handlersRegex, newHandlers);
console.log('Updated handlers to handleProceedToStep2, 3, 4.');

writeFileSync('src/components/booking/BookingEngine.tsx', c, 'utf8');
console.log('Successfully written all fixes to BookingEngine.tsx');
