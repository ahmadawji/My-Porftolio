import React from 'react';
import Hero from './Hero';
import About from './About';
import Experience from './Experience';
import Skills from './Skills';
import ActivityBoard from './ActivityBoard';
import Contact from './Contact';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Skills />
      <ActivityBoard />
      <Contact />
    </>
  );
};

export default Home;