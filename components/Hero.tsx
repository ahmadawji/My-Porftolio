import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';
import { motion, useScroll, useTransform } from 'framer-motion';
import { AsciiEffect } from './ui/ascii-effect.tsx';

// --- Terminal Boot Sequence ---
const bootLines = [
  { text: '> SYSTEM.INIT()', delay: 0 },
  { text: '> LOADING MODULES...', delay: 200 },
  { text: '> AUTH: VERIFIED', delay: 500 },
  { text: '> STATUS: OPERATIONAL', delay: 800 },
  { text: '> PORTFOLIO.RENDER()', delay: 1200 },
  { text: '', delay: 1600 },
];

const TerminalBoot: React.FC = () => {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    bootLines.forEach((line, i) => {
      timers.push(setTimeout(() => {
        setVisibleLines(i + 1);
        if (i === bootLines.length - 1) {
          setTimeout(() => setDone(true), 400);
        }
      }, line.delay));
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div style={{
      position: 'absolute',
      top: '32px',
      left: '32px',
      fontFamily: 'var(--font-mono)',
      fontSize: '11px',
      lineHeight: '20px',
      letterSpacing: '0.05em',
      color: 'var(--color-text-muted)',
      textTransform: 'uppercase',
      opacity: done ? 0.3 : 0.6,
      transition: 'opacity 600ms ease',
      zIndex: 2,
      pointerEvents: 'none',
    }}>
      {bootLines.slice(0, visibleLines).map((line, i) => (
        <div key={i} style={{ marginBottom: '2px' }}>
          {line.text}
          {i === visibleLines - 1 && !done && (
            <span style={{
              color: 'var(--color-accent)',
              animation: 'blink-cursor 1s step-end infinite',
              marginLeft: '2px',
            }}>█</span>
          )}
        </div>
      ))}
    </div>
  );
};

// --- Grid Background ---
const GridBackground: React.FC = () => {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
    }}>
      {/* Horizontal lines */}
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <pattern id="grid-h" width="100" height="100" patternUnits="userSpaceOnUse">
            <line x1="0" y1="100" x2="100" y2="100" stroke="var(--color-outline-variant)" strokeWidth="0.5" opacity="0.3" />
          </pattern>
          <pattern id="grid-v" width="100" height="100" patternUnits="userSpaceOnUse">
            <line x1="100" y1="0" x2="100" y2="100" stroke="var(--color-outline-variant)" strokeWidth="0.5" opacity="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-h)" />
        <rect width="100%" height="100%" fill="url(#grid-v)" />
      </svg>

      {/* Corner decorations */}
      <div style={{
        position: 'absolute',
        top: '32px',
        right: '32px',
        width: '60px',
        height: '60px',
        borderTop: '1px solid var(--color-outline-variant)',
        borderRight: '1px solid var(--color-outline-variant)',
        opacity: 0.4,
      }} />
      <div style={{
        position: 'absolute',
        bottom: '32px',
        left: '32px',
        width: '60px',
        height: '60px',
        borderBottom: '1px solid var(--color-outline-variant)',
        borderLeft: '1px solid var(--color-outline-variant)',
        opacity: 0.4,
      }} />
    </div>
  );
};

// --- Floating Coordinates ---
const FloatingCoords: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const coordStyle: React.CSSProperties = {
    position: 'absolute',
    fontFamily: 'var(--font-mono)',
    fontSize: '10px',
    letterSpacing: '0.1em',
    color: 'var(--color-text-muted)',
    textTransform: 'uppercase',
    opacity: 0.4,
    pointerEvents: 'none',
  };

  return (
    <>
      <div style={{ ...coordStyle, top: '32px', right: '32px', textAlign: 'right' }}>
        <div>{time.toLocaleTimeString('en-US', { hour12: false })}</div>
        <div style={{ marginTop: '4px' }}>{time.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}</div>
      </div>
      <div style={{ ...coordStyle, bottom: '80px', right: '32px', textAlign: 'right' }}>
        <div>33.5571° N</div>
        <div>35.3729° E</div>
      </div>
    </>
  );
};

// --- Main Hero ---
const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section
      className="scanlines"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'var(--color-bg)',
        borderBottom: '1px solid var(--color-outline-variant)',
      }}
    >
      <GridBackground />
      <TerminalBoot />
      <FloatingCoords />

      <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '120px 16px 80px' }} id="#">
        <motion.div
          style={{ y: y1, opacity }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 1.4 }}
          className="flex flex-col-reverse lg:flex-row items-center justify-center gap-8 text-center lg:text-left"
        >
          <div className="flex-2 max-w-4xl">

            {/* Name */}
            <h1 className="display-lg" style={{
              color: 'var(--color-text)',
              marginBottom: '16px',
            }}>
              {PERSONAL_INFO.name}
            </h1>
            {/* Role - terminal style */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.5 }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '16px',
                fontWeight: 400,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                color: 'var(--color-accent)',
                marginBottom: '32px',
              }}
            >
              <span style={{ color: 'var(--color-text-muted)', marginRight: '8px' }}>&gt;</span>
              ROLE: {PERSONAL_INFO.title.toUpperCase().replace(' ', '_')}
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.0, duration: 0.5 }}
              className="body-lg"
              style={{
                color: 'var(--color-text-variant)',
                maxWidth: '600px',
                marginBottom: '48px',
              }}
            >
              {PERSONAL_INFO.tagline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.5 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <a href="#about" className="btn btn-primary">
                EXPLORE <ArrowRight size={16} />
              </a>
              <a href="#contact" className="btn">
                GET IN TOUCH
              </a>
            </motion.div>

          </div>
          <div className="w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[480px] aspect-square overflow-hidden rounded-2xl shrink-0">
            <AsciiEffect
              variant="glitch"
              imageSrc="./assets/images/Profile_Transparent.png"
              fontSize={9}
              scale={1.15}
              colors={['#050505', '#e2e4cf']}
              backgroundColor='#050505'
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
        }}
        onClick={() => {
          const aboutSection = document.getElementById('about');
          aboutSection?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span className="label-caps" style={{ color: 'var(--color-text-muted)' }}>SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{
            width: '1px',
            height: '24px',
            background: 'var(--color-accent)',
          }}
        />
      </motion.div>
    </section>
  );
};

export default Hero;