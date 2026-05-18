import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Clock, ChevronRight } from 'lucide-react';

export default function ShiftCard({ shift, onClick }) {
  // Helpers for neon vertical status bars and text highlights
  const getStatusDetails = (status) => {
    switch (status) {
      case 'Filled':
        return {
          bar: 'bg-emerald-500 neon-glow-teal',
          badge: 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400',
          dot: 'bg-emerald-500'
        };
      case 'Completed':
        return {
          bar: 'bg-blue-500 neon-glow-blue',
          badge: 'bg-blue-500/10 border-blue-500/25 text-blue-400',
          dot: 'bg-blue-500'
        };
      case 'Cancelled':
        return {
          bar: 'bg-rose-500',
          badge: 'bg-rose-500/10 border-rose-500/25 text-rose-400',
          dot: 'bg-rose-50'
        };
      default: // Active
        return {
          bar: 'bg-amber-500',
          badge: 'bg-amber-500/10 border-amber-500/25 text-amber-400',
          dot: 'bg-amber-400'
        };
    }
  };

  const statusInfo = getStatusDetails(shift.status);
  const fillRatio = `${shift.workersConfirmedCount}/${shift.workersNeeded}`;
  const isFullyFilled = shift.workersConfirmedCount === shift.workersNeeded;

  return (
    <motion.div
      whileHover={{ y: -2, borderBorder: 'rgba(59, 130, 246, 0.2)' }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="glass-card-dark rounded-2xl cursor-pointer border border-white/5 shadow-xl flex items-center justify-between group relative overflow-hidden pl-5 pr-4 py-4.5"
    >
      {/* Dynamic Vertical Status Indicator Bar */}
      <div className={`absolute top-0 left-0 bottom-0 w-1 ${statusInfo.bar}`} />

      <div className="flex-1">
        {/* Top Header */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="font-extrabold text-[15px] text-white group-hover:text-blue-400 transition-colors leading-tight">
            {shift.role}
          </h3>
          <span className={`text-[9px] font-extrabold px-2.5 py-0.5 rounded-full border tracking-wide uppercase ${statusInfo.badge}`}>
            {shift.status}
          </span>
        </div>

        {/* Location metadata */}
        <div className="flex items-center gap-1.5 text-[10.5px] text-slate-400 font-semibold mb-3">
          <MapPin className="w-3.5 h-3.5 text-slate-500 stroke-[2.5]" />
          <span className="truncate max-w-[210px] text-slate-350">{shift.location.split(',')[0]}</span>
        </div>

        {/* Date & Time specs */}
        <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-2">
          <div className="flex items-center gap-2.5 text-[10px] text-slate-400 font-bold">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-500 stroke-[2]" />
              <span>{shift.formattedDate}</span>
            </div>
            <div className="flex items-center gap-1.5 border-l border-white/5 pl-2.5">
              <Clock className="w-3.5 h-3.5 text-slate-500 stroke-[2]" />
              <span>{shift.startTime} - {shift.endTime}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10.5px] font-extrabold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-1.5 py-0.5 rounded">
              ${shift.hourlyRate}/hr
            </span>
            <div className="flex items-center gap-1 bg-slate-900 border border-white/5 px-2 py-0.5 rounded-md">
              <span className={`w-1.5 h-1.5 rounded-full ${isFullyFilled ? 'bg-emerald-500 neon-glow-teal' : 'bg-amber-400 animate-pulse'}`} />
              <span className="text-[9px] font-extrabold text-slate-400">
                {fillRatio}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Chevron Trigger visual */}
      <div className="pl-3.5 text-slate-500 group-hover:text-blue-400 transition-colors">
        <ChevronRight className="w-5 h-5 stroke-[2.5]" />
      </div>
    </motion.div>
  );
}
