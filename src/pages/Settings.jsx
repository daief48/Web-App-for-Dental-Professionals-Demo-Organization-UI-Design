import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Save, 
  ToggleLeft, 
  ToggleRight, 
  Shield, 
  Smartphone, 
  Mail, 
  Building2,
  CheckCircle
} from 'lucide-react';
import AppHeader from '../components/AppHeader';
import BottomNavigation from '../components/BottomNavigation';

export default function Settings({ org, setOrg, theme, toggleTheme }) {
  const navigate = useNavigate();
  const [name, setName] = useState(org.name);
  const [email, setEmail] = useState(org.email);
  const [address, setAddress] = useState(org.address);
  const [logo, setLogo] = useState(org.logo);
  
  // Settings switches states
  const [autoPublish, setAutoPublish] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  
  const [toastMessage, setToastMessage] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    
    // Save to global org state
    setOrg(prev => ({
      ...prev,
      name,
      email,
      address,
      logo
    }));

    setToastMessage('Settings saved successfully!');
    setTimeout(() => {
      setToastMessage('');
      navigate('/profile');
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col justify-between select-none relative bg-slate-950">
      
      {/* Top Header */}
      <AppHeader title="Clinic Settings" showBack={true} org={org} theme={theme} onThemeToggle={toggleTheme} />

      {/* Main Settings viewport */}
      <main className="flex-1 px-4 py-4 flex flex-col gap-4.5 overflow-y-auto no-scrollbar pb-32">
        
        {/* Toast Notification */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-slate-900 border border-white/10 text-emerald-400 rounded-xl px-3.5 py-2.5 text-center text-xs font-bold shadow-lg flex items-center justify-center gap-1.5"
            >
              <CheckCircle className="w-4.5 h-4.5" />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSave} className="flex flex-col gap-4">
          
          {/* 1. General Profile Section */}
          <div className="glass-card-dark rounded-3xl p-5 border border-white/5 shadow-xl flex flex-col gap-4">
            <h3 className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 text-left">
              General Clinic Details
            </h3>

            {/* Logo Emoji Input */}
            <div className="flex items-center gap-4 text-left">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-teal-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                {logo}
              </div>
              <div className="flex-1">
                <label className="text-[9px] font-extrabold uppercase text-slate-500">Logo Icon / Emoji</label>
                <input
                  type="text"
                  maxLength={2}
                  value={logo}
                  onChange={(e) => setLogo(e.target.value)}
                  className="w-full bg-slate-950 border border-white/5 rounded-xl p-2.5 text-xs font-bold mt-1 text-slate-200 text-center focus:outline-none focus:border-blue-500 focus:bg-slate-950 transition-all glow-input"
                  placeholder="🩺"
                />
              </div>
            </div>

            {/* Name Input */}
            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-[9px] font-extrabold uppercase text-slate-500 flex items-center gap-1">
                <Building2 className="w-3 h-3 text-slate-500" />
                <span>Organisation Name</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-950 border border-white/5 rounded-xl p-3 text-xs font-bold text-slate-200 focus:outline-none focus:border-blue-500 focus:bg-slate-950 transition-all glow-input"
                placeholder="Locum Connect Care"
              />
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-[9px] font-extrabold uppercase text-slate-500 flex items-center gap-1">
                <Mail className="w-3 h-3 text-slate-500" />
                <span>Billing / Contact Email</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-white/5 rounded-xl p-3 text-xs font-bold text-slate-200 focus:outline-none focus:border-blue-500 focus:bg-slate-950 transition-all glow-input"
                placeholder="billing@miyabizen.com"
              />
            </div>

            {/* Headquarters Address Input */}
            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-[9px] font-extrabold uppercase text-slate-500">HQ Address Details</label>
              <textarea
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-slate-950 border border-white/5 rounded-xl p-3 text-xs font-bold text-slate-200 focus:outline-none focus:border-blue-500 focus:bg-slate-950 transition-all glow-input min-h-[70px] leading-relaxed"
                placeholder="90210 Wilshire Blvd, Beverly Hills, CA 90210"
              />
            </div>

          </div>

          {/* 2. Platform Automations & Controls */}
          <div className="glass-card-dark rounded-3xl p-5 border border-white/5 shadow-xl flex flex-col gap-4">
            <h3 className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 text-left">
              SaaS Rota Automation
            </h3>

            {/* Switch 1: Auto Publish */}
            <div className="flex items-center justify-between">
              <div className="text-left max-w-[200px]">
                <p className="text-xs font-bold text-slate-200">Auto-Publish Shift matches</p>
                <p className="text-[9px] text-slate-500 font-semibold mt-0.5 leading-normal">
                  Instantly match verified wellness staff on published rates.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setAutoPublish(!autoPublish)}
                className="text-slate-400 hover:text-blue-400 cursor-pointer transition-colors"
              >
                {autoPublish ? (
                  <ToggleRight className="w-10 h-10 text-teal-400 stroke-[1.5]" />
                ) : (
                  <ToggleLeft className="w-10 h-10 text-slate-600 stroke-[1.5]" />
                )}
              </button>
            </div>

            {/* Switch 2: SMS Alerts */}
            <div className="flex items-center justify-between border-t border-white/5 pt-4">
              <div className="text-left max-w-[200px]">
                <p className="text-xs font-bold text-slate-200">SMS Notification Alerts</p>
                <p className="text-[9px] text-slate-500 font-semibold mt-0.5 leading-normal">
                  Send immediate text dispatch to target local locums.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSmsAlerts(!smsAlerts)}
                className="text-slate-400 hover:text-blue-400 cursor-pointer transition-colors"
              >
                {smsAlerts ? (
                  <ToggleRight className="w-10 h-10 text-teal-400 stroke-[1.5]" />
                ) : (
                  <ToggleLeft className="w-10 h-10 text-slate-600 stroke-[1.5]" />
                )}
              </button>
            </div>

            {/* Switch 3: 2FA */}
            <div className="flex items-center justify-between border-t border-white/5 pt-4">
              <div className="text-left max-w-[200px]">
                <p className="text-xs font-bold text-slate-200">Two-Factor Authentication (2FA)</p>
                <p className="text-[9px] text-slate-500 font-semibold mt-0.5 leading-normal">
                  Add secure SMS verification to timesheet releases.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setTwoFactor(!twoFactor)}
                className="text-slate-400 hover:text-blue-400 cursor-pointer transition-colors"
              >
                {twoFactor ? (
                  <ToggleRight className="w-10 h-10 text-teal-400 stroke-[1.5]" />
                ) : (
                  <ToggleLeft className="w-10 h-10 text-slate-600 stroke-[1.5]" />
                )}
              </button>
            </div>

          </div>

          {/* Sticky Submit Button */}
          <div className="bg-slate-950/80 border border-white/5 rounded-3xl p-3.5 backdrop-blur-xl flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-400">
              <Shield className="w-4 h-4 text-teal-400" />
              <span className="text-[9px] font-bold text-slate-500">Security: HIPAA Secured SSL Tunnel</span>
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="py-2.5 px-6 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white rounded-xl text-xs font-bold cursor-pointer shadow-lg shadow-blue-500/15 flex items-center gap-1.5"
            >
              <Save className="w-4 h-4 stroke-[2.5]" />
              <span>Save Details</span>
            </motion.button>
          </div>

        </form>

      </main>

      {/* Sticky Bottom Nav */}
      <BottomNavigation />
    </div>
  );
}
