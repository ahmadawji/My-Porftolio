import React from 'react';
import { EXPERIENCE_DATA, EDUCATION_DATA } from '../constants';
import { Calendar, MapPin, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="section">
      <div className="container">
        <div className="section-header">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            Professional Experience
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            viewport={{ once: true }}
            className="section-bar"
          />
        </div>

        <div style={{ position: 'relative' }}>
          {/* Vertical timeline line */}
          <div style={{
            position: 'absolute',
            left: '0',
            top: '0',
            bottom: '0',
            width: '1px',
            background: 'var(--color-outline-variant)',
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
            {EXPERIENCE_DATA.map((job, index) => (
              <motion.div 
                key={job.id} 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{
                  marginLeft: '24px',
                  background: 'var(--color-surface-container)',
                  border: '1px solid var(--color-outline-variant)',
                  padding: '32px',
                  position: 'relative',
                  transition: 'border-color 100ms ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--color-accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--color-outline-variant)')}
              >
                {/* Timeline dot */}
                <div style={{
                  position: 'absolute',
                  left: '-29px',
                  top: '36px',
                  width: '9px',
                  height: '9px',
                  background: 'var(--color-accent)',
                  border: '2px solid var(--color-bg)',
                }} />

                {/* Header */}
                <div style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap',
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start',
                  gap: '12px',
                  marginBottom: '20px',
                }}>
                  <div>
                    <h3 className="headline-sm" style={{ color: 'var(--color-text)', marginBottom: '4px' }}>
                      {job.role}
                    </h3>
                    <p style={{ 
                      fontFamily: 'var(--font-mono)',
                      fontSize: '13px',
                      color: 'var(--color-accent)',
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}>
                      {job.company}
                    </p>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'flex-end',
                    gap: '4px',
                  }}>
                    <span className="label-caps" style={{ 
                      color: 'var(--color-text-muted)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '6px' 
                    }}>
                      <Calendar size={12} /> {job.period}
                    </span>
                    <span className="label-caps" style={{ 
                      color: 'var(--color-text-muted)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '6px' 
                    }}>
                      <MapPin size={12} /> {job.location}
                    </span>
                  </div>
                </div>
                
                {/* Description */}
                <div style={{ marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {job.description.map((desc, i) => {
                    const [title, content] = desc.includes(':') ? desc.split(':') : ['', desc];
                    return (
                      <div key={i} style={{ 
                        display: 'flex', 
                        alignItems: 'flex-start',
                        gap: '8px',
                        fontSize: '13px',
                        lineHeight: '20px',
                        color: 'var(--color-text-variant)',
                      }}>
                        <span style={{ color: 'var(--color-accent)', flexShrink: 0, fontWeight: 500 }}>&gt;</span>
                        <span>
                          {title && <strong style={{ color: 'var(--color-text)' }}>{title}:</strong>}
                          {content}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Tech Stack */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {job.techStack.map((tech) => (
                    <span key={tech} className="tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Education Block */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
              style={{
                marginLeft: '24px',
                background: 'var(--color-surface-container)',
                border: '1px solid var(--color-outline-variant)',
                padding: '32px',
                position: 'relative',
                transition: 'border-color 100ms ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--color-accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--color-outline-variant)')}
            >
              {/* Timeline dot */}
              <div style={{
                position: 'absolute',
                left: '-29px',
                top: '36px',
                width: '9px',
                height: '9px',
                background: 'var(--color-accent-dim)',
                border: '2px solid var(--color-bg)',
              }} />

              <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap',
                justifyContent: 'space-between', 
                alignItems: 'flex-start',
                gap: '12px',
                marginBottom: '16px',
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <GraduationCap size={18} style={{ color: 'var(--color-accent-dim)' }} />
                    <h3 className="headline-sm" style={{ color: 'var(--color-text)' }}>
                      {EDUCATION_DATA.degree}
                    </h3>
                  </div>
                  <p style={{ 
                    fontFamily: 'var(--font-mono)',
                    fontSize: '13px',
                    color: 'var(--color-accent-dim)',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}>
                    {EDUCATION_DATA.institution}
                  </p>
                </div>
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'flex-end',
                  gap: '4px',
                }}>
                  <span className="label-caps" style={{ 
                    color: 'var(--color-text-muted)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '6px' 
                  }}>
                    <Calendar size={12} /> {EDUCATION_DATA.period}
                  </span>
                  <span className="label-caps" style={{ 
                    color: 'var(--color-text-muted)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '6px' 
                  }}>
                    <MapPin size={12} /> {EDUCATION_DATA.location}
                  </span>
                </div>
              </div>
              <p className="body-sm" style={{ color: 'var(--color-text-variant)' }}>{EDUCATION_DATA.details}</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;