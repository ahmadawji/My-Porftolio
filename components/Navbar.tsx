import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location.pathname === '/' || location.pathname === '';
  
  const getHref = (hash: string) => {
    return isHome ? hash : `/${hash}`;
  };

  const navLinks = [
    { name: 'About', href: getHref('#about') },
    { name: 'Experience', href: getHref('#experience') },
    { name: 'Skills', href: getHref('#skills') },
    { name: 'Activity', href: getHref('#activity') },
    { name: 'Contact', href: getHref('#contact') },
  ];

  const navStyle: React.CSSProperties = {
    position: 'fixed',
    width: '100%',
    zIndex: 50,
    transition: 'background 200ms ease, border-color 200ms ease',
    background: scrolled ? 'rgba(5, 5, 5, 0.95)' : 'transparent',
    borderBottom: scrolled ? '1px solid var(--color-outline-variant)' : '1px solid transparent',
  };

  const linkStyle: React.CSSProperties = {
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    fontWeight: 500,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--color-text-variant)',
    padding: '8px 12px',
    transition: 'color 100ms ease',
    textDecoration: 'none',
  };

  return (
    <>
      <nav style={navStyle}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '56px' }}>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link 
              to="/" 
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '20px',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                color: 'var(--color-accent)',
                textDecoration: 'none',
              }}
            >
              AWJI<span style={{ color: 'var(--color-text)' }}>.DEV</span>
            </Link>
          </motion.div>
          
          {/* Desktop Nav */}
          <div style={{ display: 'none' }} className="nav-desktop">
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {isHome ? (
                    <a 
                      href={link.href} 
                      style={linkStyle}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-accent)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-variant)')}
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      style={linkStyle}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-accent)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-variant)')}
                    >
                      {link.name}
                    </Link>
                  )}
                </motion.div>
              ))}
              
              <motion.a 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                href={getHref("#contact")}
                className="btn btn-primary"
                style={{ marginLeft: '16px', padding: '8px 20px', fontSize: '11px' }}
              >
                HIRE ME
              </motion.a>
            </div>
          </div>
          
          {/* Mobile Toggle */}
          <div className="nav-mobile-toggle">
            <button
              onClick={() => setIsOpen(!isOpen)}
              style={{
                padding: '8px',
                background: 'none',
                border: '1px solid var(--color-outline-variant)',
                color: 'var(--color-text-variant)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{
                overflow: 'hidden',
                background: 'var(--color-surface)',
                borderBottom: '1px solid var(--color-outline-variant)',
              }}
              className="nav-mobile-menu"
            >
              <div style={{ padding: '8px 16px 16px' }}>
                {navLinks.map((link) => (
                  isHome ? (
                    <a 
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      style={{
                        ...linkStyle,
                        display: 'block',
                        padding: '12px 0',
                        borderBottom: '1px solid var(--color-outline-variant)',
                      }}
                    >
                      <span style={{ color: 'var(--color-accent)', marginRight: '8px' }}>&gt;</span>
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      key={link.name}
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      style={{
                        ...linkStyle,
                        display: 'block',
                        padding: '12px 0',
                        borderBottom: '1px solid var(--color-outline-variant)',
                      }}
                    >
                      <span style={{ color: 'var(--color-accent)', marginRight: '8px' }}>&gt;</span>
                      {link.name}
                    </Link>
                  )
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scroll Progress Bar */}
        <motion.div
          style={{ 
            scaleX,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'var(--color-accent)',
            transformOrigin: 'left',
            zIndex: 50,
          }}
        />
      </nav>

      {/* Responsive styles injected via <style> tag */}
      <style>{`
        .nav-desktop { display: none !important; }
        .nav-mobile-toggle { display: block; }
        @media (min-width: 768px) {
          .nav-desktop { display: block !important; }
          .nav-mobile-toggle { display: none !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;