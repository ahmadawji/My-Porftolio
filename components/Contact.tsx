import React, { useState } from 'react';
import { PERSONAL_INFO, SOCIAL_LINKS, ICON_MAP } from '../constants';
import { Mail, Phone, Send, Check, Loader2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
    if (status === 'error') setStatus('idle');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      return;
    }

    setStatus('submitting');

    setTimeout(() => {
      const subject = `Portfolio Contact from ${formData.name}`;
      const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
      const mailtoLink = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      window.location.href = mailtoLink;
      
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="section" style={{ borderBottom: 'none' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <div className="section-header">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            Get In Touch
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
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, my inbox is always open.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="card"
          style={{ padding: '48px 32px' }}
        >
          <div className="grid-2" style={{ gap: '48px' }}>
            {/* Contact Info */}
            <div>
              <h3 className="headline-sm" style={{ color: 'var(--color-accent)', marginBottom: '20px', fontSize: '16px' }}>
                Let's Connect
              </h3>
              <p className="body-sm" style={{ color: 'var(--color-text-variant)', marginBottom: '32px', lineHeight: '22px' }}>
                Feel free to reach out for collaborations, job opportunities, or freelance projects. I'm always excited to discuss new technologies and creative ideas.
              </p>
              
              {/* Terminal-style contact info */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
                <a 
                  href={`mailto:${PERSONAL_INFO.email}`} 
                  className="leader-line"
                  style={{ textDecoration: 'none', transition: 'color 100ms ease' }}
                  onMouseEnter={(e) => { e.currentTarget.querySelector('.leader-value')!.setAttribute('style', 'white-space:nowrap;color:var(--color-accent)'); }}
                  onMouseLeave={(e) => { e.currentTarget.querySelector('.leader-value')!.setAttribute('style', 'white-space:nowrap;color:var(--color-text)'); }}
                >
                  <span className="leader-label label-caps">
                    <Mail size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
                    Email
                  </span>
                  <span className="leader-dots" />
                  <span className="leader-value body-sm">{PERSONAL_INFO.email}</span>
                </a>
                <div className="leader-line">
                  <span className="leader-label label-caps">
                    <Phone size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
                    Phone
                  </span>
                  <span className="leader-dots" />
                  <span className="leader-value body-sm">{PERSONAL_INFO.phone}</span>
                </div>
              </div>

              {/* Social links */}
              <div style={{ borderTop: '1px solid var(--color-outline-variant)', paddingTop: '24px' }}>
                <h4 className="label-caps" style={{ color: 'var(--color-text-muted)', marginBottom: '16px' }}>
                  Find me on
                </h4>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {SOCIAL_LINKS.map((link) => {
                    const Icon = ICON_MAP[link.icon];
                    return (
                      <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.name}
                        style={{
                          width: '44px',
                          height: '44px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '1px solid var(--color-outline-variant)',
                          color: 'var(--color-text-variant)',
                          transition: 'border-color 100ms ease, color 100ms ease, background 100ms ease',
                          textDecoration: 'none',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = 'var(--color-accent)';
                          e.currentTarget.style.color = 'var(--color-bg)';
                          e.currentTarget.style.background = 'var(--color-accent)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'var(--color-outline-variant)';
                          e.currentTarget.style.color = 'var(--color-text-variant)';
                          e.currentTarget.style.background = 'transparent';
                        }}
                      >
                        {Icon && <Icon size={20} />}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Form */}
            <form style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="input-label">Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-terminal"
                  placeholder="YOUR NAME"
                />
              </div>
              <div>
                <label htmlFor="email" className="input-label">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-terminal"
                  placeholder="HELLO@EXAMPLE.COM"
                />
              </div>
              <div>
                <label htmlFor="message" className="input-label">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="input-terminal"
                  placeholder="TELL ME ABOUT YOUR PROJECT..."
                  style={{ border: '1px solid var(--color-outline-variant)', padding: '12px' }}
                />
              </div>
              
              <motion.button
                whileHover={status === 'idle' ? { scale: 1.01 } : {}}
                whileTap={status === 'idle' ? { scale: 0.99 } : {}}
                type="submit"
                disabled={status === 'submitting' || status === 'success'}
                className={status === 'error' ? 'btn' : status === 'success' ? 'btn' : 'btn btn-primary'}
                style={{
                  width: '100%',
                  padding: '14px 24px',
                  ...(status === 'error' ? { borderColor: 'var(--color-error)', color: 'var(--color-error)' } : {}),
                  ...(status === 'success' ? { borderColor: 'var(--color-accent)', color: 'var(--color-accent)' } : {}),
                  ...(status === 'submitting' || status === 'success' ? { opacity: 0.7, cursor: 'not-allowed' } : {}),
                }}
              >
                <AnimatePresence mode="wait">
                  {status === 'submitting' ? (
                    <motion.div
                      key="submitting"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                      <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                      <span>PREPARING EMAIL...</span>
                    </motion.div>
                  ) : status === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                      <Check size={16} />
                      <span>OPENING EMAIL CLIENT...</span>
                    </motion.div>
                  ) : status === 'error' ? (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                      <AlertCircle size={16} />
                      <span>PLEASE FILL ALL FIELDS</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                      <span>SEND MESSAGE</span>
                      <Send size={16} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;