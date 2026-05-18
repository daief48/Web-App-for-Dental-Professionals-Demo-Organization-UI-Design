import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Bell, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AppHeader({ title, showBack = false, org, onNotificationClick, theme, onThemeToggle }) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <header className="sticky top-0 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 px-4 py-3 flex items-center justify-between z-30 select-none">
      <div className="flex items-center gap-2.5">
        {showBack ? (
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={handleBack}
            className="w-8 h-8 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center text-slate-300 active:bg-slate-800 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </motion.button>
        ) : (
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-teal-500 flex items-center justify-center text-white shadow-md font-bold text-sm relative">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-blue-600 to-teal-500 filter blur-sm opacity-50 -z-10" />
            {org?.logo || '🩺'}
          </div>
        )}
        
        <div className="flex flex-col">
          {showBack ? (
            <h2 className="font-extrabold text-[15px] text-white tracking-tight leading-tight">
              {title}
            </h2>
          ) : (
            <>
              <span className="text-[9px] uppercase tracking-widest text-slate-500 font-extrabold leading-none">
                {org?.code || 'LCC-552'}
              </span>
              <h2 className="font-extrabold text-[14px] text-slate-100 leading-normal">
                {org?.name || 'Locum Connect Care'}
              </h2>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Dynamic Light/Dark Theme Toggle Button */}
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onThemeToggle}
          className="w-8 h-8 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:bg-slate-800 transition-all cursor-pointer"
          title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {theme === 'dark' ? (
            <Sun className="w-4.5 h-4.5 text-amber-400 animate-pulse stroke-[2.5]" />
          ) : (
            <Moon className="w-4.5 h-4.5 text-blue-500 stroke-[2.5]" />
          )}
        </motion.button>

        {/* Interactive Notifications Bell */}
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            if (onNotificationClick) {
              onNotificationClick();
            } else {
              navigate('/notifications');
            }
          }}
          className="w-8 h-8 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:bg-slate-800 relative transition-all cursor-pointer"
        >
          <Bell className="w-4 h-4 stroke-[2]" />
          {org?.notificationsCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 rounded-full bg-rose-500 text-[9px] font-extrabold text-white flex items-center justify-center px-1 shadow-[0_0_8px_rgba(244,63,94,0.45)]">
              {org.notificationsCount}
            </span>
          )}
        </motion.button>
      </div>
    </header>
  );
}
