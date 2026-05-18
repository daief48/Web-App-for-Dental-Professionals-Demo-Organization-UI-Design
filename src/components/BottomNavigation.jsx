import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, CalendarDays, Clock8, UserCircle } from 'lucide-react';

export default function BottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: '/'
    },
    {
      id: 'shifts',
      label: 'Shifts',
      icon: CalendarDays,
      path: '/create-shift'
    },
    {
      id: 'timesheets',
      label: 'Timesheets',
      icon: Clock8,
      path: '/timesheet/timesheet-1'
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: UserCircle,
      path: '/profile'
    }
  ];

  const isActive = (item) => {
    if (item.id === 'dashboard') {
      return location.pathname === '/' || location.pathname === '/dashboard';
    }
    if (item.id === 'shifts') {
      return location.pathname === '/create-shift' || location.pathname.startsWith('/shift/');
    }
    return location.pathname.startsWith(item.path);
  };

  return (
    <div className="absolute bottom-5 left-4 right-4 h-[58px] z-30 select-none">
      <nav className="w-full h-full glass-nav-dark rounded-[24px] flex items-center justify-around px-2 shadow-2xl relative">
        
        {navItems.map((item) => {
          const active = isActive(item);
          const IconComponent = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center justify-center w-[64px] h-[46px] relative rounded-xl cursor-pointer group"
            >
              {/* Sliding Active Overlay Bubble */}
              {active && (
                <motion.div
                  layoutId="activeBubbleDark"
                  className="absolute inset-0 bg-blue-500/10 border border-blue-500/20 rounded-xl -z-10 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                  transition={{ type: 'spring', stiffness: 350, damping: 26 }}
                />
              )}

              <motion.div
                animate={{ 
                  scale: active ? 1.08 : 1,
                  y: active ? -1 : 0
                }}
                className={`flex flex-col items-center justify-center ${active ? 'text-blue-400 font-extrabold' : 'text-slate-500 font-bold group-hover:text-slate-300'} transition-all`}
              >
                <IconComponent className={`w-4.5 h-4.5 ${active ? 'stroke-[2.5px] text-blue-400' : 'stroke-[2px]'}`} />
                <span className="text-[9px] mt-1 tracking-wide leading-none">{item.label}</span>
              </motion.div>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
