import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
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

  // Determine if we should use absolute paths (for routing back to home) or hash links
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

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-primary/80 backdrop-blur-md border-b border-text-primary/5 shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-shrink-0"
            >
              <Link to="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent to-purple-400">
                {PERSONAL_INFO.name.split(' ')[1].toLowerCase()}
                <span className="text-text-primary">.dev</span>
              </Link>
            </motion.div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
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
                            className="text-text-secondary hover:text-accent hover:bg-text-primary/5 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                         >
                            {link.name}
                         </a>
                     ) : (
                         <Link
                            to={link.href}
                            className="text-text-secondary hover:text-accent hover:bg-text-primary/5 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                         >
                            {link.name}
                         </Link>
                     )}
                  </motion.div>
                ))}
                
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  onClick={toggleTheme}
                  className="p-2 rounded-full text-text-secondary hover:text-accent hover:bg-text-primary/5 transition-colors"
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </motion.button>

                <motion.a 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  href={getHref("#contact")}
                  className="bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-indigo-500/25"
                >
                  Hire Me
                </motion.a>
              </div>
            </div>
            
            <div className="flex items-center gap-4 md:hidden">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-text-secondary hover:text-accent hover:bg-text-primary/5 transition-colors"
              >
                 {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-text-primary/5 focus:outline-none"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-secondary border-b border-text-primary/5 overflow-hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navLinks.map((link) => (
                    isHome ? (
                         <a 
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="text-text-secondary hover:text-text-primary block px-3 py-2 rounded-md text-base font-medium"
                         >
                            {link.name}
                         </a>
                     ) : (
                         <Link
                            key={link.name}
                            to={link.href}
                            onClick={() => setIsOpen(false)}
                            className="text-text-secondary hover:text-text-primary block px-3 py-2 rounded-md text-base font-medium"
                         >
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
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent origin-left z-50"
          style={{ scaleX }}
        />
      </nav>
    </>
  );
};

export default Navbar;