import React from 'react';
import { SKILL_CATEGORIES } from '../constants';
import { motion } from 'framer-motion';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-text-primary mb-4"
          >
            Technical Skills
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            className="h-1 bg-accent mx-auto rounded-full mb-6"
          />
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary max-w-2xl mx-auto"
          >
            A comprehensive toolset for building modern, scalable, and user-centric web applications.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SKILL_CATEGORIES.map((category, idx) => (
            <motion.div 
              key={category.title} 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md rounded-xl p-6 border border-white/20 dark:border-slate-700/30 hover:border-accent/50 transition-colors duration-300 shadow-lg"
            >
              <h3 className="text-xl font-semibold text-text-primary mb-6 border-b border-text-primary/10 pb-2 inline-block">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <div 
                    key={skill} 
                    className="px-3 py-1.5 bg-white/50 dark:bg-slate-800/50 text-sm text-text-secondary rounded-md border border-text-primary/5 hover:text-text-primary hover:bg-accent/20 transition-colors cursor-default"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;