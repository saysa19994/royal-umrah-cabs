import fs from 'fs';
const bp = fs.readFileSync('blueprint-reference/duyuf-complete-site-blueprint/styles.css', 'utf8');
const ltrRules = bp.match(/html\[dir="ltr"\][^{]+|body\[dir="ltr"\][^{]+/g) || [];
console.log('LTR matches:', ltrRules);
const dirRules = bp.match(/[^{}]*dir[^{}]*/g) || [];
console.log('Dir matches:', dirRules);
