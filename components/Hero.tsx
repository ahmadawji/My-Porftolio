import React, { useEffect, useRef } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

// --- Pixel Art Engine & Assets ---

interface Entity {
  id: number;
  type: 'sheep' | 'goose' | 'chicken';
  x: number;
  y: number; // Offset from ground Y
  dir: 1 | -1;
  speed: number;
  frameOffset: number;
}

interface Star {
  x: number;
  y: number;
  size: number;
  twinkleSpeed: number;
  phase: number;
}

const PixelBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  
  // Keep stars stable across renders
  const starsRef = useRef<Star[]>([]);

  // Initialize stars once
  useEffect(() => {
    if (starsRef.current.length === 0) {
      for (let i = 0; i < 50; i++) {
        starsRef.current.push({
          x: Math.random(), // Relative 0-1
          y: Math.random() * 0.6, // Top 60% of screen
          size: Math.random() > 0.8 ? 2 : 1,
          twinkleSpeed: 0.02 + Math.random() * 0.05,
          phase: Math.random() * Math.PI * 2
        });
      }
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    const pixelScale = 4;

    // Game State
    const animals: Entity[] = [];
    
    // Calculate approximate game width for spawning
    const logicalWidth = Math.ceil(window.innerWidth / pixelScale);

    // Spawn function with spacing check
    const spawn = (type: Entity['type'], count: number) => {
        for(let i=0; i<count; i++) {
            let x = 0;
            let attempts = 0;
            let valid = false;

            // Try to find a spot not too close to others
            while (!valid && attempts < 10) {
                x = Math.random() * (logicalWidth - 20); // -20 buffer from right edge
                valid = true;
                
                // Check distance against existing animals
                for (const other of animals) {
                    if (Math.abs(other.x - x) < 25) { // Ensure at least 25px gap (approx 100 screen pixels)
                        valid = false;
                        break;
                    }
                }
                attempts++;
            }

            animals.push({
                id: Math.random(),
                type,
                x: x, 
                y: 2 + Math.random() * 10, // Small positive offset from groundY line
                dir: Math.random() > 0.5 ? 1 : -1,
                speed: 0.03 + Math.random() * 0.02, // Slow movement
                frameOffset: Math.random() * 100,
            });
        }
    };

    // Spread animals across the canvas
    spawn('sheep', 3);
    spawn('goose', 3);
    spawn('chicken', 3);

    const drawPixelRect = (x: number, y: number, w: number, h: number, color: string) => {
      ctx.fillStyle = color;
      ctx.fillRect(Math.floor(x) * pixelScale, Math.floor(y) * pixelScale, w * pixelScale, h * pixelScale);
    };

    const drawTree = (x: number, y: number) => {
      const trunkColor = theme === 'dark' ? '#3f2e26' : '#8B4513';
      const leafColor = theme === 'dark' ? '#0f392b' : '#228B22'; 
      
      // Trunk
      drawPixelRect(x + 3, y - 10, 2, 10, trunkColor);
      // Leaves
      drawPixelRect(x, y - 20, 8, 10, leafColor);
      drawPixelRect(x + 1, y - 24, 6, 4, leafColor);
      drawPixelRect(x + 2, y - 26, 4, 2, leafColor);
    };

    const drawPizzaOven = (x: number, y: number, t: number) => {
      const stoneDark = theme === 'dark' ? '#4a4a4a' : '#7a7a7a';
      const stoneDarker = theme === 'dark' ? '#2a2a2a' : '#5a5a5a';

      // Base
      drawPixelRect(x, y - 12, 14, 12, stoneDark);
      // Dome
      drawPixelRect(x + 1, y - 14, 12, 2, stoneDark);
      drawPixelRect(x + 3, y - 15, 8, 1, stoneDark);
      // Opening
      drawPixelRect(x + 4, y - 8, 6, 6, '#1a1a1a');
      // Chimney
      drawPixelRect(x + 8, y - 18, 3, 4, stoneDarker);
      drawPixelRect(x + 7, y - 20, 5, 2, stoneDark);
      
      // Fire Animation
      if (Math.floor(t / 20) % 2 === 0) {
        drawPixelRect(x + 5, y - 6, 4, 4, '#FF4500'); 
        drawPixelRect(x + 6, y - 5, 2, 2, '#FFD700'); 
      } else {
        drawPixelRect(x + 5, y - 5, 4, 3, '#FF8C00'); 
        drawPixelRect(x + 6, y - 6, 2, 2, '#FFFF00'); 
      }

      // Smoke
      const smokeY = (t * 0.05) % 30; 
      if (smokeY < 20) {
          drawPixelRect(x + 9 + Math.sin(t * 0.02) * 2, y - 22 - smokeY, 2, 2, theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.4)');
      }
    };

    const drawChair = (x: number, y: number) => {
        const color = theme === 'dark' ? '#374151' : '#4b5563'; // Grayish chair
        
        // Correct Perspective:
        // y is the ground line. Furniture should sit ON the ground (extend upwards from y).
        
        // Seat: Top at y-8, Height 2. (Visual y-8 to y-6)
        drawPixelRect(x, y - 8, 7, 2, color);
        // Back: From Seat up.
        drawPixelRect(x, y - 16, 1, 8, color);
        
        // Legs: From bottom of seat (y-6) down to ground (y).
        drawPixelRect(x + 1, y - 6, 1, 6, color); // Back leg
        drawPixelRect(x + 5, y - 6, 1, 6, color); // Front leg
    };

    const drawTable = (x: number, y: number) => {
        const woodColor = theme === 'dark' ? '#451a03' : '#78350f';
        const topColor = theme === 'dark' ? '#78350f' : '#b45309';

        // Table Top: Should be higher than chair seat.
        // Let's put it at y-12.
        
        // Top: y-12, height 2.
        drawPixelRect(x, y - 12, 12, 2, topColor);

        // Legs: From y-10 down to y.
        drawPixelRect(x + 1, y - 10, 1, 10, woodColor); 
        drawPixelRect(x + 10, y - 10, 1, 10, woodColor);
    };

    const drawGuyWithWorkspace = (x: number, y: number, t: number) => {
      // Setup relative positions
      const chairX = x;
      const guyX = x + 1;
      const tableX = x + 6;

      drawChair(chairX, y);
      drawTable(tableX, y);

      const shirt = theme === 'dark' ? '#1e40af' : '#3b82f6';
      
      // Guy sitting position needs to match the new chair height (seat at y-8)
      const seatY = y - 8;

      // Body (Sitting on chair)
      // Legs (dangling/sitting)
      drawPixelRect(guyX + 4, seatY + 2, 1, 4, '#1e293b'); // Shin dangling down
      drawPixelRect(guyX, seatY, 5, 2, '#1e293b'); // Thigh on seat

      // Torso (From seat up)
      drawPixelRect(guyX, seatY - 6, 4, 6, shirt); 
      
      // Head
      drawPixelRect(guyX, seatY - 11, 4, 5, '#ffccaa'); // Skin
      drawPixelRect(guyX, seatY - 12, 4, 2, '#451a03'); // Hair

      // Laptop (On table top at y-12)
      const laptopX = tableX + 3;
      const laptopY = y - 13; // On top of table
      drawPixelRect(laptopX, laptopY, 6, 1, '#94a3b8'); // Base
      drawPixelRect(laptopX, laptopY - 5, 1, 5, '#94a3b8'); // Screen Back
      drawPixelRect(laptopX + 0.5, laptopY - 4.5, 0.5, 4, '#e0f2fe'); // Screen Glow

      // Arms/Typing
      const handY = Math.floor(t / 20) % 2 === 0 ? seatY - 3 : seatY - 4; 
      drawPixelRect(guyX + 2, handY, 4, 1, '#ffccaa');
    };

    const drawTent = (x: number, y: number, w: number, h: number) => {
        const poleColor = theme === 'dark' ? '#3f2e26' : '#8B4513';
        const canvasColor = theme === 'dark' ? '#312e81' : '#6366f1'; // Indigo/Purple
        const canvasDark = theme === 'dark' ? '#1e1b4b' : '#4338ca';

        // Poles
        drawPixelRect(x + 2, y - h, 2, h, poleColor);
        drawPixelRect(x + w - 4, y - h, 2, h, poleColor);

        // Canopy Roof
        // Triangular/Trapezoid shape
        const roofHeight = 16;
        const roofY = y - h;
        
        // Draw main slope
        for (let i = 0; i < roofHeight; i++) {
            const widthAtHeight = w + (i * 0.5); // Slightly wider at bottom
            const xOffset = - (i * 0.25);
            drawPixelRect(x + xOffset, roofY - roofHeight + i, widthAtHeight, 1, canvasColor);
        }
        
        // Scalloped edge
        for(let i = -2; i < w + 2; i += 5) {
             drawPixelRect(x + i, roofY, 3, 2, canvasDark);
        }
        
        // Top flag
        drawPixelRect(x + w/2 - 1, roofY - roofHeight - 4, 1, 4, poleColor);
        drawPixelRect(x + w/2, roofY - roofHeight - 4, 4, 3, '#ef4444');
    };

    const drawAnimal = (entity: Entity, x: number, y: number, t: number) => {
      // Slower bounce
      const bounce = Math.sin((t + entity.frameOffset) * 0.05) > 0 ? 1 : 0;
      const ay = y - bounce; 
      
      if (entity.type === 'sheep') {
        const fleece = theme === 'dark' ? '#cbd5e1' : '#f1f5f9';
        const darkPart = '#0f172a';
        // Body
        drawPixelRect(x, ay - 6, 8, 5, fleece);
        // Legs
        if (bounce === 0) {
            drawPixelRect(x + 1, ay - 1, 1, 2, darkPart);
            drawPixelRect(x + 6, ay - 1, 1, 2, darkPart);
        }
        // Head
        drawPixelRect(entity.dir === 1 ? x + 6 : x - 2, ay - 7, 3, 3, darkPart);
      } 
      else if (entity.type === 'goose') {
        const feathers = theme === 'dark' ? '#e2e8f0' : '#ffffff';
        // Body
        drawPixelRect(x, ay - 4, 5, 3, feathers);
        // Neck
        drawPixelRect(entity.dir === 1 ? x + 4 : x, ay - 8, 1, 4, feathers);
        // Beak
        drawPixelRect(entity.dir === 1 ? x + 5 : x - 1, ay - 7, 1, 1, '#f97316');
      }
      else if (entity.type === 'chicken') {
        const feathers = theme === 'dark' ? '#7c2d12' : '#9a3412';
        // Body
        drawPixelRect(x, ay - 3, 3, 2, feathers);
        // Head
        drawPixelRect(entity.dir === 1 ? x + 2 : x - 1, ay - 5, 2, 2, feathers);
        // Comb
        drawPixelRect(entity.dir === 1 ? x + 2 : x, ay - 6, 1, 1, '#dc2626');
      }
    };

    const render = () => {
      time++;
      
      // Responsive Canvas sizing
      if (canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight) {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        ctx.imageSmoothingEnabled = false;
      }

      const w = Math.ceil(canvas.width / pixelScale);
      const h = Math.ceil(canvas.height / pixelScale);
      const groundY = Math.floor(h * 0.75); // Ground position

      // --- Draw Background (Day/Night) ---
      const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      
      if (theme === 'dark') {
          // Night Sky
          skyGradient.addColorStop(0, '#020617');
          skyGradient.addColorStop(1, '#1e1b4b');
          ctx.fillStyle = skyGradient;
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // Stars
          starsRef.current.forEach(star => {
              const opacity = 0.4 + Math.sin(time * star.twinkleSpeed + star.phase) * 0.4;
              ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
              drawPixelRect(star.x * w, star.y * h, star.size, star.size, ctx.fillStyle as string);
          });

          // Moon
          const moonX = w - 50;
          const moonY = 30;
          drawPixelRect(moonX, moonY, 8, 8, '#cbd5e1');
          drawPixelRect(moonX + 2, moonY + 2, 3, 3, '#94a3b8');

      } else {
          // Day Sky
          skyGradient.addColorStop(0, '#7dd3fc');
          skyGradient.addColorStop(1, '#bae6fd');
          ctx.fillStyle = skyGradient;
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // Sun
          const sunX = w - 50;
          const sunY = 30;
          drawPixelRect(sunX, sunY, 10, 10, '#fde047');
          drawPixelRect(sunX - 1, sunY + 1, 12, 8, 'rgba(253, 224, 71, 0.4)');
      }

      // Clouds
      ctx.fillStyle = theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.6)';
      const cloudSpeed = 0.01; 
      const c1x = (time * cloudSpeed) % (w + 60) - 30;
      const c2x = ((time * cloudSpeed * 0.8) + 150) % (w + 60) - 30;
      
      drawPixelRect(c1x, 20, 18, 6, ctx.fillStyle as string);
      drawPixelRect(c1x + 6, 16, 8, 4, ctx.fillStyle as string);
      
      drawPixelRect(c2x, 40, 24, 7, ctx.fillStyle as string);
      drawPixelRect(c2x + 5, 35, 12, 5, ctx.fillStyle as string);

      // Ground (Grass)
      const grassColor = theme === 'dark' ? '#14532d' : '#4ade80';
      // const dirtColor = theme === 'dark' ? '#113a22' : '#22c55e'; // Replaced by more specific colors below
      
      ctx.fillStyle = grassColor;
      ctx.fillRect(0, groundY * pixelScale, canvas.width, (h - groundY) * pixelScale);
      
      // Ground Decorations: Grass Tufts, Pebbles, Flowers
      for (let i = 0; i < w; i++) {
        // Deterministic random generators based on X position to ensure stability
        // Use large primes to avoid obvious patterns
        const rand = Math.abs(Math.sin(i * 12.9898 + 78.233)); 
        const randY = Math.abs(Math.sin(i * 78.233 + 12.9898));
        
        // Random Y position between groundY + buffer and bottom of screen
        const yPos = groundY + 2 + Math.floor(randY * (h - groundY - 6));
        
        // 1. Grass Tufts (Frequent) - Vertical blades
        if (rand > 0.7 && i % 3 === 0) { 
            const tuftColor = theme === 'dark' ? '#166534' : '#22c55e'; // Darker green
            drawPixelRect(i, yPos, 1, 2, tuftColor);
            // Occasional double blade
            if (rand > 0.85) drawPixelRect(i + 1, yPos + 1, 1, 1, tuftColor);
        }

        // 2. Pebbles (Occasional) - Grey dots
        if (rand > 0.94 && i % 11 === 0) {
            const pebbleColor = theme === 'dark' ? '#334155' : '#94a3b8'; // Slate
            drawPixelRect(i, yPos, 2, 1, pebbleColor);
        }

        // 3. Flowers (Rare)
        // Ensure they aren't too close to the very bottom
        if (rand > 0.97 && i % 19 === 0 && yPos < h - 8) {
             const stemColor = theme === 'dark' ? '#064e3b' : '#15803d';
             
             // Alternating Flower Types based on X position
             if (Math.floor(i / 10) % 2 === 0) {
                 // Type A: Daisy-like (Yellow/White)
                 drawPixelRect(i, yPos, 1, 3, stemColor); // Stem
                 drawPixelRect(i - 1, yPos - 3, 3, 1, '#fef08a'); // Petals Horizontal
                 drawPixelRect(i, yPos - 4, 1, 3, '#fef08a'); // Petals Vertical
                 drawPixelRect(i, yPos - 3, 1, 1, '#ffffff'); // Center
             } 
             else {
                 // Type B: Tulip-like (Pink/Red)
                 drawPixelRect(i, yPos, 1, 2, stemColor); // Short Stem
                 drawPixelRect(i - 1, yPos - 2, 1, 2, '#f472b6'); // Left Petal
                 drawPixelRect(i + 1, yPos - 2, 1, 2, '#f472b6'); // Right Petal
                 drawPixelRect(i, yPos - 3, 1, 1, '#f472b6'); // Top Petal
                 drawPixelRect(i, yPos - 2, 1, 1, '#fbcfe8'); // Center Highlight
             }
        }
      }

      // Trees - Lowered and placed on the ground
      drawTree(20, groundY + 5);
      drawTree(w - 30, groundY + 8);
      drawTree(w * 0.15, groundY + 2);
      drawTree(w * 0.85, groundY + 6);

      // --- Interactive Camp Scene ---
      // Ordering for depth: Animals behind -> Camp -> Tent
      
      // 1. Animals (Background Layer)
      animals.forEach(animal => {
        // Simple roaming: Bounds are now 0 to width
        const minX = 0;
        const maxX = w - 10;

        // Move
        if (Math.random() < 0.005) animal.dir *= -1;
        animal.x += animal.speed * animal.dir;
        
        // Boundaries
        if (animal.x < minX) { animal.x = minX; animal.dir = 1; }
        if (animal.x > maxX) { animal.x = maxX; animal.dir = -1; }

        // Render at GROUND Level + offset
        drawAnimal(animal, animal.x, groundY + animal.y, time);
      });

      // 2. Camp Scene (Mid/Fore Layer)
      const campCenterX = Math.floor(w * 0.65);
      const campY = groundY + 20; // Position slightly lower than horizon for depth

      // Oven
      drawPizzaOven(campCenterX + 28, campY, time);

      // Workspace (Guy, Table, Chair)
      drawGuyWithWorkspace(campCenterX, campY, time);
      
      // Tent (Draws "over" or "around" them)
      // Tent covers from campCenterX - 10 to campCenterX + 50
      drawTent(campCenterX - 10, campY, 65, 35);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [theme]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full block" style={{ imageRendering: 'pixelated' }} />
    </div>
  );
};

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, 100]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-sky-300 to-sky-100 dark:from-slate-900 dark:to-slate-800 transition-colors duration-500">
      <PixelBackground />
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/20 dark:to-slate-900/40 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
            style={{ y: y1 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-text-primary mb-6 tracking-tight drop-shadow-sm">
            {PERSONAL_INFO.name}
          </h1>
          <h2 className="text-2xl md:text-3xl text-accent font-semibold mb-8">
            {PERSONAL_INFO.title}
          </h2>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed bg-white/30 dark:bg-black/30 backdrop-blur-sm p-4 rounded-xl border border-white/20 shadow-lg">
            {PERSONAL_INFO.tagline}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="#about"
              className="px-8 py-3 bg-accent hover:bg-accent-hover text-white rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-accent/50 hover:-translate-y-1 flex items-center gap-2"
            >
              Learn more <ArrowRight size={18} />
            </a>
            <a 
              href="#contact" 
              className="px-8 py-3 bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-800 text-text-primary rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl border border-white/20 hover:-translate-y-1 backdrop-blur-sm"
            >
              Get in touch
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div 
        style={{ y: y2 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-text-secondary cursor-pointer"
        onClick={() => {
            const aboutSection = document.getElementById('about');
            aboutSection?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
};

export default Hero;