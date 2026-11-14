'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { 
  Box, 
  RotateCw, 
  Lightbulb, 
  Maximize2, 
  Minimize2, 
  Compass, 
  CheckCircle2, 
  Sparkles,
  Info,
  Palette
} from 'lucide-react';

interface Vehicle3DViewerProps {
  modelUrl?: string;
  isArabic?: boolean;
  vehicleName?: string;
  className?: string;
}

interface PaintOption {
  id: string;
  nameAr: string;
  nameEn: string;
  hex: string;
  threeColor: number;
  roughness: number;
  metalness: number;
  clearcoat: number;
}

const PAINT_PALETTE: PaintOption[] = [
  {
    id: 'obsidian',
    nameAr: 'أسود ملكي أوبسيديان',
    nameEn: 'Obsidian Black Metallic',
    hex: '#111827',
    threeColor: 0x111827,
    roughness: 0.2,
    metalness: 0.85,
    clearcoat: 0.95
  },
  {
    id: 'pearl-white',
    nameAr: 'أبيض لؤلؤي فاخر',
    nameEn: 'Luxury Pearl White',
    hex: '#F7F5F0',
    threeColor: 0xe8e6e1,
    roughness: 0.25,
    metalness: 0.7,
    clearcoat: 0.9
  },
  {
    id: 'royal-bronze',
    nameAr: 'برونزي ضيوف الرحمن الملكي',
    nameEn: 'Royal Muted Bronze',
    hex: '#A97B27',
    threeColor: 0xa97b27,
    roughness: 0.22,
    metalness: 0.88,
    clearcoat: 0.95
  },
  {
    id: 'graphite',
    nameAr: 'رمادي جرافيت نفاث',
    nameEn: 'Graphite Charcoal',
    hex: '#2B3545',
    threeColor: 0x2b3545,
    roughness: 0.25,
    metalness: 0.8,
    clearcoat: 0.85
  },
  {
    id: 'sapphire',
    nameAr: 'أزرق كحلي ليلي',
    nameEn: 'Midnight Royal Navy',
    hex: '#0F1D38',
    threeColor: 0x0f1d38,
    roughness: 0.2,
    metalness: 0.85,
    clearcoat: 0.95
  }
];

export const Vehicle3DViewer: React.FC<Vehicle3DViewerProps> = ({
  modelUrl = '/models/test-vehicle.glb',
  isArabic = true,
  vehicleName = 'تويوتا كامري VIP',
  className = '',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [activePaint, setActivePaint] = useState<PaintOption>(PAINT_PALETTE[0]);
  const [headlightsOn, setHeadlightsOn] = useState<boolean>(false);
  const [autoRotate, setAutoRotate] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const [activePreset, setActivePreset] = useState<string>('front');

  // Three.js runtime references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const carModelRef = useRef<THREE.Group | null>(null);
  const bodyMeshesRef = useRef<THREE.Mesh[]>([]);
  const headlightMaterialsRef = useRef<THREE.MeshStandardMaterial[]>([]);

  // Camera animation target
  const targetCameraPos = useRef<THREE.Vector3 | null>(null);
  const isAnimatingCamera = useRef<boolean>(false);

  // Initialize Three.js scene
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let animId: number;
    let isDisposed = false;

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0c1322); // Deep Royal Navy
    sceneRef.current = scene;

    const width = mount.clientWidth || 1000;
    const height = mount.clientHeight || 600;

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 1.4, 5.2);
    cameraRef.current = camera;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    rendererRef.current = renderer;

    mount.appendChild(renderer.domElement);

    // 4. OrbitControls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 3.2;
    controls.maxDistance = 7.8;
    controls.minPolarAngle = Math.PI / 4;
    controls.maxPolarAngle = Math.PI / 2.05; // Prevent dipping beneath floor
    controls.target.set(0, 0.6, 0);
    controls.autoRotate = false;
    controls.autoRotateSpeed = 1.2;
    controlsRef.current = controls;

    controls.addEventListener('start', () => {
      setHasInteracted(true);
      setAutoRotate(false);
      isAnimatingCamera.current = false;
    });

    // 5. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff7ed, 4.0); // Warm luxury key light
    keyLight.position.set(4, 7, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.bias = -0.0001;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe0f2fe, 2.2); // Cool soft fill
    fillLight.position.set(-5, 4, -3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xa97b27, 3.5); // Royal Muted Bronze Rim
    rimLight.position.set(0, 6, -6);
    scene.add(rimLight);

    // 6. Ground Studio Reflection Plane
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

    // 7. Load GLB Model with DRACO
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/gltf/');

    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);

    gltfLoader.load(
      modelUrl,
      (gltf) => {
        if (isDisposed) return;
        const model = gltf.scene;
        carModelRef.current = model;

        // Center car model on origin and floor
        const box = new THREE.Box3().setFromObject(model);
        const center = new THREE.Vector3();
        box.getCenter(center);

        model.position.x -= center.x;
        model.position.y -= box.min.y;
        model.position.z -= center.z;

        // Collect body meshes & headlight meshes
        const bodies: THREE.Mesh[] = [];
        const lights: THREE.MeshStandardMaterial[] = [];

        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            const name = (mesh.name || '').toLowerCase();
            const matName = (mesh.material && (mesh.material as any).name ? (mesh.material as any).name.toLowerCase() : '');

            // Identify body paint meshes
            if (name.includes('body') || matName.includes('body') || matName.includes('paint')) {
              bodies.push(mesh);
              // Apply initial paint
              if (mesh.material) {
                const mat = (mesh.material as THREE.MeshStandardMaterial).clone();
                mat.color = new THREE.Color(PAINT_PALETTE[0].threeColor);
                mat.roughness = PAINT_PALETTE[0].roughness;
                mat.metalness = PAINT_PALETTE[0].metalness;
                (mat as any).clearcoat = PAINT_PALETTE[0].clearcoat;
                mesh.material = mat;
              }
            }

            // Identify headlights for toggle
            if (name.includes('headlight') || name.includes('light') || matName.includes('glass_light')) {
              if (mesh.material) {
                lights.push(mesh.material as THREE.MeshStandardMaterial);
              }
            }
          }
        });

        bodyMeshesRef.current = bodies;
        headlightMaterialsRef.current = lights;

        scene.add(model);
        setIsLoading(false);
      },
      (xhr) => {
        if (xhr.total > 0) {
          const pct = Math.round((xhr.loaded / xhr.total) * 100);
          setLoadProgress(pct);
        }
      },
      (err: unknown) => {
        console.error('Three.js model load error:', err);
        const msg = err instanceof Error ? err.message : String(err || 'Failed to load 3D vehicle model');
        setLoadError(msg);
        setIsLoading(false);
      }
    );

    // 8. Render Animation Loop
    const animate = () => {
      if (isDisposed) return;
      animId = requestAnimationFrame(animate);

      // Camera smooth tweening if preset chosen
      if (isAnimatingCamera.current && targetCameraPos.current && cameraRef.current) {
        cameraRef.current.position.lerp(targetCameraPos.current, 0.06);
        controls.update();
        if (cameraRef.current.position.distanceTo(targetCameraPos.current) < 0.05) {
          isAnimatingCamera.current = false;
        }
      } else {
        controls.update();
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!mount || !rendererRef.current || !cameraRef.current) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      isDisposed = true;
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      controls.dispose();
      dracoLoader.dispose();
      renderer.dispose();
      if (mount && renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [modelUrl]);

  // Update Paint Color
  const applyPaintColor = useCallback((paint: PaintOption) => {
    setActivePaint(paint);
    bodyMeshesRef.current.forEach((mesh) => {
      if (mesh.material && (mesh.material as THREE.MeshStandardMaterial).isMeshStandardMaterial) {
        const mat = mesh.material as THREE.MeshStandardMaterial;
        mat.color.setHex(paint.threeColor);
        mat.roughness = paint.roughness;
        mat.metalness = paint.metalness;
        if ((mat as any).clearcoat !== undefined) {
          (mat as any).clearcoat = paint.clearcoat;
        }
      }
    });
  }, []);

  // Toggle Headlights
  const toggleHeadlights = () => {
    const nextState = !headlightsOn;
    setHeadlightsOn(nextState);
    headlightMaterialsRef.current.forEach((mat) => {
      if (mat.emissive) {
        if (nextState) {
          mat.emissive.setHex(0xfff7d6);
          mat.emissiveIntensity = 2.5;
        } else {
          mat.emissive.setHex(0x000000);
          mat.emissiveIntensity = 0;
        }
      }
    });
  };

  // Toggle Auto-Rotate
  const toggleAutoRotate = () => {
    setHasInteracted(true);
    const next = !autoRotate;
    setAutoRotate(next);
    if (controlsRef.current) {
      controlsRef.current.autoRotate = next;
    }
  };

  // Camera Presets
  const setCameraPreset = (id: string, x: number, y: number, z: number) => {
    setHasInteracted(true);
    setAutoRotate(false);
    if (controlsRef.current) {
      controlsRef.current.autoRotate = false;
    }
    setActivePreset(id);
    targetCameraPos.current = new THREE.Vector3(x, y, z);
    isAnimatingCamera.current = true;
  };

  const presets = [
    { id: 'front', labelAr: 'الأمام 0°', labelEn: 'Front 0°', pos: [0, 1.2, 5.0] },
    { id: 'three-quarter', labelAr: 'الربع الأمامي 45°', labelEn: 'Front 3/4 45°', pos: [3.5, 1.4, 3.5] },
    { id: 'side', labelAr: 'الجانب 90°', labelEn: 'Side Profile 90°', pos: [4.9, 1.2, 0] },
    { id: 'rear-quarter', labelAr: 'الربع الخلفي 135°', labelEn: 'Rear 3/4 135°', pos: [3.5, 1.4, -3.5] },
    { id: 'rear', labelAr: 'الخلف 180°', labelEn: 'Rear 180°', pos: [0, 1.2, -5.0] },
  ];

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`relative w-full rounded-2xl overflow-hidden bg-[#0c1322] border border-white/10 shadow-2xl select-none group ${className}`}
      style={{ direction: 'ltr' }}
    >
      {/* Top Floating Badge Bar */}
      <div className="absolute top-4 inset-x-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#101827]/90 text-[#A97B27] border border-[#A97B27]/40 backdrop-blur-md shadow-lg">
            <Box className="w-3.5 h-3.5 animate-bounce" />
            <span>{isArabic ? 'مجسم 3D حقيقي (Three.js WebGL)' : 'Interactive Three.js 3D Model'}</span>
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-blue-950/80 text-blue-300 border border-blue-500/30 backdrop-blur-md">
            <Sparkles className="w-3 h-3" />
            <span>{isArabic ? 'إضاءة سينمائية + طلاء تفاعلي' : 'Studio Lighting + Shaders'}</span>
          </span>
        </div>

        {/* Clear Test Asset Disclosure Badge */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-amber-950/70 text-amber-300 border border-amber-600/40 backdrop-blur-md">
            <Info className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{isArabic ? 'نموذج تجريبي معتمد (POC Test Asset)' : 'Licensed Test Model'}</span>
            <span className="md:hidden">POC 3D</span>
          </div>

          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            aria-label="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main 3D Canvas Mount Point */}
      <div 
        ref={mountRef} 
        className="relative w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/10] max-h-[640px] cursor-grab active:cursor-grabbing overflow-hidden"
        style={{ touchAction: 'none' }}
      >
        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-15 flex flex-col items-center justify-center bg-[#0c1322]/90 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-full border-2 border-[#A97B27]/20 border-t-[#A97B27] animate-spin mb-3" />
            <p className="text-sm font-medium text-white/90">
              {isArabic ? 'جاري تحميل المجسم ثلاثي الأبعاد...' : 'Loading 3D Vehicle Engine...'}
            </p>
            {loadProgress > 0 && (
              <div className="w-48 h-1.5 bg-white/10 rounded-full mt-2 overflow-hidden">
                <div 
                  className="h-full bg-[#A97B27] transition-all duration-150 rounded-full"
                  style={{ width: `${loadProgress}%` }}
                />
              </div>
            )}
          </div>
        )}

        {/* Error Fallback */}
        {loadError && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#0c1322] p-6 text-center">
            <Info className="w-10 h-10 text-rose-400 mb-2" />
            <p className="text-rose-200 text-sm font-semibold">{loadError}</p>
          </div>
        )}

        {/* Drag Hint Pill */}
        {!hasInteracted && !isLoading && (
          <div className="absolute bottom-20 inset-x-0 flex justify-center pointer-events-none animate-bounce z-20">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#101827]/90 text-white/90 text-xs font-medium border border-white/20 backdrop-blur-md shadow-2xl">
              <RotateCw className="w-3.5 h-3.5 text-[#A97B27] animate-spin" />
              <span>{isArabic ? 'انقر واسحب للدوران ثلاثي الأبعاد بحرية' : 'Click & drag to freely orbit in 3D'}</span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Control Dock: Paint Palette, Presets & Actions */}
      <div className="relative z-20 p-3 sm:p-4 bg-[#090e1a] border-t border-white/10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          
          {/* Interactive Paint Finishes Switcher */}
          <div className="flex items-center gap-2 w-full lg:w-auto" style={{ direction: isArabic ? 'rtl' : 'ltr' }}>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-white/80 whitespace-nowrap pl-1">
              <Palette className="w-3.5 h-3.5 text-[#A97B27]" />
              <span>{isArabic ? 'لون الطلاء:' : 'Paint Color:'}</span>
            </div>
            <div className="flex items-center gap-2">
              {PAINT_PALETTE.map((p) => {
                const isSelected = activePaint.id === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => applyPaintColor(p)}
                    className={`relative w-7 h-7 rounded-full border-2 transition-transform ${
                      isSelected 
                        ? 'border-[#A97B27] scale-110 shadow-lg shadow-[#A97B27]/40 ring-2 ring-[#A97B27]/30' 
                        : 'border-white/20 hover:scale-105'
                    }`}
                    style={{ backgroundColor: p.hex }}
                    title={isArabic ? p.nameAr : p.nameEn}
                    aria-label={p.nameEn}
                  />
                );
              })}
            </div>
            <span className="text-xs text-white/50 font-medium hidden sm:inline mr-2">
              {isArabic ? activePaint.nameAr : activePaint.nameEn}
            </span>
          </div>

          {/* Camera View Angle Presets */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0 scrollbar-none" style={{ direction: isArabic ? 'rtl' : 'ltr' }}>
            {presets.map((preset) => {
              const isActive = activePreset === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => setCameraPreset(preset.id, preset.pos[0], preset.pos[1], preset.pos[2])}
                  className={`whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#A97B27] text-white shadow-lg shadow-[#A97B27]/30 scale-[1.03]'
                      : 'bg-white/5 hover:bg-white/10 text-white/80 border border-white/10 hover:border-white/20'
                  }`}
                >
                  {isArabic ? preset.labelAr : preset.labelEn}
                </button>
              );
            })}
          </div>

          {/* Quick Actions: Headlights & Auto-Orbit */}
          <div className="flex items-center gap-2 w-full lg:w-auto justify-end">
            {/* Headlights Toggle */}
            <button
              type="button"
              onClick={toggleHeadlights}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                headlightsOn
                  ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/30'
                  : 'bg-white/5 hover:bg-white/10 text-white/80 border border-white/10'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>{headlightsOn ? (isArabic ? 'إطفاء الإضاءة' : 'Lights Off') : (isArabic ? 'تشغيل الإضاءة' : 'Lights On')}</span>
            </button>

            {/* Auto Orbit Toggle */}
            <button
              type="button"
              onClick={toggleAutoRotate}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                autoRotate
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/50'
                  : 'bg-white/5 hover:bg-white/10 text-white/80 border border-white/10'
              }`}
            >
              <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} />
              <span>{autoRotate ? (isArabic ? 'إيقاف الدوران' : 'Stop Orbit') : (isArabic ? 'دوران تلقائي' : 'Auto Orbit')}</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Vehicle3DViewer;
