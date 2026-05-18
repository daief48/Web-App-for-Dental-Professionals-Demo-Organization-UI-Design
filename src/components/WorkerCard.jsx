import React from 'react';
import { Star, ShieldCheck, Phone, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WorkerCard({ worker, onContact }) {
  if (!worker) return null;

  return (
    <div className="glass-card-dark rounded-[24px] p-5 border border-white/5 shadow-2xl flex flex-col gap-4 relative overflow-hidden select-none">
      
      {/* Absolute Glow details */}
      <div className="absolute top-0 left-0 w-16 h-16 bg-blue-500/5 rounded-full filter blur-xl" />

      {/* Header Profile with NPI check */}
      <div className="flex items-center gap-3.5">
        <img
          src={worker.avatar}
          alt={worker.name}
          className="w-12 h-12 rounded-2xl object-cover border border-white/10 shadow-inner"
        />
        
        <div className="flex-1 min-w-0 text-left">
          <div className="flex items-center gap-2">
            <h4 className="font-extrabold text-[15px] text-white truncate">
              {worker.name}
            </h4>
            <span className="flex items-center gap-0.5 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 px-1.5 py-0.5 rounded text-[8px] font-extrabold select-none">
              <Star className="w-2.5 h-2.5 fill-yellow-400 stroke-yellow-500 stroke-[1.5px]" />
              <span>{worker.rating.toFixed(1)}</span>
            </span>
          </div>
          
          <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-wider">
            {worker.role} • <span className="text-slate-300">{worker.gdcNumber}</span>
          </p>
        </div>
      </div>

      {/* Compliance check card */}
      <div className="flex items-center justify-between bg-slate-900/60 rounded-xl px-3.5 py-2.5 border border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-5.5 h-5.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-inner">
            <ShieldCheck className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
          <span className="text-[10px] font-extrabold text-emerald-400 tracking-wider uppercase select-none">
            Compliance Verified
          </span>
        </div>
        
        <span className="text-[8px] font-extrabold bg-blue-500/15 border border-blue-500/30 text-blue-400 px-2 py-0.5 rounded uppercase tracking-widest">
          ACTIVE
        </span>
      </div>

      {/* Titanium Quick buttons */}
      <div className="flex items-center gap-3 mt-0.5">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onContact?.('phone')}
          className="flex-1 py-2.5 bg-slate-900 border border-white/5 hover:bg-slate-800 active:bg-slate-700 text-slate-200 rounded-xl flex items-center justify-center gap-1.5 font-bold text-xs cursor-pointer transition-colors"
        >
          <Phone className="w-3.5 h-3.5 stroke-[2] text-slate-400" />
          <span>Call</span>
        </motion.button>
        
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onContact?.('message')}
          className="flex-1 py-2.5 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white rounded-xl flex items-center justify-center gap-1.5 font-bold text-xs cursor-pointer shadow-lg shadow-blue-500/15 transition-all"
        >
          <MessageSquare className="w-3.5 h-3.5 stroke-[2]" />
          <span>Message</span>
        </motion.button>
      </div>
    </div>
  );
}
