import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Mail, 
  LogOut, 
  Settings, 
  CreditCard, 
  FileCheck, 
  MessageCircleQuestion,
  ChevronRight,
  Award
} from 'lucide-react';
import AppHeader from '../components/AppHeader';
import BottomNavigation from '../components/BottomNavigation';

export default function Profile({ org, setOrg, theme, toggleTheme, onLogout }) {
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState('');

  const handleLogout = () => {
    setToastMessage('Signing out...');
    setTimeout(() => {
      setToastMessage('');
      if (onLogout) {
        onLogout();
      }
      navigate('/login');
    }, 1000);
  };

  const handleAction = (label) => {
    setToastMessage(`Opening ${label}...`);
    setTimeout(() => setToastMessage(''), 2000);
  };

  return (
    <div className="flex-1 flex flex-col justify-between select-none relative bg-slate-950">
      
      {/* App Navigation */}
      <AppHeader title="Clinic Profile" showBack={true} org={org} theme={theme} onThemeToggle={toggleTheme} />

      {/* Main scroll details */}
      <main className="flex-1 px-4 py-4 flex flex-col gap-4.5 overflow-y-auto no-scrollbar pb-32">
        
        {/* Toast notifications */}
        {toastMessage && (
          <div className="bg-slate-900 border border-white/5 text-slate-100 rounded-xl px-3.5 py-2 text-center text-xs font-bold shadow-lg">
            {toastMessage}
          </div>
        )}

        {/* 1. Header Profile details */}
        <div className="glass-card-dark rounded-[28px] p-5 border border-white/5 shadow-2xl flex flex-col items-center text-center relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-[-40px] w-32 h-32 rounded-full bg-blue-500/5 filter blur-xl ambient-glow-node" />

          <div className="w-16 h-16 rounded-[24px] bg-gradient-to-tr from-blue-600 to-teal-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-blue-500/10 mb-3.5 relative">
            <div className="absolute inset-0 rounded-[24px] bg-gradient-to-tr from-blue-600 to-teal-500 filter blur-sm opacity-50 -z-10" />
            {org.logo}
          </div>

          <h2 className="font-extrabold text-base text-white leading-tight">
            {org.name}
          </h2>
          
          <p className="text-[9.5px] text-slate-500 font-extrabold uppercase tracking-wider mt-1.5">
            Clinic ID: {org.code}
          </p>

          <div className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 px-3 py-1 rounded-full text-[9px] font-extrabold mt-3.5 shadow-inner select-none tracking-wide">
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            <span>HIPAA / SOC-2 COMPLIANCE LEVEL</span>
          </div>
        </div>

        {/* 2. Stat indicators */}
        <div className="grid grid-cols-3 gap-2.5">
          <div className="glass-card-dark rounded-2xl p-3.5 border border-white/5 text-center flex flex-col gap-0.5 shadow-xl">
            <span className="text-sm font-extrabold text-blue-400">${org.balance.toFixed(0)}</span>
            <span className="text-[8.5px] font-extrabold text-slate-500 uppercase tracking-widest mt-1">Wallet</span>
          </div>
          
          <div className="glass-card-dark rounded-2xl p-3.5 border border-white/5 text-center flex flex-col gap-0.5 shadow-xl">
            <span className="text-sm font-extrabold text-white">12 Rota</span>
            <span className="text-[8.5px] font-extrabold text-slate-500 uppercase tracking-widest mt-1">Filled</span>
          </div>

          <div className="glass-card-dark rounded-2xl p-3.5 border border-white/5 text-center flex flex-col gap-0.5 shadow-xl">
            <span className="text-sm font-extrabold text-teal-400">4.9 ★</span>
            <span className="text-[8.5px] font-extrabold text-slate-500 uppercase tracking-widest mt-1">Rating</span>
          </div>
        </div>

        {/* 3. Address Info List */}
        <div className="glass-card-dark rounded-[24px] p-4.5 border border-white/5 shadow-xl flex flex-col gap-3.5 text-xs text-slate-350">
          <div className="flex items-start gap-3.5 text-left">
            <MapPin className="w-4 h-4 text-slate-500 stroke-[2.5px] mt-0.5" />
            <div>
              <p className="text-[8.5px] uppercase font-extrabold text-slate-550">Headquarters</p>
              <p className="font-extrabold text-white mt-0.5">{org.address}</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 border-t border-white/5 pt-3.5 text-left">
            <Mail className="w-4 h-4 text-slate-500 stroke-[2.5px] mt-0.5" />
            <div>
              <p className="text-[8.5px] uppercase font-extrabold text-slate-550">Billing Email</p>
              <p className="font-extrabold text-white mt-0.5">{org.email}</p>
            </div>
          </div>
        </div>

        {/* 4. Support Actions list */}
        <div className="glass-card-dark rounded-[24px] p-2 border border-white/5 shadow-xl flex flex-col">
          {[
            { id: 'settings', label: 'Clinic Settings', icon: Settings, color: 'text-slate-400', path: '/settings' },
            { id: 'billing', label: 'Billing & Invoices', icon: CreditCard, color: 'text-blue-400', path: '/billing' },
            { id: 'compliance', label: 'Compliance Reports', icon: FileCheck, color: 'text-emerald-400', path: '/compliance' },
            { id: 'support', label: 'Locum Help & Support', icon: MessageCircleQuestion, color: 'text-purple-400', path: '/support' }
          ].map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={() => navigate(action.path)}
                className="flex items-center justify-between p-3 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer text-left group"
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-8 h-8 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center ${action.color} group-hover:scale-105 transition-transform`}>
                    <Icon className="w-4.5 h-4.5 stroke-[2.5]" />
                  </div>
                  <span className="text-xs font-bold text-slate-200">{action.label}</span>
                </div>
                
                <ChevronRight className="w-4 h-4 text-slate-550 group-hover:text-blue-400 transition-colors stroke-[2.5]" />
              </button>
            );
          })}
        </div>

        {/* 5. Logout Trigger button */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          className="w-full py-3.5 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 text-rose-450 rounded-[20px] text-xs font-bold cursor-pointer transition-colors text-center flex items-center justify-center gap-2"
        >
          <LogOut className="w-4 h-4 stroke-[2.5]" />
          <span>Sign Out of Portal</span>
        </motion.button>

      </main>

      {/* Sticky Bottom Nav */}
      <BottomNavigation />
    </div>
  );
}
