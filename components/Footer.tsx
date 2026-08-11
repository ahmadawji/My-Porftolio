import React from 'react';
import { PERSONAL_INFO } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer style={{
      background: 'var(--color-surface-lowest)',
      borderTop: '1px solid var(--color-outline-variant)',
      padding: '24px 0',
    }}>
      <div className="container" style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px',
      }}>
        <p className="label-caps" style={{ color: 'var(--color-text-muted)' }}>
          &copy; {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="label-caps" style={{ color: 'var(--color-text-muted)' }}>
            Built with React &amp; TypeScript
          </span>
          <span style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '6px',
          }}>
            <span style={{ 
              color: 'var(--color-accent)', 
              animation: 'blink-status 1s step-end infinite',
              fontSize: '10px',
            }}>■</span>
            <span className="label-caps" style={{ color: 'var(--color-accent)' }}>
              OPERATIONAL
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;