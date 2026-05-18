import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  CalendarPlus, 
  Clock, 
  Sparkles, 
  FileText, 
  ArrowRight,
  TrendingUp,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import AppHeader from '../components/AppHeader';
import BottomNavigation from '../components/BottomNavigation';
import DashboardCard from '../components/DashboardCard';
import ShiftCard from '../components/ShiftCard';

export default function Dashboard({ shifts, timesheets, org, theme, toggleTheme }) {
  const navigate = useNavigate();
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const shiftsPerPage = 4;

  const totalPages = Math.ceil(shifts.length / shiftsPerPage);
  const indexOfLastShift = currentPage * shiftsPerPage;
  const indexOfFirstShift = indexOfLastShift - shiftsPerPage;
  const currentShifts = shifts.slice(indexOfFirstShift, indexOfLastShift);

  // Filter pending timesheets
  const pendingTimesheetsCount = timesheets.filter(t => t.status === 'Pending Approval').length;
  // Active published shifts count
  const activeShiftsCount = shifts.filter(s => s.status === 'Active' || s.status === 'Filled').length;

  const handleInvoiceClick = () => {
    setShowInvoiceModal(true);
  };

  const handleNotificationBellClick = () => {
    navigate('/notifications');
  };

  return (
    <div className="flex-1 flex flex-col justify-between select-none relative bg-slate-950">
      
      {/* Top Header */}
      <AppHeader org={org} onNotificationClick={handleNotificationBellClick} theme={theme} onThemeToggle={toggleTheme} />

      {/* Main Content Area */}
      <main className="flex-1 px-4 py-4 flex flex-col gap-5 overflow-y-auto no-scrollbar pb-24">
        
        {/* Banner Greeting */}
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-[28px] p-5 shadow-2xl border border-white/5 bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-950 flex flex-col gap-4"
        >
          {/* Subtle neon glowing ball behind greetings */}
          <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full bg-blue-500/10 filter blur-[35px] ambient-glow-node" />

          <div className="flex items-start justify-between">
            <div>
              <p className="text-[9px] uppercase font-extrabold tracking-widest text-slate-500">Welcome Back</p>
              <h1 className="text-lg font-extrabold tracking-tight mt-1 text-white">Hello Clinic Team! 👋</h1>
            </div>
            
            <div className="bg-slate-900/80 border border-white/5 rounded-2xl px-3 py-2 text-center text-white">
              <p className="text-[8px] font-extrabold uppercase text-slate-400">Balance</p>
              <p className="text-sm font-extrabold text-teal-400 mt-0.5">${org.balance.toFixed(2)}</p>
            </div>
          </div>

          {/* SVG Sparklines display for fill rates */}
          <div className="flex items-center gap-3.5 bg-slate-950/80 rounded-2xl p-3 border border-white/5 mt-0.5">
            <div className="flex-1 text-left">
              <p className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400">Shift Fill Rate</p>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-sm font-extrabold text-white">88%</span>
                <span className="text-[8.5px] font-extrabold text-emerald-400 flex items-center gap-0.5">
                  <TrendingUp className="w-2.5 h-2.5" />
                  <span>+4.2%</span>
                </span>
              </div>
            </div>
            
            {/* Sparkline chart SVG */}
            <div className="w-24 h-6 shrink-0 opacity-70">
              <svg viewBox="0 0 100 30" className="w-full h-full stroke-blue-500 stroke-[2] fill-none">
                <path d="M0,25 Q15,10 30,22 T60,5 T90,20 T100,8" />
                <path d="M0,25 Q15,10 30,22 T60,5 T90,20 T100,8 L100,30 L0,30 Z" className="fill-blue-500/5 stroke-none" />
              </svg>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-white/5 pt-3">
            <div className="flex items-center gap-1.5 text-[10px] text-slate-350 font-bold">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>HIPAA & SOC-2 compliance verified</span>
            </div>
            
            <span className="text-[9px] text-teal-400 font-extrabold bg-teal-500/10 border border-teal-500/25 px-2 py-0.5 rounded-full uppercase tracking-wide">
              HIPAA
            </span>
          </div>
        </motion.div>

        {/* Dashboard Analytics Grid */}
        <div className="grid grid-cols-2 gap-3.5">
          <DashboardCard
            title="Active Shifts"
            value={activeShiftsCount}
            icon={Activity}
            badge="Live"
            gradient="from-blue-600 to-blue-400"
            onClick={() => navigate('/create-shift')}
          />
          
          <DashboardCard
            title="Post Shift"
            value="+ Booking"
            icon={CalendarPlus}
            gradient="from-teal-600 to-teal-400"
            onClick={() => navigate('/create-shift')}
          />
          
          <div className="col-span-2">
            <DashboardCard
              title="Pending Timesheets"
              value={`${pendingTimesheetsCount} Pending Approval`}
              icon={Clock}
              badge={pendingTimesheetsCount > 0 ? "Action Required" : null}
              gradient="from-amber-600 to-amber-400"
              onClick={() => navigate('/timesheet/timesheet-1')}
            />
          </div>
        </div>

        {/* Quick Operations Actions */}
        <section className="flex flex-col gap-3">
          <h2 className="text-[10px] uppercase tracking-wider text-slate-500 font-extrabold">
            Quick Operations
          </h2>
          
          <div className="grid grid-cols-2 gap-3.5">
            {/* Active Link: Timesheets */}
            <motion.div
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/timesheet/timesheet-1')}
              className="glass-card-dark rounded-2xl p-4.5 border border-white/5 shadow-xl hover:shadow-2xl cursor-pointer transition-all flex flex-col justify-between h-28"
            >
              <div className="w-8.5 h-8.5 rounded-xl bg-slate-900 text-amber-500 border border-white/5 flex items-center justify-center">
                <Clock className="w-4.5 h-4.5" />
              </div>
              <div className="mt-2.5">
                <h3 className="font-extrabold text-[12.5px] text-white leading-tight">
                  Approve Timesheets
                </h3>
                <p className="text-[9.5px] text-slate-450 font-bold mt-0.5">Verify hours & release pay</p>
              </div>
            </motion.div>

            {/* Disabled Showcase Link: Invoices */}
            <motion.div
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleInvoiceClick}
              className="glass-card-dark rounded-2xl p-4.5 border border-white/5 shadow-xl hover:shadow-2xl cursor-pointer transition-all flex flex-col justify-between relative overflow-hidden h-28"
            >
              <div className="absolute top-2.5 right-2.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded text-[7.5px] font-extrabold uppercase tracking-widest select-none">
                PRO Plan
              </div>
              
              <div className="w-8.5 h-8.5 rounded-xl bg-slate-900 text-slate-500 border border-white/5 flex items-center justify-center">
                <FileText className="w-4.5 h-4.5" />
              </div>
              <div className="mt-2.5">
                <h3 className="font-extrabold text-[12.5px] text-slate-400 leading-tight flex items-center gap-1">
                  View Invoices
                </h3>
                <p className="text-[9.5px] text-slate-500 font-bold mt-0.5">Monthly billing breakdown</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Recent Shifts & Rotas Section */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-[10px] uppercase tracking-wider text-slate-500 font-extrabold">
              Recent Shifts & Rotas
            </h2>
            <button 
              onClick={() => navigate('/create-shift')}
              className="text-[11px] font-extrabold text-blue-400 flex items-center gap-0.5 hover:underline cursor-pointer"
            >
              <span>See all</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {currentShifts.map((shift) => (
              <ShiftCard
                key={shift.id}
                shift={shift}
                onClick={() => navigate(`/shift/${shift.id}`)}
              />
            ))}
          </div>

          {/* Premium Glowing Pagination Bar */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between bg-slate-900/60 border border-white/5 rounded-2xl p-2.5 mt-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className="px-3 py-2 rounded-xl bg-slate-950 border border-white/5 text-[10px] font-bold text-slate-350 hover:bg-slate-900 cursor-pointer disabled:opacity-30 disabled:hover:bg-slate-950 transition-all flex items-center gap-1 shrink-0"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </motion.button>
              
              <div className="text-[9px] text-slate-500 font-extrabold uppercase tracking-wider select-none shrink-0">
                Page <span className="text-white font-extrabold">{currentPage}</span> of <span className="text-white font-extrabold">{totalPages}</span>
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className="px-3 py-2 rounded-xl bg-slate-950 border border-white/5 text-[10px] font-bold text-slate-350 hover:bg-slate-900 cursor-pointer disabled:opacity-30 disabled:hover:bg-slate-950 transition-all flex items-center gap-1 shrink-0"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </motion.button>
            </div>
          )}
        </section>

      </main>

      {/* Floating Notification Alert */}
      <AnimatePresence>
        {showNotificationPopup && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 16, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="absolute top-12 left-4 right-4 z-50 glass-card-dark bg-slate-900/90 border border-white/10 p-3.5 rounded-2xl shadow-2xl flex items-start gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
              <Sparkles className="w-4.5 h-4.5 stroke-[2.5]" />
            </div>
            <div className="flex-1 text-left">
              <h4 className="font-extrabold text-[12.5px] text-white leading-tight">Notifications Cleared</h4>
              <p className="text-[9.5px] text-slate-400 mt-0.5 font-bold">All urgent timesheets and schedules have been viewed.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Invoice Block Pro Blocker Modal */}
      <AnimatePresence>
        {showInvoiceModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-6"
            onClick={() => setShowInvoiceModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass-card-dark rounded-[32px] p-6 shadow-2xl border border-white/10 flex flex-col gap-4 text-center max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mx-auto relative shadow-inner">
                <Sparkles className="w-6 h-6 animate-pulse stroke-[2]" />
              </div>

              <div>
                <h3 className="font-extrabold text-base text-white">Pro Feature Upgrade</h3>
                <p className="text-[11px] text-slate-450 font-bold mt-1.5 leading-relaxed">
                  Invoice management, accounting system syncs, and custom reports are premium enterprise features.
                </p>
              </div>

              <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-3.5 flex flex-col gap-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-450 font-bold">Feature Package</span>
                  <span className="text-white font-extrabold">Locum Finance Sync</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-450 font-bold">Tier Upgrade</span>
                  <span className="text-white font-extrabold">Professional SaaS Plan</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-2">
                <button 
                  onClick={() => setShowInvoiceModal(false)}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-500/15 cursor-pointer"
                >
                  Request Admin Access
                </button>
                <button 
                  onClick={() => setShowInvoiceModal(false)}
                  className="w-full py-3 bg-slate-900 border border-white/5 hover:bg-slate-800 text-slate-350 rounded-xl text-xs font-bold cursor-pointer transition-colors"
                >
                  Maybe Later
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Bottom Nav */}
      <BottomNavigation />
    </div>
  );
}
