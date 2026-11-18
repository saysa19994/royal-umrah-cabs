import { readFileSync, writeFileSync } from 'fs';

let c = readFileSync('src/components/booking/BookingEngine.tsx', 'utf8');

// Replace the mispositioned )}
const wrongPart = `            <p className="text-xs text-ink-muted mt-1">
                {t.routeLabel} • {t.fixedFareLabel}
              </p>
            </div>
        )}`;

// Find and fix
const target = '3</span>\r\n          </button>\r\n        </div>';
const altTarget = '3</span>\n          </button>\n        </div>';

if (c.includes(target)) {
  c = c.replace(target, target + '\r\n        )}');
} else if (c.includes(altTarget)) {
  c = c.replace(altTarget, altTarget + '\n        )}');
}

// Remove the rogue )} from inside Step 1 header
c = c.replace(/\{t\.routeLabel\} • \{t\.fixedFareLabel\}\r?\n\s*<\/p>\r?\n\s*<\/div>\r?\n\s*\)\}/, '{t.routeLabel} • {t.fixedFareLabel}\r\n              </p>\r\n            </div>');

writeFileSync('src/components/booking/BookingEngine.tsx', c, 'utf8');
console.log('Fixed stepper closing tag position.');
