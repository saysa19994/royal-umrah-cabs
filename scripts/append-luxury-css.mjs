import fs from 'fs';

let css = fs.readFileSync('src/app/globals.css', 'utf8');

const luxuryUtilities = `
/* ==========================================================================
   MASTER LUXURY DIGITAL EXPERIENCE UTILITIES
   ========================================================================== */
.luxury-glass {
  background: rgba(16, 23, 37, 0.94);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(214, 161, 58, 0.28);
}

.luxury-card-dark {
  background: #101725;
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.luxury-card-dark:hover {
  border-color: rgba(214, 161, 58, 0.45);
  box-shadow: 0 12px 36px -8px rgba(0, 0, 0, 0.4), 0 0 20px rgba(214, 161, 58, 0.12);
}

.luxury-gold-glow {
  box-shadow: 0 4px 20px rgba(214, 161, 58, 0.25);
}

.luxury-gold-glow-lg {
  box-shadow: 0 8px 32px rgba(214, 161, 58, 0.35);
}

.luxury-input {
  min-height: 52px;
  height: 52px;
  background-color: #141D2C;
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #F6F3ED;
  font-size: 0.875rem;
  font-weight: 500;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.luxury-input:focus {
  outline: none;
  border-color: #D6A13A;
  box-shadow: 0 0 0 2px rgba(214, 161, 58, 0.25);
}
`;

if (!css.includes('MASTER LUXURY DIGITAL EXPERIENCE UTILITIES')) {
  css += luxuryUtilities;
  fs.writeFileSync('src/app/globals.css', css, 'utf8');
  console.log('Appended luxury utilities to globals.css');
} else {
  console.log('luxury utilities already in globals.css');
}
