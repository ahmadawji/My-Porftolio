import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import { ThemeProvider } from './context/ThemeContext';
import Lenis from 'lenis';

const App: React.FC = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Modified anchor handling to prevent invalid selector error and support routing
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor) {
        const href = anchor.getAttribute('href');
        // Check if href is a hash link and starts with #
        if (href && href.startsWith('#')) {
          // Prevent handling for simple '#' or if we are not on the home page (unless it's a generic link)
          if (href === '#') {
             e.preventDefault();
             lenis.scrollTo(0);
             return;
          }

          // We only want to smooth scroll if we are on the home page/root
          // With HashRouter, paths look like #/ and #/blog/id. 
          // Native anchor scrolling usually fails in SPA without help.
          // Since we used HashRouter, 'window.location.hash' will be '#/' or '#/blog/id'.
          // The href attribute from a link <a href="#about"> is just '#about'.
          
          // Logic: If we are viewing the home component,  try to scroll.
          // In HashRouter, root is '#/'
          if (window.location.hash === '#/' || window.location.hash === '') {
             e.preventDefault();
             try {
               const element = document.querySelector(href);
               if (element) {
                 lenis.scrollTo(element as HTMLElement);
               }
             } catch (err) {
               console.warn(`Invalid selector skipped: ${href}`);
             }
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      lenis.destroy();
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <div className="relative min-h-screen text-text-primary selection:bg-accent selection:text-white transition-colors duration-300">
          <div className="fixed inset-0 -z-50 gradient-bg transition-colors duration-500"></div>
          
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;