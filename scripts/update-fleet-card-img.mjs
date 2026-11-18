import fs from 'fs';

let css = fs.readFileSync('src/styles/homepage-reference.css', 'utf8');

css = css.replace(/\.ref-vehicle-img-wrap \{[\s\S]*?\}/, `.ref-vehicle-img-wrap {
  height: 120px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  border-radius: 6px;
  overflow: hidden;
}

.ref-vehicle-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.ref-vehicle-card-luxury:hover .ref-vehicle-img-wrap img {
  transform: scale(1.05);
}`);

fs.writeFileSync('src/styles/homepage-reference.css', css, 'utf8');
console.log('Updated ref-vehicle-img-wrap in homepage-reference.css');
