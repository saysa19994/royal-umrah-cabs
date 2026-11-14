'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  RotateCw, 
  Play, 
  Pause, 
  Maximize2, 
  Minimize2, 
  Compass, 
  CheckCircle2, 
  Sparkles,
  Info
} from 'lucide-react';

interface Vehicle360ViewerProps {
  totalFrames?: number;
  initialFrame?: number;
  framesPath?: string;
  posterUrl?: string;
  vehicleName?: string;
  isArabic?: boolean;
  onFrameChange?: (frameIndex: number, degrees: number) => void;
  className?: string;
}

export const Vehicle360Viewer: React.FC<Vehicle360ViewerProps> = ({
  totalFrames = 36,
  initialFrame = 0,
  framesPath = '/assets/360-camry',
  posterUrl = '/assets/360-camry/poster.webp',
  vehicleName = 'تويوتا كامري VIP',
  isArabic = true,
  onFrameChange,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [currentFrame, setCurrentFrame] = useState<number>(initialFrame);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [autoRotate, setAutoRotate] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  const dragStartX = useRef<number>(0);
  const frameStartIndex = useRef<number>(0);
  const lastX = useRef<number>(0);
  const velocity = useRef<number>(0);
  const animationFrameId = useRef<number | null>(null);
  const autoRotateInterval = useRef<NodeJS.Timeout | null>(null);

  // Preload all 36 frames progressively
  useEffect(() => {
    let isCancelled = false;
    const loadedImages: HTMLImageElement[] = new Array(totalFrames);
    let count = 0;

    // Load poster or frame 01 first for fast initial view
    const loadFrame = (index: number): Promise<HTMLImageElement> => {
      return new Promise((resolve) => {
        const img = new Image();
        const frameNum = String(index + 1).padStart(2, '0');
        img.src = `${framesPath}/frame-${frameNum}.webp`;
        img.onload = () => {
          if (!isCancelled) {
            loadedImages[index] = img;
            count++;
            setLoadedCount(count);
            if (count === totalFrames) {
              setImages([...loadedImages]);
              setIsLoaded(true);
            }
          }
          resolve(img);
        };
        img.onerror = () => {
          // Fallback to poster if individual frame fails
          if (!isCancelled) {
            const fallback = new Image();
            fallback.src = posterUrl;
            fallback.onload = () => {
              loadedImages[index] = fallback;
              count++;
              setLoadedCount(count);
              if (count === totalFrames) {
                setImages([...loadedImages]);
                setIsLoaded(true);
              }
              resolve(fallback);
            };
          }
        };
      });
    };

    // Load frame 0 immediately
    loadFrame(0).then(() => {
      // Then batch-load remaining frames
      const promises: Promise<HTMLImageElement>[] = [];
      for (let i = 1; i < totalFrames; i++) {
        promises.push(loadFrame(i));
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [totalFrames, framesPath, posterUrl]);

  // Draw current frame to canvas
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = images[frameIndex];
    if (!img) return;

    const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1;
    const rect = canvas.getBoundingClientRect();
    
    // Size canvas buffer to DPR
    const targetWidth = Math.floor(rect.width * dpr);
    const targetHeight = Math.floor(rect.height * dpr);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }

    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Cover / contain aspect ratio
    const imgAspect = img.width / img.height;
    const canvasAspect = canvas.width / canvas.height;

    let drawW = canvas.width;
    let drawH = canvas.height;
    let drawX = 0;
    let drawY = 0;

    if (canvasAspect > imgAspect) {
      drawW = canvas.height * imgAspect;
      drawX = (canvas.width - drawW) / 2;
    } else {
      drawH = canvas.width / imgAspect;
      drawY = (canvas.height - drawH) / 2;
    }

    ctx.drawImage(img, drawX, drawY, drawW, drawH);
    ctx.restore();
  }, [images]);

  // Update canvas on frame change or when images load
  useEffect(() => {
    if (images[currentFrame]) {
      drawFrame(currentFrame);
    }
  }, [currentFrame, images, drawFrame]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (images[currentFrame]) {
        drawFrame(currentFrame);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentFrame, images, drawFrame]);

  // Change frame helper
  const goToFrame = useCallback((index: number) => {
    const normalized = ((index % totalFrames) + totalFrames) % totalFrames;
    setCurrentFrame(normalized);
    const degrees = Math.round((normalized * 360) / totalFrames);
    if (onFrameChange) {
      onFrameChange(normalized, degrees);
    }
  }, [totalFrames, onFrameChange]);

  // Inertia animation loop after drag release
  const runInertia = useCallback(() => {
    if (Math.abs(velocity.current) > 0.05) {
      goToFrame(Math.round(currentFrame + velocity.current));
      velocity.current *= 0.92; // Friction decay
      animationFrameId.current = requestAnimationFrame(runInertia);
    } else {
      velocity.current = 0;
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    }
  }, [currentFrame, goToFrame]);

  // Mouse & Touch Drag Handlers
  const handleDragStart = (clientX: number) => {
    if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    setIsDragging(true);
    setAutoRotate(false);
    setHasInteracted(true);
    dragStartX.current = clientX;
    lastX.current = clientX;
    frameStartIndex.current = currentFrame;
    velocity.current = 0;
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    const deltaX = clientX - dragStartX.current;
    const sensitivity = 12; // Pixels per frame
    const frameDelta = Math.floor(deltaX / sensitivity);
    
    velocity.current = (clientX - lastX.current) * 0.15;
    lastX.current = clientX;

    goToFrame(frameStartIndex.current - frameDelta);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    // If notable release velocity, start inertia
    if (Math.abs(velocity.current) > 0.4) {
      animationFrameId.current = requestAnimationFrame(runInertia);
    }
  };

  // Mouse event listeners
  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDragStart(e.clientX);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      e.preventDefault();
      handleDragMove(e.clientX);
    }
  };

  const onMouseUp = () => handleDragEnd();
  const onMouseLeave = () => handleDragEnd();

  // Touch event listeners
  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      handleDragStart(e.touches[0].clientX);
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && isDragging) {
      handleDragMove(e.touches[0].clientX);
    }
  };

  const onTouchEnd = () => handleDragEnd();

  // Auto-rotate toggle
  useEffect(() => {
    if (autoRotate) {
      autoRotateInterval.current = setInterval(() => {
        setCurrentFrame((prev) => ((prev + 1) % totalFrames));
      }, 70); // ~14 fps smooth turntable
    } else {
      if (autoRotateInterval.current) clearInterval(autoRotateInterval.current);
    }
    return () => {
      if (autoRotateInterval.current) clearInterval(autoRotateInterval.current);
    };
  }, [autoRotate, totalFrames]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      goToFrame(currentFrame + 1);
    } else if (e.key === 'ArrowRight') {
      goToFrame(currentFrame - 1);
    }
  };

  // Preset Angle definitions
  const anglePresets = [
    { labelAr: 'الأمام 0°', labelEn: 'Front 0°', frame: 0 },
    { labelAr: 'الربع الأمامي 45°', labelEn: 'Front 3/4 45°', frame: 4 },
    { labelAr: 'الجانب 90°', labelEn: 'Side 90°', frame: 9 },
    { labelAr: 'الربع الخلفي 135°', labelEn: 'Rear 3/4 135°', frame: 13 },
    { labelAr: 'الخلف 180°', labelEn: 'Rear 180°', frame: 18 },
    { labelAr: 'الجانب الأيسر 270°', labelEn: 'Side 270°', frame: 27 },
  ];

  const currentDegrees = Math.round((currentFrame * 360) / totalFrames);
  const progressPercent = Math.round((loadedCount / totalFrames) * 100);

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
      className={`relative w-full rounded-2xl overflow-hidden bg-[#0a0f1d] border border-white/10 shadow-2xl select-none group ${className}`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      style={{ direction: 'ltr' }} // Keep canvas coordinates consistent
    >
      {/* Top Header Bar: VIP Badge & Mode Disclosures */}
      <div className="absolute top-4 inset-x-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#101827]/90 text-[#A97B27] border border-[#A97B27]/40 backdrop-blur-md shadow-lg">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>{isArabic ? 'تصوير استوديو 360° تفاعلي' : 'Interactive 360° Studio Photography'}</span>
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 backdrop-blur-md">
            <CheckCircle2 className="w-3 h-3" />
            <span>{totalFrames} {isArabic ? 'إطاراً تصويرياً' : 'Sequence Frames'}</span>
          </span>
        </div>

        {/* Clear Test Sequence Disclosure Badge per instructions */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-amber-950/70 text-amber-300 border border-amber-600/40 backdrop-blur-md">
            <Info className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{isArabic ? 'عرض تجريبي معتمد (POC Turntable)' : 'POC Test Turntable Asset'}</span>
            <span className="md:hidden">POC 360°</span>
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

      {/* Main Canvas Turntable Area */}
      <div 
        className="relative w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/10] max-h-[640px] flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{ touchAction: 'none' }}
      >
        {/* Background Ambient Studio Glow */}
        <div className="absolute inset-0 bg-radial-gradient from-[#1a253c]/40 via-transparent to-[#0a0f1d] pointer-events-none" />

        {/* Canvas Element */}
        <canvas 
          ref={canvasRef} 
          className="relative z-10 w-full h-full object-contain pointer-events-none"
        />

        {/* Loading / Progressive Preloader Overlay */}
        {!isLoaded && (
          <div className="absolute inset-0 z-15 flex flex-col items-center justify-center bg-[#0a0f1d]/80 backdrop-blur-sm transition-opacity">
            <div className="w-12 h-12 rounded-full border-2 border-[#A97B27]/20 border-t-[#A97B27] animate-spin mb-3" />
            <p className="text-sm font-medium text-white/90">
              {isArabic ? 'جاري تحميل زوايا المركبة...' : 'Loading 360° sequence...'} ({progressPercent}%)
            </p>
            <div className="w-48 h-1.5 bg-white/10 rounded-full mt-2 overflow-hidden">
              <div 
                className="h-full bg-[#A97B27] transition-all duration-150 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Drag Hint Pill (Fades after first interaction) */}
        {!hasInteracted && isLoaded && (
          <div className="absolute bottom-20 z-20 pointer-events-none animate-bounce">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#101827]/90 text-white/90 text-xs font-medium border border-white/20 backdrop-blur-md shadow-2xl">
              <RotateCw className="w-3.5 h-3.5 text-[#A97B27] animate-spin" />
              <span>{isArabic ? 'اسحب أفقياً للتدوير 360 درجة' : 'Drag horizontally to rotate 360°'}</span>
            </div>
          </div>
        )}

        {/* Current Angle Readout Watermark */}
        <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/40 text-white/80 text-xs backdrop-blur-md border border-white/10 pointer-events-none">
          <Compass className="w-3.5 h-3.5 text-[#A97B27]" />
          <span className="font-mono font-semibold">{currentDegrees}°</span>
          <span className="text-white/40">|</span>
          <span className="text-white/60">{isArabic ? 'إطار' : 'Frame'} {currentFrame + 1}/{totalFrames}</span>
        </div>
      </div>

      {/* Interactive Bottom Control Dock */}
      <div className="relative z-20 p-3 sm:p-4 bg-[#0d1424] border-t border-white/10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Angle Preset Navigation Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none" style={{ direction: isArabic ? 'rtl' : 'ltr' }}>
            {anglePresets.map((preset, idx) => {
              const isActive = Math.abs(currentFrame - preset.frame) <= 1;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setHasInteracted(true);
                    setAutoRotate(false);
                    goToFrame(preset.frame);
                  }}
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

          {/* Quick Action Controls: Auto-Spin & Scrub Slider */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            {/* Auto Spin Toggle */}
            <button
              type="button"
              onClick={() => {
                setHasInteracted(true);
                setAutoRotate(!autoRotate);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                autoRotate
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                  : 'bg-white/5 hover:bg-white/10 text-white/80 border border-white/10'
              }`}
            >
              {autoRotate ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{autoRotate ? (isArabic ? 'إيقاف الدوران' : 'Stop Auto-Spin') : (isArabic ? 'دوران تلقائي' : 'Auto-Spin')}</span>
            </button>

            {/* Frame Scrub Range Slider */}
            <input
              type="range"
              min={0}
              max={totalFrames - 1}
              value={currentFrame}
              onChange={(e) => {
                setHasInteracted(true);
                setAutoRotate(false);
                goToFrame(parseInt(e.target.value, 10));
              }}
              className="w-28 sm:w-36 h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#A97B27]"
              aria-label="Angle scrub"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Vehicle360Viewer;
