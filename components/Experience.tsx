import React from 'react';
import { EXPERIENCE_DATA, EDUCATION_DATA } from '../constants';
import { Briefcase, Calendar, MapPin, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-text-primary mb-4"
          >
            Professional Experience
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            className="h-1 bg-accent mx-auto rounded-full"
          />
        </div>

        <div className="space-y-12 relative">
            {/* Vertical Line for larger screens */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-text-primary/10"></div>

          {EXPERIENCE_DATA.map((job, index) => (
            <motion.div 
              key={job.id} 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              
              <div className="flex-1"></div>
              
              <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-slate-800 border-4 border-transparent shadow-lg z-10 shrink-0">
                <Briefcase size={20} className="text-accent" />
              </div>

              <motion.div 
                whileHover={{ y: -5, scale: 1.01 }}
                className="flex-1 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md rounded-2xl p-8 border border-white/20 dark:border-slate-700/30 hover:border-accent/50 transition-all duration-300 shadow-lg cursor-default"
              >
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-2">
                    <div>
                        <h3 className="text-xl font-bold text-text-primary">{job.role}</h3>
                        <p className="text-accent font-medium">{job.company}</p>
                    </div>
                    <div className="text-sm text-text-secondary flex flex-col sm:items-end">
                        <span className="flex items-center gap-1"><Calendar size={14} /> {job.period}</span>
                        <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                    </div>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {job.description.map((desc, i) => {
                      const [title, content] = desc.includes(':') ? desc.split(':') : ['', desc];
                      return (
                        <li key={i} className="flex items-start text-text-secondary text-sm">
                            <span className="mr-2 mt-1.5 w-1.5 h-1.5 bg-accent rounded-full shrink-0"></span>
                            <span>
                                {title && <strong className="text-text-primary">{title}:</strong>}
                                {content}
                            </span>
                        </li>
                      );
                  })}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {job.techStack.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-white/50 dark:bg-slate-800/50 rounded-full text-xs font-medium text-text-secondary border border-text-primary/10 hover:border-accent/30 transition-colors">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}

          {/* Education Block */}
           <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className={`flex flex-col md:flex-row gap-8`}
            >
              <div className="flex-1"></div>
               <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-slate-800 border-4 border-transparent shadow-lg z-10 shrink-0">
                <GraduationCap size={20} className="text-purple-400" />
              </div>
              <motion.div 
                whileHover={{ y: -5, scale: 1.01 }}
                className="flex-1 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md rounded-2xl p-8 border border-white/20 dark:border-slate-700/30 hover:border-purple-500/50 transition-all duration-300 shadow-lg cursor-default"
              >
                 <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-2">
                    <div>
                        <h3 className="text-xl font-bold text-text-primary">{EDUCATION_DATA.degree}</h3>
                        <p className="text-purple-400 font-medium">{EDUCATION_DATA.institution}</p>
                    </div>
                    <div className="text-sm text-text-secondary flex flex-col sm:items-end">
                        <span className="flex items-center gap-1"><Calendar size={14} /> {EDUCATION_DATA.period}</span>
                        <span className="flex items-center gap-1"><MapPin size={14} /> {EDUCATION_DATA.location}</span>
                    </div>
                </div>
                <p className="text-text-secondary text-sm">{EDUCATION_DATA.details}</p>
              </motion.div>
           </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Experience;