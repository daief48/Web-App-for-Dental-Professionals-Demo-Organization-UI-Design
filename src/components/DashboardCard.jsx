import React from 'react';
import { motion } from 'framer-motion';

export default function DashboardCard({ title, value, icon: Icon, badge, gradient, onClick }) {
  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="relative overflow-hidden glass-card-dark rounded-[24px] p-5 flex flex-col justify-between cursor-pointer border border-white/5 shadow-2xl h-36"
    >
      {/* Absolute Neon Glow Radial Background */}
      <div className={`absolute top-0 right-0 w-24 h-24 rounded-full filter blur-[35px] opacity-15 bg-gradient-to-br ${gradient} -mr-4 -mt-4 ambient-glow-node`} />

      <div className="flex items-center justify-between">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center bg-slate-900 border border-white/10 text-white shadow-inner`}>
          <Icon className="w-5 h-5 stroke-[2] text-blue-400 group-hover:text-teal-300 transition-colors" />
        </div>
        
        {badge && (
          <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 tracking-wider uppercase animate-pulse">
            {badge}
          </span>
        )}
      </div>

      <div className="flex flex-col mt-2">
        <span className="text-2xl font-extrabold tracking-tight text-white leading-none">
          {value}
        </span>
        <span className="text-[9px] font-extrabold text-slate-400 mt-1.5 uppercase tracking-widest">
          {title}
        </span>
      </div>
    </motion.div>
  );
}
