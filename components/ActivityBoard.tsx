import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ActivityCalendar, Activity } from 'react-activity-calendar';
import Papa from 'papaparse';
import { format, subYears, parseISO, isAfter } from 'date-fns';
import { BookOpen, Briefcase, Code, FileText, GitCommit, X } from 'lucide-react';
import Markdown from 'react-markdown';

interface LogEntry {
  ID: string;
  Title: string;
  Slug: string;
  Date: string;
  Category: string;
  'Tags (Comma Separated)': string;
  Status: string;
  Summary: string;
  'Content (Markdown)': string;
}

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/17Kd37P23SY-BTbhKBWyJmNq9nJPRxyRwqQ5uigaUpbE/export?format=csv';

const ActivityBoard: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [calendarData, setCalendarData] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(3);
  const [selectedLog, setSelectedLog] = useState<LogEntry | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(SHEET_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const csvText = await response.text();
        
        Papa.parse<LogEntry>(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const validLogs = results.data.filter(log => log.Date && log.Status === 'Published').sort((a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime());
            setLogs(validLogs);
            
            const countsByDate: Record<string, number> = {};
            validLogs.forEach(log => {
              const dateStr = log.Date;
              countsByDate[dateStr] = (countsByDate[dateStr] || 0) + 1;
            });

            const today = new Date();
            const oneYearAgo = subYears(today, 1);
            
            const data: Activity[] = [];
            let currentDate = oneYearAgo;
            
            while (!isAfter(currentDate, today)) {
              const dateStr = format(currentDate, 'yyyy-MM-dd');
              const count = countsByDate[dateStr] || 0;
              let level: 0 | 1 | 2 | 3 | 4 = 0;
              if (count === 1) level = 1;
              if (count === 2) level = 2;
              if (count === 3) level = 3;
              if (count >= 4) level = 4;
              
              data.push({ date: dateStr, count, level });
              currentDate.setDate(currentDate.getDate() + 1);
            }
            
            setCalendarData(data);
            setLoading(false);
          },
          error: (error: any) => {
            setError("Failed to parse activity data.");
            setLoading(false);
          }
        });
      } catch (error) {
        setError("Failed to load activity data. Please check your connection or if the Google Sheet is accessible.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'work': return <Briefcase size={14} />;
      case 'learning': return <BookOpen size={14} />;
      case 'personal': return <Code size={14} />;
      default: return <FileText size={14} />;
    }
  };

  return (
    <section id="activity" className="section">
      <div className="container" style={{ maxWidth: '960px' }}>
        <div className="section-header">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            Activity Board
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
            Tracking my continuous learning, side projects, and professional contributions.
          </motion.p>
        </div>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '256px' }}>
            <div style={{
              width: '24px',
              height: '24px',
              border: '2px solid var(--color-outline-variant)',
              borderTopColor: 'var(--color-accent)',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        ) : error ? (
          <div className="card" style={{ textAlign: 'center', padding: '48px' }}>
            <p className="headline-sm" style={{ color: 'var(--color-error)', marginBottom: '8px' }}>ERROR</p>
            <p className="body-sm" style={{ color: 'var(--color-text-variant)' }}>{error}</p>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card"
            style={{ padding: '32px' }}
          >
            {/* Calendar */}
            <div style={{ marginBottom: '32px', overflowX: 'auto', paddingBottom: '16px' }}>
              {calendarData.length > 0 ? (
                <ActivityCalendar 
                  data={calendarData} 
                  theme={{
                    light: ['var(--color-surface-low)', '#2a3a00', '#3c4d00', '#6b8a00', '#ccff00'],
                    dark: ['var(--color-surface-low)', '#2a3a00', '#3c4d00', '#6b8a00', '#ccff00'],
                  }}
                  colorScheme="dark"
                  labels={{
                    legend: { less: 'Less', more: 'More' },
                    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    totalCount: '{{count}} contributions in the last year',
                  }}
                />
              ) : (
                <div style={{ height: '128px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)' }}>
                  No activity data available
                </div>
              )}
            </div>

            <div className="grid-2" style={{ borderTop: '1px solid var(--color-outline-variant)', paddingTop: '32px' }}>
              {/* Recent Activity */}
              <div>
                <h3 className="headline-sm" style={{ fontSize: '14px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <GitCommit size={16} style={{ color: 'var(--color-text-muted)' }} />
                  Recent Activity
                </h3>
                <div className="custom-scrollbar" style={{ display: 'flex', flexDirection: 'column', gap: '2px', maxHeight: '400px', overflowY: 'auto', paddingRight: '8px' }}>
                  {logs.slice(0, visibleCount).map((log, idx) => (
                    <div 
                      key={idx} 
                      style={{
                        display: 'flex',
                        gap: '12px',
                        alignItems: 'flex-start',
                        padding: '12px',
                        border: '1px solid transparent',
                        cursor: 'pointer',
                        transition: 'border-color 100ms ease, background 100ms ease',
                      }}
                      onClick={() => setSelectedLog(log)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--color-outline-variant)';
                        e.currentTarget.style.background = 'var(--color-surface-low)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'transparent';
                        e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      <div style={{ marginTop: '2px', color: 'var(--color-text-muted)' }}>
                        {getCategoryIcon(log.Category)}
                      </div>
                      <div>
                        <p className="body-sm" style={{ color: 'var(--color-text)', fontWeight: 500 }}>
                          {log.Title}
                        </p>
                        <p className="label-caps" style={{ color: 'var(--color-text-muted)', marginTop: '4px' }}>
                          {format(parseISO(log.Date), 'MMM d, yyyy')} • {log.Category}
                        </p>
                        <p className="body-sm" style={{ color: 'var(--color-text-variant)', marginTop: '8px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {log.Summary}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
                  {visibleCount < logs.length && (
                    <button 
                      onClick={() => setVisibleCount(prev => prev + 1)}
                      className="btn"
                      style={{ flex: 1, padding: '10px 16px', fontSize: '11px' }}
                    >
                      Show more
                    </button>
                  )}
                  {visibleCount > 3 && (
                    <button 
                      onClick={() => setVisibleCount(prev => Math.max(3, prev - 1))}
                      className="btn"
                      style={{ flex: 1, padding: '10px 16px', fontSize: '11px', color: 'var(--color-text-muted)' }}
                    >
                      Show less
                    </button>
                  )}
                </div>
              </div>
              
              {/* Activity Overview */}
              <div style={{ alignSelf: 'start' }}>
                <h3 className="headline-sm" style={{ fontSize: '14px', marginBottom: '16px' }}>Activity Overview</h3>
                <div style={{
                  background: 'var(--color-surface-low)',
                  border: '1px solid var(--color-outline-variant)',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '6px', marginBottom: '20px' }}>
                    {Array.from(new Set(logs.flatMap(l => l['Tags (Comma Separated)'].split(',').map(t => t.trim())))).slice(0, 8).map(tag => (
                      <span key={tag} className="tag" style={{ fontSize: '10px' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="body-sm" style={{ color: 'var(--color-text-variant)' }}>
                    Total of <strong style={{ color: 'var(--color-accent)', fontSize: '18px', margin: '0 4px', fontFamily: 'var(--font-display)', fontWeight: 700 }}>{logs.length}</strong> logged activities across various categories.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Modal */}
        <AnimatePresence>
          {selectedLog && (
            <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedLog(null)}
                style={{ position: 'absolute', inset: 0, background: 'rgba(5, 5, 5, 0.85)' }}
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '720px',
                  maxHeight: '85vh',
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-accent)',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  zIndex: 10,
                }}
              >
                {/* Modal header */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 24px',
                  borderBottom: '1px solid var(--color-outline-variant)',
                  background: 'var(--color-surface-container)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', overflow: 'hidden' }}>
                    <div style={{ color: 'var(--color-accent)' }}>
                      {getCategoryIcon(selectedLog.Category)}
                    </div>
                    <h3 className="headline-sm" style={{ fontSize: '14px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {selectedLog.Title}
                    </h3>
                  </div>
                  <button 
                    onClick={() => setSelectedLog(null)}
                    style={{
                      padding: '8px',
                      background: 'none',
                      border: '1px solid var(--color-outline-variant)',
                      color: 'var(--color-text-muted)',
                      cursor: 'pointer',
                      flexShrink: 0,
                      display: 'flex',
                    }}
                  >
                    <X size={16} />
                  </button>
                </div>
                
                {/* Modal body */}
                <div className="custom-scrollbar" style={{ padding: '24px', overflowY: 'auto' }}>
                  <div className="label-caps" style={{ display: 'flex', gap: '12px', color: 'var(--color-text-muted)', marginBottom: '24px' }}>
                    <span>{format(parseISO(selectedLog.Date), 'MMMM d, yyyy')}</span>
                    <span>•</span>
                    <span>{selectedLog.Category}</span>
                  </div>
                  
                  <div className="prose-terminal body-sm">
                    <Markdown>{selectedLog['Content (Markdown)']}</Markdown>
                  </div>
                  
                  <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid var(--color-outline-variant)', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {selectedLog['Tags (Comma Separated)'].split(',').map(t => t.trim()).map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ActivityBoard;
