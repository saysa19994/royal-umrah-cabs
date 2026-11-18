import http from 'http';
import fs from 'fs';
import path from 'path';
import { chromium } from 'file:///C:/Users/PC/AppData/Roaming/npm/node_modules/playwright/index.mjs';

const ROOT = 'd:/royal-umrah-cabs';
const OUT_DIR = path.join(ROOT, 'public/assets/360-camry');
const MODEL_FILE = path.join(ROOT, 'public/models/test-vehicle.glb');
const THREE_DIR = path.join(ROOT, 'node_modules/three');

fs.mkdirSync(OUT_DIR, { recursive: true });

const server = http.createServer((req, res) => {
  const url = req.url.split('?')[0];
  console.log('REQ:', req.method, url);
  if (url === '/model.glb') {
    res.writeHead(200, { 'Content-Type': 'model/gltf-binary' });
    fs.createReadStream(MODEL_FILE).pipe(res);
    return;
  }

  const buildPath = path.join(THREE_DIR, 'build', url.replace(/^\//, ''));
  if (fs.existsSync(buildPath) && fs.statSync(buildPath).isFile()) {
    res.writeHead(200, { 'Content-Type': 'application/javascript' });
    fs.createReadStream(buildPath).pipe(res);
    return;
  }

  if (url.startsWith('/jsm/')) {
    const rel = url.replace('/jsm/', '');
    const p = path.join(THREE_DIR, 'examples/jsm', rel);
    if (fs.existsSync(p)) {
      const ext = path.extname(p);
      const ct = ext === '.wasm' ? 'application/wasm' : 'application/javascript';
      res.writeHead(200, { 'Content-Type': ct });
      fs.createReadStream(p).pipe(res);
    } else {
      console.warn('404 JSM:', rel);
      res.writeHead(404);
      res.end('Not found: ' + rel);
    }
    return;
  }

  if (url === '/' || url === '/index.html') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <script type="importmap">
  {
    "imports": {
      "three": "/three.module.js"
    }
  }
  </script>
  <style>
    body { margin: 0; background: #0c121e; overflow: hidden; }
    canvas { display: block; width: 1200px; height: 800px; }
  </style>
</head>
<body>
  <div id="container"></div>
  <script type="module">
    import * as THREE from 'three';
    import { GLTFLoader } from '/jsm/loaders/GLTFLoader.js';
    import { DRACOLoader } from '/jsm/loaders/DRACOLoader.js';

    console.log('Script loaded, initializing Three.js scene...');

    const width = 1200;
    const height = 800;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0c1322); // Deep Royal Navy

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 1.4, 5.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(1);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.getElementById('container').appendChild(renderer.domElement);

    // Studio Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambient);

    const mainLight = new THREE.DirectionalLight(0xfff7ed, 4.0); // Warm luxury key light
    mainLight.position.set(4, 7, 5);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0xe0f2fe, 2.2); // Soft cool fill light
    fillLight.position.set(-5, 4, -3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xa97b27, 3.5); // Royal bronze rim light
    rimLight.position.set(0, 6, -6);
    scene.add(rimLight);

    // Floor Reflection Plane
    const floorGeo = new THREE.PlaneGeometry(40, 40);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x090d18,
      roughness: 0.35,
      metalness: 0.3
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    floor.receiveShadow = true;
    scene.add(floor);

    // Turntable Pivot Object
    const pivot = new THREE.Group();
    scene.add(pivot);

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/jsm/libs/draco/gltf/');

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    console.log('Loading GLTF model with DRACO decoder...');
    loader.load('/model.glb', (gltf) => {
      console.log('Model loaded successfully!');
      const carModel = gltf.scene;

      const box = new THREE.Box3().setFromObject(carModel);
      const size = new THREE.Vector3();
      box.getSize(size);
      const center = new THREE.Vector3();
      box.getCenter(center);

      carModel.position.x -= center.x;
      carModel.position.y -= box.min.y;
      carModel.position.z -= center.z;

      // Executive Obsidian / Royal Muted Bronze paint finish
      carModel.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          const name = (child.name || '').toLowerCase();
          const matName = (child.material && child.material.name ? child.material.name.toLowerCase() : '');
          if (name.includes('body') || matName.includes('body') || matName.includes('paint')) {
            child.material.color = new THREE.Color(0x182236); // Executive Obsidian Navy
            child.material.roughness = 0.22;
            child.material.metalness = 0.82;
            child.material.clearcoat = 0.9;
          }
        }
      });

      pivot.add(carModel);
      camera.lookAt(0, 0.6, 0);
      renderer.render(scene, camera);
      window.isModelReady = true;
      console.log('Turntable scene ready for frame capture');
    }, undefined, (err) => {
      console.error('Model load error:', err);
      window.loadError = err.message || 'GLTF Load Failed';
    });

    window.setRotationDegrees = (deg) => {
      if (pivot) {
        pivot.rotation.y = (deg * Math.PI) / 180;
        renderer.render(scene, camera);
      }
    };
  </script>
</body>
</html>`);
    return;
  }

  res.writeHead(404);
  res.end();
});

server.listen(4892, async () => {
  console.log('Turntable renderer server running on port 4892');
  try {
    const browser = await chromium.launch({
      headless: true,
      args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-webgl']
    });
    const page = await browser.newPage({
      viewport: { width: 1200, height: 800 }
    });

    page.on('console', msg => console.log('PAGE CONSOLE:', msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

    console.log('Navigating to renderer...');
    await page.goto('http://127.0.0.1:4892/', { waitUntil: 'networkidle' });

    console.log('Waiting for model to load...');
    await page.waitForFunction(() => window.isModelReady === true || !!window.loadError, { timeout: 45000 });

    const error = await page.evaluate(() => window.loadError);
    if (error) {
      throw new Error('WebGL model loader failed: ' + error);
    }

    console.log('Model ready! Generating 36 frames...');
    const totalFrames = 36;
    for (let i = 0; i < totalFrames; i++) {
      const frameNum = String(i + 1).padStart(2, '0');
      const deg = (i * 360) / totalFrames;

      await page.evaluate((d) => window.setRotationDegrees(d), deg);
      await page.waitForTimeout(60);

      const framePath = path.join(OUT_DIR, `frame-${frameNum}.webp`);
      await page.locator('canvas').screenshot({
        path: framePath,
        type: 'webp',
        quality: 90
      });

      if (i === 0) {
        const posterPath = path.join(OUT_DIR, 'poster.webp');
        fs.copyFileSync(framePath, posterPath);
      }

      process.stdout.write(`\rRendered frame ${frameNum}/${totalFrames} (${deg.toFixed(0)}°)`);
    }

    console.log('\nAll 36 turntable frames successfully generated in public/assets/360-camry/');
    await browser.close();
    server.close();
    process.exit(0);
  } catch (err) {
    console.error('Fatal error during turntable generation:', err);
    server.close();
    process.exit(1);
  }
});
