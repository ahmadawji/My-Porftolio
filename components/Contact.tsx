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
    // Clear error when user starts typing
    if (status === 'error') setStatus('idle');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
        setStatus('error');
        return;
    }

    setStatus('submitting');

    // Simulate processing delay for better UX
    setTimeout(() => {
      const subject = `Portfolio Contact from ${formData.name}`;
      const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
      const mailtoLink = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      // Open default email client
      window.location.href = mailtoLink;
      
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Reset status after a few seconds
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 relative">

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-text-primary mb-4"
          >
            Get In Touch
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
            className="text-text-secondary text-lg"
          >
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, my inbox is always open.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-white/20 dark:border-slate-700/30 shadow-2xl"
        >
          <div className="grid md:grid-cols-2 gap-12">
            
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-text-primary">Let's connect!</h3>
              <p className="text-text-secondary">
                Feel free to reach out for collaborations, job opportunities, or freelance projects. I'm always excited to discuss new technologies and creative ideas.
              </p>
              
              <div className="space-y-4">
                <a href={`mailto:${PERSONAL_INFO.email}`} className="flex items-center gap-4 text-text-secondary hover:text-accent transition-colors">
                  <div className="w-10 h-10 bg-white/50 dark:bg-slate-800/50 rounded-full flex items-center justify-center border border-text-primary/10">
                    <Mail size={18} />
                  </div>
                  <span>{PERSONAL_INFO.email}</span>
                </a>
                <div className="flex items-center gap-4 text-text-secondary">
                  <div className="w-10 h-10 bg-white/50 dark:bg-slate-800/50 rounded-full flex items-center justify-center border border-text-primary/10">
                    <Phone size={18} />
                  </div>
                  <span>{PERSONAL_INFO.phone}</span>
                </div>
              </div>

              <div className="pt-6 border-t border-text-primary/10">
                <h4 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-4">Find me on</h4>
                <div className="flex gap-4">
                  {SOCIAL_LINKS.map((link) => {
                    const Icon = ICON_MAP[link.icon];
                    return (
                      <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-white/50 dark:bg-slate-800/50 rounded-lg flex items-center justify-center text-text-secondary hover:text-white hover:bg-accent transition-all duration-300 border border-text-primary/10 hover:border-accent"
                        aria-label={link.name}
                      >
                        {Icon && <Icon size={24} />}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white/50 dark:bg-slate-800/50 border border-text-primary/10 rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors placeholder:text-text-secondary/50"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white/50 dark:bg-slate-800/50 border border-text-primary/10 rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors placeholder:text-text-secondary/50"
                  placeholder="hello@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-1">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-white/50 dark:bg-slate-800/50 border border-text-primary/10 rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors resize-none placeholder:text-text-secondary/50"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>
              
              <motion.button
                whileHover={status === 'idle' ? { scale: 1.02 } : {}}
                whileTap={status === 'idle' ? { scale: 0.98 } : {}}
                type="submit"
                disabled={status === 'submitting' || status === 'success'}
                className={`w-full font-medium py-3 rounded-lg transition-all duration-300 shadow-lg flex items-center justify-center gap-2
                  ${status === 'error' 
                    ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/25' 
                    : status === 'success'
                      ? 'bg-green-500 hover:bg-green-600 text-white shadow-green-500/25'
                      : 'bg-accent hover:bg-accent-hover text-white shadow-indigo-500/25 disabled:opacity-70 disabled:cursor-not-allowed'
                  }
                `}
              >
                <AnimatePresence mode="wait">
                  {status === 'submitting' ? (
                    <motion.div
                      key="submitting"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="flex items-center gap-2"
                    >
                      <Loader2 size={18} className="animate-spin" />
                      <span>Preparing Email...</span>
                    </motion.div>
                  ) : status === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="flex items-center gap-2"
                    >
                      <Check size={18} />
                      <span>Opening Email Client...</span>
                    </motion.div>
                  ) : status === 'error' ? (
                     <motion.div
                      key="error"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="flex items-center gap-2"
                    >
                      <AlertCircle size={18} />
                      <span>Please fill all fields</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="flex items-center gap-2"
                    >
                      <span>Send Message</span>
                      <Send size={18} />
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