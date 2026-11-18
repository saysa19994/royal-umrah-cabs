import fs from 'fs';

let content = fs.readFileSync('tailwind.config.ts', 'utf8');
const target = '        royal: {';
const replacement = `        // ====================================================================
        // MASTER LUXURY DIGITAL EXPERIENCE TOKENS
        // ====================================================================
        luxury: {
          midnight: '#090D15',       // Deep Midnight Navy: primary hero & backdrop
          surface: '#101725',        // Royal Navy Surface: cards & container background
          elevated: '#141D2C',       // Elevated Navy: search dock & inputs
          cardBorder: 'rgba(255, 255, 255, 0.08)',
          gold: '#D6A13A',           // Luxury Champagne Gold: primary CTAs & focus
          goldHover: '#E5B14B',      // Brighter Gold hover
          goldDark: '#A97B27',       // Antique Gold: border rules & secondary gold
          goldLine: 'rgba(214, 161, 58, 0.3)',
          warmWhite: '#F6F3ED',      // Warm White: headings & high contrast
          silver: '#AEB7C4',         // Muted Silver: body text & captions
          emerald: '#188567',        // Dignified status green (zero advance)
        },

        royal: {`;

if (!content.includes('luxury: {')) {
  content = content.replace(target, replacement);
  fs.writeFileSync('tailwind.config.ts', content, 'utf8');
  console.log('Successfully added luxury tokens to tailwind.config.ts');
} else {
  console.log('luxury tokens already present');
}
