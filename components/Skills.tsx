import React from 'react';
import { SKILL_CATEGORIES } from '../constants';
import { motion } from 'framer-motion';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="section">
      <div className="container">
        <div className="section-header">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            Technical Skills
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            viewport={{ once: true }}
            className="section-bar"
          />
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="section-subtitle"
          >
            A comprehensive toolset for building modern, scalable, and user-centric web applications.
          </motion.p>
        </div>

        <div className="grid-3">
          {SKILL_CATEGORIES.map((category, idx) => (
            <motion.div 
              key={category.title} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="card"
            >
              <h3 className="headline-sm" style={{ 
                color: 'var(--color-accent)', 
                marginBottom: '24px',
                paddingBottom: '12px',
                borderBottom: '1px solid var(--color-outline-variant)',
                fontSize: '16px',
              }}>
                {category.title}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {category.skills.map((skill) => (
                  <div 
                    key={skill} 
                    className="leader-line"
                    style={{ cursor: 'default' }}
                  >
                    <span className="leader-label body-sm" style={{ color: 'var(--color-text-variant)' }}>
                      <span style={{ color: 'var(--color-accent)', marginRight: '6px' }}>&gt;</span>
                      {skill}
                    </span>
                    <span className="leader-dots" />
                    <span style={{ color: 'var(--color-accent)', fontSize: '11px' }}>■</span>
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