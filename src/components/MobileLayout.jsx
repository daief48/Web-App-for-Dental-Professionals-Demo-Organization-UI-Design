import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, Battery, ShieldAlert, Sparkles, AlertCircle, Award } from 'lucide-react';

export default function MobileLayout({ children, org, theme }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentTime, setCurrentTime] = useState('09:41');
  const [batteryLevel, setBatteryLevel] = useState(98);
  const [showIslandOverlay, setShowIslandOverlay] = useState(false);

  // iOS ticking clock
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes();
      const strTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      setCurrentTime(strTime);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const isLoginPage = location.pathname === '/login';

  return (
    <div className={`min-h-screen bg-cosmic-mesh flex flex-col items-center justify-center p-0 md:p-6 overflow-hidden relative selection:bg-blue-600/30 selection:text-blue-300 ${theme}`}>
      
      {/* Main iPhone 15 Pro Wrapper (Titanium space-gray Bezel) */}
      <div className={`relative w-full max-w-[390px] h-screen md:h-[844px] bg-slate-950 md:rounded-[60px] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.85)] md:border-[12px] md:border-slate-800/90 flex flex-col overflow-hidden transition-all duration-300 ring-4 ring-slate-800/40 ${theme}`}>
        
        {/* Dynamic Island Notch (Interactive!) */}
        <div 
          onClick={() => setShowIslandOverlay(!showIslandOverlay)}
          className="absolute top-0 left-1/2 -translate-x-1/2 z-50 mt-2.5 w-[110px] h-[30px] bg-black rounded-full shadow-[inset_0_2px_4px_rgba(255,255,255,0.1)] flex items-center justify-center cursor-pointer hover:scale-[1.04] active:scale-[0.98] transition-all duration-300 group border border-slate-900"
        >
          <div className="w-2 h-2 rounded-full bg-slate-900 border border-slate-850 absolute left-3.5" />
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 absolute right-6 pulse-indicator neon-glow-blue" />
          
          <AnimatePresence>
            {showIslandOverlay && (
              <motion.div 
                initial={{ opacity: 0, width: 110, height: 30, borderRadius: 999 }}
                animate={{ opacity: 1, width: 280, height: 64, borderRadius: 24 }}
                exit={{ opacity: 0, width: 110, height: 30, borderRadius: 999 }}
                className="absolute top-0 w-[280px] h-[64px] bg-black border border-slate-850 text-white p-3.5 flex items-center justify-between shadow-2xl z-50 pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-2.5 text-xs">
                  <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400">
                    <ShieldAlert className="w-4.5 h-4.5 stroke-[2]" />
                  </div>
                  <div className="text-left">
                    <p className="font-extrabold text-slate-100">Urgent Compliance</p>
                    <p className="text-[9px] text-slate-400">2 NPI credentials require review</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowIslandOverlay(false)}
                  className="text-[9px] bg-slate-900 border border-slate-800 hover:bg-slate-850 px-2 py-1.5 rounded-lg text-slate-350 font-bold"
                >
                  Dismiss
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Physical buttons accents */}
        <div className="hidden md:block absolute -left-[14px] top-[140px] w-[3px] h-[30px] bg-slate-800 rounded-r" />
        <div className="hidden md:block absolute -left-[14px] top-[190px] w-[3px] h-[50px] bg-slate-800 rounded-r" />
        <div className="hidden md:block absolute -left-[14px] top-[250px] w-[3px] h-[50px] bg-slate-800 rounded-r" />
        <div className="hidden md:block absolute -right-[14px] top-[200px] w-[3px] h-[75px] bg-slate-800 rounded-l" />

        {/* Screen Status Bar */}
        {!isLoginPage && (
          <div className="w-full h-11 bg-slate-950/70 border-b border-white/5 flex items-end justify-between px-6 pb-2 text-[12.5px] font-bold text-slate-300 select-none z-40 backdrop-blur-md">
            <div className="font-extrabold tracking-tight">{currentTime}</div>
            <div className="flex items-center gap-1.5 pb-0.5">
              <span className="text-[9px] font-extrabold tracking-wider text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20">LOCUM 5G</span>
              <Wifi className="w-3.5 h-3.5 text-slate-400 stroke-[2.5]" />
              <div className="flex items-center gap-0.5 bg-slate-900 border border-slate-800 px-1 py-0.5 rounded text-[8px] font-extrabold text-slate-400">
                <span>{batteryLevel}%</span>
                <Battery className="w-3.5 h-3.5 text-slate-450 stroke-[2]" />
              </div>
            </div>
          </div>
        )}

        {/* Main Phone Screen Viewport */}
        <div className="flex-1 bg-bezel-mesh flex flex-col overflow-y-auto no-scrollbar relative">
          {children}
        </div>

        {/* iOS Home Indicator Swipe Bar */}
        {!isLoginPage && (
          <div 
            onClick={() => navigate('/')} 
            className="w-full bg-slate-950/40 h-5 pb-1 flex items-center justify-center cursor-pointer select-none z-40 border-t border-white/5 backdrop-blur-md"
          >
            <div className="w-[120px] h-[5px] bg-slate-800 rounded-full hover:bg-slate-700 transition-colors" />
          </div>
        )}
      </div>
      
      {/* Desktop Quick Guide Footer */}
      <div className="hidden md:block text-[10px] text-slate-600 font-semibold tracking-widest mt-4.5 select-none">
        LOCUM CONNECT ORG PORTAL V2.5.0 • HIGH-FIDELITY DESIGN SYSTEM
      </div>
    </div>
  );
}
