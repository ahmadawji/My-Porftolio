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
            const validLogs = results.data.filter(log => log.Date && log.Status === 'Published');
            setLogs(validLogs);
            
            // Generate calendar data
            const countsByDate: Record<string, number> = {};
            validLogs.forEach(log => {
              const dateStr = log.Date;
              countsByDate[dateStr] = (countsByDate[dateStr] || 0) + 1;
            });

            // We need to provide a full year of data for the calendar to look good
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
              
              data.push({
                date: dateStr,
                count,
                level
              });
              
              currentDate.setDate(currentDate.getDate() + 1);
            }
            
            setCalendarData(data);
            setLoading(false);
          },
          error: (error: any) => {
            console.error("Papa parse error:", error);
            setError("Failed to parse activity data.");
            setLoading(false);
          }
        });
      } catch (error) {
        console.error("Error fetching sheet data:", error);
        setError("Failed to load activity data. Please check your connection or if the Google Sheet is accessible.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'work': return <Briefcase size={16} />;
      case 'learning': return <BookOpen size={16} />;
      case 'personal': return <Code size={16} />;
      default: return <FileText size={16} />;
    }
  };

  return (
    <section id="activity" className="py-24 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-text-primary mb-4"
          >
            Activity Board
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
            Tracking my continuous learning, side projects, and professional contributions.
          </motion.p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64 bg-[#0d1117] border border-[#30363d] rounded-xl p-6">
            <div className="text-center">
              <p className="text-xl font-bold text-red-400 mb-2">Oops!</p>
              <p className="text-gray-400">{error}</p>
            </div>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#0d1117] border border-[#30363d] rounded-xl p-6 md:p-8 shadow-2xl"
          >
            <div className="mb-8 overflow-x-auto pb-4">
              {calendarData.length > 0 ? (
                <ActivityCalendar 
                  data={calendarData} 
                  theme={{
                    light: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                    dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                  }}
                  colorScheme="dark"
                  labels={{
                    legend: {
                      less: 'Less',
                      more: 'More'
                    },
                    months: [
                      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                    ],
                    totalCount: '{{count}} contributions in the last year',
                  }}
                />
              ) : (
                <div className="h-32 flex items-center justify-center text-[#8b949e]">
                  No activity data available
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-[#30363d] pt-8">
              <div>
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <GitCommit className="text-[#8b949e]" size={18} />
                  Recent Activity
                </h3>
                <div className="space-y-4 max-h-[400px] overflow-y-auto overflow-x-hidden custom-scrollbar pr-2">
                  {logs.slice(0, visibleCount).map((log, idx) => (
                    <div 
                      key={idx} 
                      className="flex gap-4 items-start p-3 -mx-3 rounded-lg hover:bg-[#161b22] cursor-pointer transition-colors border border-transparent hover:border-[#30363d] group"
                      onClick={() => setSelectedLog(log)}
                    >
                      <div className="mt-1 text-[#8b949e]">
                        {getCategoryIcon(log.Category)}
                      </div>
                      <div>
                        <p className="text-[#c9d1d9] font-medium text-sm group-hover:text-[#58a6ff] transition-colors">
                          {log.Title}
                        </p>
                        <p className="text-[#8b949e] text-xs mt-1">
                          {format(parseISO(log.Date), 'MMM d, yyyy')} • {log.Category}
                        </p>
                        <p className="text-[#8b949e] text-sm mt-2 line-clamp-2">
                          {log.Summary}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex gap-3">
                  {visibleCount < logs.length && (
                    <button 
                      onClick={() => setVisibleCount(prev => prev + 1)}
                      className="flex-1 py-2.5 text-sm font-medium text-[#58a6ff] hover:text-white bg-[#1f6feb]/10 hover:bg-[#1f6feb]/20 border border-[#1f6feb]/30 rounded-lg transition-colors"
                    >
                      Show more
                    </button>
                  )}
                  {visibleCount > 3 && (
                    <button 
                      onClick={() => setVisibleCount(prev => Math.max(3, prev - 1))}
                      className="flex-1 py-2.5 text-sm font-medium text-[#8b949e] hover:text-white bg-[#30363d]/50 hover:bg-[#30363d] border border-[#30363d] rounded-lg transition-colors"
                    >
                      Show less
                    </button>
                  )}
                </div>
              </div>
              
              <div className="self-start">
                <h3 className="text-white font-semibold mb-4">Activity Overview</h3>
                <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-6 flex flex-col justify-center items-center text-center">
                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                    {Array.from(new Set(logs.flatMap(l => l['Tags (Comma Separated)'].split(',').map(t => t.trim())))).slice(0, 8).map(tag => (
                      <span key={tag} className="px-3 py-1.5 bg-[#1f6feb]/10 text-[#58a6ff] border border-[#1f6feb]/30 rounded-full text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-[#8b949e] text-sm">
                    Total of <strong className="text-white text-lg mx-1">{logs.length}</strong> logged activities across various categories.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Modal */}
        <AnimatePresence>
          {selectedLog && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedLog(null)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-3xl max-h-[85vh] bg-[#0d1117] border border-[#30363d] rounded-xl shadow-2xl flex flex-col overflow-hidden z-10"
              >
                <div className="flex items-center justify-between p-4 border-b border-[#30363d] bg-[#161b22]">
                  <div className="flex items-center gap-3">
                    <div className="text-[#8b949e]">
                      {getCategoryIcon(selectedLog.Category)}
                    </div>
                    <h3 className="text-lg font-semibold text-[#c9d1d9] truncate pr-4">
                      {selectedLog.Title}
                    </h3>
                  </div>
                  <button 
                    onClick={() => setSelectedLog(null)}
                    className="p-2 text-[#8b949e] hover:text-white hover:bg-[#30363d] rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <div className="p-6 overflow-y-auto custom-scrollbar">
                  <div className="flex flex-wrap gap-4 text-sm text-[#8b949e] mb-6">
                    <span>{format(parseISO(selectedLog.Date), 'MMMM d, yyyy')}</span>
                    <span>•</span>
                    <span>{selectedLog.Category}</span>
                  </div>
                  
                  <div className="prose prose-invert prose-sm sm:prose-base max-w-none prose-a:text-[#58a6ff] prose-code:text-[#c9d1d9] prose-code:bg-[#161b22] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-pre:bg-[#161b22] prose-pre:border prose-pre:border-[#30363d]">
                    <Markdown>{selectedLog['Content (Markdown)']}</Markdown>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-[#30363d] flex flex-wrap gap-2">
                    {selectedLog['Tags (Comma Separated)'].split(',').map(t => t.trim()).map(tag => (
                      <span key={tag} className="px-2.5 py-1 bg-[#161b22] text-[#8b949e] border border-[#30363d] rounded-full text-xs">
                        {tag}
                      </span>
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
