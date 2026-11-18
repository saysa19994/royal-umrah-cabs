import fs from 'fs';

const cssPath = 'src/styles/luxury-subpages.css';
let css = fs.readFileSync(cssPath, 'utf-8');

// Replace luxury-matrix-table-wrap overflow with responsive scrolling
css = css.replace(
  `.luxury-matrix-table-wrap {
  background: #101725;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
}`,
  `.luxury-matrix-table-wrap {
  background: #101725;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
}`
);

// Add min-width for table rows to prevent mobile text wrapping
css = css.replace(
  `.matrix-header-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1.2fr;
  background: #141D2C;
  padding: 14px 20px;
  font-size: 12px;
  font-weight: 700;
  color: #D6A13A;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}`,
  `.matrix-header-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1.2fr;
  min-width: 600px;
  background: #141D2C;
  padding: 14px 20px;
  font-size: 12px;
  font-weight: 700;
  color: #D6A13A;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}`
);

css = css.replace(
  `.matrix-data-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1.2fr;
  padding: 16px 20px;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  font-size: 13px;
  color: #AEB7C4;
  transition: background 0.2s ease;
}`,
  `.matrix-data-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1.2fr;
  min-width: 600px;
  padding: 16px 20px;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  font-size: 13px;
  color: #AEB7C4;
  transition: background 0.2s ease;
}`
);

fs.writeFileSync(cssPath, css, 'utf-8');
console.log('Successfully updated luxury-subpages.css with responsive mobile table scrolling!');
