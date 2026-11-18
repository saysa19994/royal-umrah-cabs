import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const projectRoot = 'D:/royal-umrah-cabs';
const artifactsDir = 'C:/Users/PC/.gemini/antigravity/brain/b85e6102-b6eb-4565-9493-6e009226675e';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const fallbackEdge = 'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe';
const binary = fs.existsSync(edgePath) ? edgePath : fallbackEdge;

const concepts = [
  {
    name: 'concept_a_desert_modernism',
    file: 'design-concepts/concept-a-desktop.html',
    w: 1440,
    h: 2200,
  },
  {
    name: 'concept_b_royal_crimson',
    file: 'design-concepts/concept-b-desktop.html',
    w: 1440,
    h: 2200,
  },
  {
    name: 'concept_c_cinematic_sandstone',
    file: 'design-concepts/concept-c-desktop.html',
    w: 1440,
    h: 2200,
  },
  {
    name: 'concept_01_private_aviation',
    file: 'design-concepts/concept-01-desktop.html',
    w: 1440,
    h: 2200,
  },
];

async function capture() {
  for (const c of concepts) {
    const filePath = path.resolve(projectRoot, c.file);
    const fileUrl = 'file:///' + filePath.replace(/\\\\/g, '/');
    const outFile = path.join(artifactsDir, c.name + '.png');
    console.log('Capturing ' + c.name + '...');

    const cmd = '"' + binary + '" --headless=new --disable-gpu --hide-scrollbars --window-size=' + c.w + ',' + c.h + ' --screenshot="' + outFile + '" "' + fileUrl + '"';
    try {
      execSync(cmd, { stdio: 'inherit' });
      console.log('Saved: ' + outFile);
    } catch (e) {
      console.error('Error capturing ' + c.name + ':', e.message);
    }
  }
  console.log('All concept screenshots generated!');
}

capture();
