import React from 'react';
import { PERSONAL_INFO } from '../constants';
import { Code, Layout, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  const cards = [
    {
      icon: <Code size={24} />,
      title: 'Clean Code',
      description: 'Writing maintainable, scalable, and documented code using TypeScript and React best practices.',
    },
    {
      icon: <Layout size={24} />,
      title: 'Modern UI/UX',
      description: 'Translating high-fidelity Figma mockups into pixel-perfect, responsive interfaces.',
    },
    {
      icon: <Smartphone size={24} />,
      title: 'Responsive Design',
      description: 'Ensuring cross-browser compatibility and mobile-first experiences for all users.',
    },
  ];

  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-header">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            About Me
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            viewport={{ once: true }}
            className="section-bar"
          />
        </div>

        <div className="grid-2">
          {/* Summary block */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card"
          >
            <h3 className="headline-sm" style={{ color: 'var(--color-accent)', marginBottom: '24px' }}>
              Engineering Digital Solutions
            </h3>
            <p className="body-sm" style={{ color: 'var(--color-text-variant)', marginBottom: '32px', lineHeight: '22px' }}>
              {PERSONAL_INFO.summary}
            </p>
            
            {/* Terminal-style stats */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="leader-line">
                <span className="leader-label label-caps">
                  <span style={{ color: 'var(--color-accent)' }}>&gt;</span> Location
                </span>
                <span className="leader-dots" />
                <span className="leader-value body-sm">{PERSONAL_INFO.location}</span>
              </div>
              <div className="leader-line">
                <span className="leader-label label-caps">
                  <span style={{ color: 'var(--color-accent)' }}>&gt;</span> Degree
                </span>
                <span className="leader-dots" />
                <span className="leader-value body-sm">BS Computer Science (3.7 GPA)</span>
              </div>
              <div className="leader-line">
                <span className="leader-label label-caps">
                  <span style={{ color: 'var(--color-accent)' }}>&gt;</span> Experience
                </span>
                <span className="leader-dots" />
                <span className="leader-value body-sm">3+ Years</span>
              </div>
            </div>
          </motion.div>

          {/* Capability cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
            {cards.map((card, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                style={{
                  background: 'var(--color-surface-container)',
                  border: '1px solid var(--color-outline-variant)',
                  padding: '24px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px',
                  transition: 'border-color 100ms ease',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--color-accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--color-outline-variant)')}
              >
                <div style={{ 
                  color: 'var(--color-accent)', 
                  flexShrink: 0,
                  marginTop: '2px',
                }}>
                  {card.icon}
                </div>
                <div>
                  <h4 className="headline-sm" style={{ fontSize: '16px', marginBottom: '8px', color: 'var(--color-text)' }}>
                    {card.title}
                  </h4>
                  <p className="body-sm" style={{ color: 'var(--color-text-variant)' }}>
                    {card.description}
                  </p>
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