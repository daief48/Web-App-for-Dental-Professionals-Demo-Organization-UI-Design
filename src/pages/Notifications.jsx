import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  Clock, 
  UserPlus, 
  CreditCard, 
  ShieldCheck, 
  Trash2, 
  Check, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import AppHeader from '../components/AppHeader';
import BottomNavigation from '../components/BottomNavigation';

export default function Notifications({ notifications, setNotifications, org, theme, toggleTheme }) {
  const navigate = useNavigate();

  // Mark single notification as read
  const handleMarkAsRead = (id, link) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    if (link) {
      navigate(link);
    }
  };

  // Mark all as read
  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Clear all notifications
  const handleClearAll = () => {
    setNotifications([]);
  };

  // Get specific icon for notification types
  const getIcon = (type) => {
    switch (type) {
      case 'timesheet':
        return {
          bg: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
          icon: Clock
        };
      case 'shift':
        return {
          bg: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
          icon: UserPlus
        };
      case 'wallet':
        return {
          bg: 'bg-teal-500/10 border-teal-500/20 text-teal-400',
          icon: CreditCard
        };
      default: // system
        return {
          bg: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
          icon: ShieldCheck
        };
    }
  };

  const hasUnread = notifications.some(n => !n.read);

  return (
    <div className="flex-1 flex flex-col justify-between select-none relative bg-slate-950">
      
      {/* Page Header */}
      <AppHeader title="Notifications" showBack={true} org={org} theme={theme} onThemeToggle={toggleTheme} />

      {/* Main Notification Scroll View */}
      <main className="flex-1 px-4 py-4 flex flex-col gap-4 overflow-y-auto no-scrollbar pb-32">
        
        {/* Actions Bar */}
        {notifications.length > 0 && (
          <div className="flex items-center justify-between px-1">
            <h2 className="text-[10px] uppercase tracking-wider text-slate-500 font-extrabold">
              Inbox ({notifications.length})
            </h2>
            
            <div className="flex items-center gap-3">
              {hasUnread && (
                <button
                  onClick={handleMarkAllRead}
                  className="text-[10px] font-extrabold text-blue-400 hover:text-blue-500 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Mark read</span>
                </button>
              )}
              
              <button
                onClick={handleClearAll}
                className="text-[10px] font-extrabold text-slate-500 hover:text-rose-450 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear all</span>
              </button>
            </div>
          </div>
        )}

        {/* Notifications List container */}
        <div className="flex flex-col gap-3">
          <AnimatePresence initial={false}>
            {notifications.map((notif) => {
              const iconDetails = getIcon(notif.type);
              const IconComp = iconDetails.icon;

              return (
                <motion.div
                  key={notif.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onClick={() => handleMarkAsRead(notif.id, notif.link)}
                  className={`glass-card-dark rounded-2xl p-4 border flex gap-3.5 cursor-pointer relative overflow-hidden transition-all select-none ${
                    notif.read 
                      ? 'border-white/5 opacity-70 bg-slate-900/30' 
                      : 'border-blue-500/15 bg-slate-900/60 shadow-lg'
                  }`}
                >
                  {/* Absolute unread strip indicator */}
                  {!notif.read && (
                    <div className="absolute top-0 left-0 bottom-0 w-1 bg-blue-500 neon-glow-blue" />
                  )}

                  {/* Icon Block */}
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${iconDetails.bg}`}>
                    <IconComp className="w-4.5 h-4.5 stroke-[2.5]" />
                  </div>

                  {/* Text details */}
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className={`text-[12.5px] font-extrabold leading-tight ${notif.read ? 'text-slate-300' : 'text-white'}`}>
                        {notif.title}
                      </h4>
                      <span className="text-[8.5px] text-slate-500 font-bold shrink-0">{notif.time}</span>
                    </div>
                    
                    <p className={`text-[10.5px] font-semibold mt-1 leading-normal ${notif.read ? 'text-slate-500' : 'text-slate-350'}`}>
                      {notif.message}
                    </p>
                  </div>

                  {/* Arrow navigation visually */}
                  <div className="flex items-center shrink-0 text-slate-600 hover:text-blue-400 pl-1">
                    <ChevronRight className="w-4 h-4" />
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Empty Inbox State */}
          {notifications.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card-dark rounded-[32px] p-8 text-center text-slate-500 font-bold text-xs flex flex-col items-center justify-center gap-3 select-none border border-white/5 shadow-2xl py-12 mt-4"
            >
              <div className="w-14 h-14 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center text-slate-500 relative">
                <Bell className="w-7 h-7" />
                <Sparkles className="w-4 h-4 text-blue-400 absolute -top-0.5 -right-0.5 animate-bounce" />
              </div>
              <div>
                <p className="text-white text-sm font-extrabold">All caught up!</p>
                <p className="text-[10px] text-slate-500 mt-1 font-semibold leading-relaxed">
                  You have no pending notifications. Enjoy your clutter-free inbox.
                </p>
              </div>
            </motion.div>
          )}
        </div>

      </main>

      {/* Sticky Bottom Nav */}
      <BottomNavigation />
    </div>
  );
}
