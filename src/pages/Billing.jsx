import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, 
  Download, 
  Plus, 
  ArrowUpRight, 
  CheckCircle2, 
  FileText, 
  ArrowRight,
  Sparkles,
  DollarSign
} from 'lucide-react';
import AppHeader from '../components/AppHeader';
import BottomNavigation from '../components/BottomNavigation';

export default function Billing({ org, setOrg, theme, toggleTheme }) {
  const navigate = useNavigate();
  const [showTopUp, setShowTopUp] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState('500');
  const [toastMessage, setToastMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock list of transaction invoices (US Standard)
  const [invoices, setInvoices] = useState([
    { id: 'INV-2026-089', date: '18 May 2026', description: 'Timesheet Release (Sarah Johnson)', hours: '8.0 hrs', amount: 280.00, status: 'Paid' },
    { id: 'INV-2026-088', date: '15 May 2026', description: 'Premium US Platform License Fee', hours: 'Monthly subscription', amount: 99.00, status: 'Paid' },
    { id: 'INV-2026-082', date: '10 May 2026', description: 'Timesheet Release (John Miller)', hours: '7.0 hrs', amount: 1015.00, status: 'Paid' },
    { id: 'INV-2026-075', date: '04 May 2026', description: 'Direct Wallet Balance Deposit', hours: 'Stripe Settlement', amount: 1500.00, status: 'Top-up' }
  ]);

  const handleDownload = (invId) => {
    setToastMessage(`Downloading PDF: ${invId}...`);
    setTimeout(() => {
      setToastMessage('');
    }, 2000);
  };

  const handleTopUpConfirm = (e) => {
    e.preventDefault();
    const amountNum = parseFloat(topUpAmount);
    if (isNaN(amountNum) || amountNum <= 0) return;

    setIsProcessing(true);

    setTimeout(() => {
      // Deduct or add balance dynamically
      setOrg(prev => ({
        ...prev,
        balance: prev.balance + amountNum
      }));

      // Append to invoices log
      const newInvoice = {
        id: `DEP-2026-${Math.floor(100 + Math.random() * 900)}`,
        date: 'Today',
        description: 'Direct Wallet Balance Deposit',
        hours: 'Stripe Settlement',
        amount: amountNum,
        status: 'Top-up'
      };

      setInvoices(prev => [newInvoice, ...prev]);
      setIsProcessing(false);
      setShowTopUp(false);
      setToastMessage(`Successfully topped up $${amountNum.toFixed(2)} via Stripe Secure!`);
      setTimeout(() => setToastMessage(''), 3000);
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col justify-between select-none relative bg-slate-950">
      
      {/* Top Header */}
      <AppHeader title="Billing & Invoices" showBack={true} org={org} theme={theme} onThemeToggle={toggleTheme} />

      {/* Main Billing scroll pane */}
      <main className="flex-1 px-4 py-4 flex flex-col gap-4.5 overflow-y-auto no-scrollbar pb-32">
        
        {/* Toast alerts */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-slate-900 border border-white/10 text-emerald-400 rounded-xl px-3.5 py-2.5 text-center text-xs font-bold shadow-lg flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="w-4.5 h-4.5" />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 1. Metallic Wallet Balance hero card */}
        <div className="relative overflow-hidden rounded-[32px] p-6 border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 flex flex-col gap-5 shadow-2xl">
          {/* Ambient lighting mesh glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full filter blur-2xl ambient-glow-node" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-teal-500/5 rounded-full filter blur-xl ambient-glow-node" />

          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-2 bg-slate-900/60 border border-white/5 px-3 py-1 rounded-full text-[9px] font-extrabold text-blue-400 select-none">
              <CreditCard className="w-3.5 h-3.5" />
              <span>SECURE LOCUM WALLET</span>
            </div>
            
            <Sparkles className="w-4 h-4 text-teal-400 animate-pulse" />
          </div>

          <div className="text-left z-10">
            <p className="text-[10px] uppercase font-extrabold tracking-widest text-slate-500">Available Account Balance</p>
            <h1 className="text-3xl font-black text-white mt-1.5 tracking-tight">
              ${org.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h1>
            <p className="text-[9px] text-slate-450 mt-1 font-bold">Clinical Rota funding settlement pool</p>
          </div>

          <div className="flex gap-2.5 border-t border-white/5 pt-4 z-10">
            <button
              onClick={() => setShowTopUp(true)}
              className="flex-1 py-2.5 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white rounded-xl text-xs font-bold cursor-pointer shadow-lg flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Top Up Wallet</span>
            </button>
          </div>

        </div>

        {/* 2. List of transaction invoices */}
        <div className="flex flex-col gap-3">
          <h3 className="text-[10px] font-extrabold uppercase tracking-wider text-slate-550 text-left px-1">
            Billing Logs & Settlements
          </h3>

          <div className="flex flex-col gap-3">
            {invoices.map((inv) => (
              <div 
                key={inv.id}
                className="glass-card-dark rounded-2xl p-4 border border-white/5 flex items-center justify-between gap-3 shadow-md hover:border-white/10 transition-all select-none"
              >
                <div className="flex items-start gap-3 text-left">
                  <div className="w-9 h-9 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center shrink-0 text-slate-450">
                    <FileText className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-[11.5px] font-extrabold text-white">
                      {inv.description}
                    </h4>
                    <p className="text-[9px] text-slate-550 font-bold mt-0.5 uppercase tracking-wide">
                      {inv.id} • {inv.date}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end shrink-0">
                  <span className={`text-[12.5px] font-black ${inv.status === 'Top-up' ? 'text-teal-400' : 'text-slate-200'}`}>
                    {inv.status === 'Top-up' ? '+' : '-'} ${inv.amount.toFixed(2)}
                  </span>
                  
                  <button 
                    onClick={() => handleDownload(inv.id)}
                    className="text-[8.5px] font-extrabold text-blue-400 flex items-center gap-0.5 mt-1 cursor-pointer"
                  >
                    <Download className="w-2.5 h-2.5" />
                    <span>PDF</span>
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>

      </main>

      {/* Stripe Secure Mock Top Up Modal */}
      <AnimatePresence>
        {showTopUp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-end md:items-center justify-center p-0 md:p-6"
            onClick={() => setShowTopUp(false)}
          >
            <motion.div
              initial={{ y: 250, opacity: 0.8 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 250, opacity: 0.8 }}
              className="w-full md:max-w-xs bg-slate-900 rounded-t-3xl md:rounded-[32px] p-5.5 shadow-2xl border-t md:border border-white/10 flex flex-col gap-4 text-left"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    <Plus className="w-4.5 h-4.5" />
                  </div>
                  <h3 className="font-extrabold text-[14px] text-white">Top Up Wallet</h3>
                </div>
                
                <span className="text-[8px] bg-slate-950 border border-white/5 text-slate-400 px-2 py-0.5 rounded-full font-bold select-none">
                  Stripe Payment Gate
                </span>
              </div>

              <form onSubmit={handleTopUpConfirm} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9.5px] font-extrabold uppercase text-slate-450">Top-Up Amount ($)</label>
                  
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-slate-400 font-extrabold text-sm">$</span>
                    <input
                      type="number"
                      required
                      value={topUpAmount}
                      onChange={(e) => setTopUpAmount(e.target.value)}
                      className="w-full bg-slate-950 border border-white/5 rounded-xl p-3 pl-7 text-sm font-black focus:outline-none focus:border-blue-500 focus:bg-slate-950 transition-all text-slate-100 glow-input"
                      placeholder="500"
                    />
                  </div>
                </div>

                <div className="bg-slate-950 rounded-2xl p-3 border border-white/5 text-[9px] font-semibold text-slate-450 leading-relaxed">
                  Top-up settles instantly. Your payment card ending in <span className="text-white font-extrabold">**** 9081</span> will be charged securely.
                </div>

                <div className="flex items-center gap-2.5 mt-1">
                  <button
                    type="button"
                    onClick={() => setShowTopUp(false)}
                    className="flex-1 py-2.5 bg-slate-950 border border-white/5 hover:bg-slate-800 text-slate-350 rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="flex-1 py-2.5 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-xl text-xs font-bold cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1.5 shadow-lg"
                  >
                    {isProcessing ? (
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Add Funds</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Bottom Nav */}
      <BottomNavigation />
    </div>
  );
}
