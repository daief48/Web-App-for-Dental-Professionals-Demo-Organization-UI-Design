import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Loader2, Sparkles, Flower, Lock, Mail } from 'lucide-react';

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@miyabizen.com');
  const [password, setPassword] = useState('••••••••');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate wellness credentials verification
    setTimeout(() => {
      setIsLoading(false);
      if (onLogin) {
        onLogin();
      }
      navigate('/');
    }, 1200);
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center px-6 relative overflow-hidden bg-slate-950 py-12 select-none">
      
      {/* Absolute Space background meshes */}
      <div className="absolute top-1/4 left-1/4 w-44 h-44 rounded-full bg-rose-500/5 filter blur-[45px] ambient-glow-node" />
      <div className="absolute bottom-1/4 right-1/4 w-44 h-44 rounded-full bg-emerald-500/5 filter blur-[45px] ambient-glow-node" />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm flex flex-col gap-6 text-center z-10"
      >
        
        {/* Futuristic App Logo Icon */}
        <div className="flex flex-col items-center">
          <div className="w-14 h-14 rounded-[24px] bg-gradient-to-tr from-rose-450 via-teal-500 to-emerald-500 flex items-center justify-center text-white shadow-xl relative mb-3 group">
            <div className="absolute inset-0 rounded-[24px] bg-gradient-to-tr from-rose-450 to-emerald-500 filter blur-sm opacity-60 -z-10 group-hover:opacity-100 transition-opacity" />
            <Flower className="w-7 h-7 stroke-[2]" />
          </div>
          
          <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            Miyabi Zen Registry
          </h1>
          <p className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest mt-1.5 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
            <span>Wellness & Spa Portal</span>
          </p>
        </div>

        {/* Credentials Form Box */}
        <div className="glass-card-dark rounded-[32px] p-6.5 border border-white/5 shadow-2xl relative overflow-hidden flex flex-col gap-4 text-left">
          
          {/* Accent border banner */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-rose-400 via-teal-400 to-emerald-400" />
          
          <div className="text-center pb-2">
            <h3 className="font-extrabold text-[15px] text-white">Administrative Portal</h3>
            <p className="text-[10.5px] text-slate-400 font-semibold mt-1">HIPAA & SOC-2 Zen Wellness Staffing</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            
            {/* Email input field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[9.5px] font-extrabold uppercase tracking-wider text-slate-450 flex items-center gap-1.5">
                <Mail className="w-3 h-3 text-slate-500" />
                <span>Roster Administrator Email</span>
              </label>
              
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900/60 border border-white/5 rounded-xl py-2.5 px-3 text-xs font-semibold focus:outline-none focus:border-teal-500 focus:bg-slate-900 transition-all text-slate-200 glow-input"
                placeholder="admin@miyabizen.com"
              />
            </div>

            {/* Password input field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[9.5px] font-extrabold uppercase tracking-wider text-slate-450 flex items-center gap-1.5">
                <Lock className="w-3 h-3 text-slate-500" />
                <span>Roster Password</span>
              </label>
              
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900/60 border border-white/5 rounded-xl py-2.5 px-3 text-xs font-semibold focus:outline-none focus:border-teal-500 focus:bg-slate-900 transition-all text-slate-200 glow-input"
                placeholder="Roster passcode"
              />
            </div>

            {/* Simulated security warning badge */}
            <div className="bg-teal-500/5 rounded-xl p-2.5 border border-teal-500/10 flex items-start gap-2.5 select-none mt-1">
              <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0 stroke-[2.5]" />
              <p className="text-[9px] text-teal-300 font-semibold leading-normal">
                HIPAA compliant secure wellness portal with SOC-2 Type II zen encryption protocols.
              </p>
            </div>

            {/* Submit Action */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-rose-500 to-teal-500 hover:from-rose-600 hover:to-teal-600 text-white rounded-xl text-xs font-bold cursor-pointer shadow-lg shadow-rose-500/20 transition-all flex items-center justify-center gap-1.5 mt-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Authorizing Node...</span>
                </>
              ) : (
                <span>Access Dashboard</span>
              )}
            </motion.button>

          </form>

        </div>

        {/* Small version text footer */}
        <p className="text-[8.5px] text-slate-600 tracking-wider font-extrabold uppercase">
          Miyabi Zen US Staffing Platform v2.5.0 • SOC-2 Type II
        </p>

      </motion.div>

    </div>
  );
}
