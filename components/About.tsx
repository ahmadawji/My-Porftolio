import React from 'react';
import { PERSONAL_INFO } from '../constants';
import { Code, Layout, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  const cards = [
    {
      icon: <Code size={32} className="text-accent" />,
      title: "Clean Code",
      description: "Writing maintainable, scalable, and documented code using TypeScript and React best practices."
    },
    {
      icon: <Layout size={32} className="text-purple-400" />,
      title: "Modern UI/UX",
      description: "Translating high-fidelity Figma mockups into pixel-perfect, responsive interfaces."
    },
    {
      icon: <Smartphone size={32} className="text-pink-400" />,
      title: "Responsive Design",
      description: "Ensuring cross-browser compatibility and mobile-first experiences for all users."
    }
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-text-primary mb-4"
          >
            About Me
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            className="h-1 bg-accent mx-auto rounded-full"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md p-8 rounded-2xl border border-white/20 dark:border-slate-700/30 shadow-xl"
          >
            <h3 className="text-2xl font-semibold text-text-primary mb-6">
              Engineering Digital Solutions
            </h3>
            <p className="text-lg text-text-secondary leading-relaxed mb-6">
              {PERSONAL_INFO.summary}
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/50 dark:bg-slate-800/50 px-4 py-2 rounded-lg border border-text-primary/5">
                <span className="text-accent font-semibold">Location:</span> {PERSONAL_INFO.location}
              </div>
              <div className="bg-white/50 dark:bg-slate-800/50 px-4 py-2 rounded-lg border border-text-primary/5">
                <span className="text-accent font-semibold">Degree:</span> BS Computer Science (3.7 GPA)
              </div>
            </div>
          </motion.div>

          <div className="grid gap-6">
            {cards.map((card, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md p-6 rounded-xl border border-white/20 dark:border-slate-700/30 hover:border-accent/30 transition-all duration-300 shadow-lg cursor-default"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                    {card.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-text-primary">{card.title}</h4>
                    <p className="text-sm text-text-secondary">{card.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;