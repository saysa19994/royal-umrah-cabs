import fs from 'fs';

// 1. Update RoyalHomepageExperience.tsx to use transparent images and clickable luxury cards
let code = fs.readFileSync('src/components/home/RoyalHomepageExperience.tsx', 'utf8');

// Replace reference images with transparent versions
code = code.replaceAll('/assets/images/reference/toyota-camry.webp', '/assets/images/reference/toyota-camry-transparent.webp');
code = code.replaceAll('/assets/images/reference/hyundai-staria.webp', '/assets/images/reference/hyundai-staria-transparent.webp');
code = code.replaceAll('/assets/images/reference/gmc-yukon-xl.webp', '/assets/images/reference/gmc-yukon-xl-transparent.webp');
code = code.replaceAll('/assets/images/reference/toyota-hiace.webp', '/assets/images/reference/toyota-hiace-transparent.webp');
code = code.replaceAll('/assets/images/reference/toyota-coaster.webp', '/assets/images/reference/toyota-coaster-transparent.webp');

fs.writeFileSync('src/components/home/RoyalHomepageExperience.tsx', code, 'utf8');
console.log('Updated vehicle images to transparent in RoyalHomepageExperience.tsx');

// 2. Update CSS for RTL flex order and refined card styling
let css = fs.readFileSync('src/styles/homepage-reference.css', 'utf8');

// Replace flex direction rules so RTL puts header on the right naturally
css = css.replace(/\[dir="rtl"\] \.ref-fleet-wrapper \{\s*flex-direction: row-reverse;\s*\}/g, '/* RTL naturally places header on right */');
css = css.replace(/\[dir="ltr"\] \.ref-fleet-wrapper \{\s*flex-direction: row;\s*\}/g, '/* LTR places header on left */');

css = css.replace(/\[dir="rtl"\] \.ref-routes-wrapper \{\s*flex-direction: row-reverse;\s*\}/g, '/* RTL naturally places header on right */');
css = css.replace(/\[dir="ltr"\] \.ref-routes-wrapper \{\s*flex-direction: row;\s*\}/g, '/* LTR places header on left */');

css = css.replace(/\[dir="rtl"\] \.ref-reviews-wrapper \{\s*flex-direction: row-reverse;\s*\}/g, '/* RTL naturally places header on right */');
css = css.replace(/\[dir="ltr"\] \.ref-reviews-wrapper \{\s*flex-direction: row;\s*\}/g, '/* LTR places header on left */');

// Add styling for vehicle cards to make the whole card clickable and eliminate white edges
css = css.replace(/\.ref-vehicle-img-wrap \{[\s\S]*?\}/, `.ref-vehicle-img-wrap {
  height: 120px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  background: radial-gradient(circle at 50% 65%, rgba(214, 161, 58, 0.08) 0%, transparent 70%);
}`);

fs.writeFileSync('src/styles/homepage-reference.css', css, 'utf8');
console.log('Updated CSS flex directions and card styling in homepage-reference.css');
