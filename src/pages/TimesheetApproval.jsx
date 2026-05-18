import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, 
  Calendar, 
  FileCheck2, 
  FileX2,
  CheckCircle2,
  Star
} from 'lucide-react';
import AppHeader from '../components/AppHeader';
import BottomNavigation from '../components/BottomNavigation';

export default function TimesheetApproval({ timesheets, setTimesheets, org, setOrg, theme, toggleTheme }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find timesheet
  const currentTimesheet = timesheets.find(t => t.id === id) || timesheets[0];

  const [status, setStatus] = useState(currentTimesheet?.status || 'Pending Approval');
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showQueryModal, setShowQueryModal] = useState(false);
  const [queryText, setQueryText] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  if (!currentTimesheet) {
    return (
      <div className="flex-1 flex flex-col justify-between select-none relative bg-slate-950">
        <AppHeader title="Timesheet Approval" showBack={true} org={org} theme={theme} onThemeToggle={toggleTheme} />
        <div className="flex-1 flex items-center justify-center p-6 text-center text-slate-550">
          Timesheet not found.
        </div>
        <BottomNavigation />
      </div>
    );
  }

  const handleApprove = () => {
    // Deduct amount from organisation balance and update status
    const pay = currentTimesheet.grossPay;
    
    setTimesheets(prev => prev.map(t => t.id === currentTimesheet.id ? { ...t, status: 'Approved' } : t));
    setOrg(prev => ({
      ...prev,
      balance: prev.balance - pay >= 0 ? prev.balance - pay : prev.balance
    }));
    
    setStatus('Approved');
    setShowApproveModal(false);
    setToastMessage('Timesheet approved! Funds released to worker.');
    
    setTimeout(() => {
      setToastMessage('');
      navigate('/');
    }, 1500);
  };

  const handleQuery = () => {
    setTimesheets(prev => prev.map(t => t.id === currentTimesheet.id ? { ...t, status: 'Queried', queryReason: queryText } : t));
    setStatus('Queried');
    setShowQueryModal(false);
    setToastMessage('Timesheet flagged as Queried.');
    
    setTimeout(() => {
      setToastMessage('');
      navigate('/');
    }, 1500);
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'Approved':
        return 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400';
      case 'Queried':
        return 'bg-rose-500/10 border-rose-500/25 text-rose-400';
      default:
        return 'bg-amber-500/10 border-amber-500/25 text-amber-400';
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between select-none relative bg-slate-950">
      
      {/* App Navigation */}
      <AppHeader title="Approve Timesheet" showBack={true} org={org} theme={theme} onThemeToggle={toggleTheme} />

      {/* Main Form viewport */}
      <main className="flex-1 px-4 py-4 flex flex-col gap-4.5 overflow-y-auto no-scrollbar pb-32">
        
        {/* Toast alerts */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-slate-900 border border-white/10 text-slate-100 rounded-xl px-3.5 py-2 text-center text-[10.5px] font-bold shadow-lg"
            >
              {toastMessage}
            </motion.div>
          )}
        </AnimatePresence>

        {/* 1. Worker Profile Header Card */}
        <div className="glass-card-dark rounded-[24px] p-4 border border-white/5 shadow-xl flex items-center gap-3.5">
          <img
            src={currentTimesheet.worker.avatar}
            alt={currentTimesheet.worker.name}
            className="w-12 h-12 rounded-2xl object-cover border border-white/10 shadow-inner shrink-0"
          />

          <div className="flex-1 min-w-0 text-left">
            <div className="flex items-center gap-1.5">
              <h4 className="font-extrabold text-[14px] text-white truncate">
                {currentTimesheet.worker.name}
              </h4>
              <span className="flex items-center gap-0.5 bg-yellow-500/10 text-yellow-450 border border-yellow-500/20 px-1.5 py-0.5 rounded text-[8px] font-extrabold select-none">
                <Star className="w-2.5 h-2.5 fill-yellow-400 stroke-yellow-500" />
                <span>4.9</span>
              </span>
            </div>
            
            <p className="text-[9.5px] text-slate-450 font-bold uppercase mt-1 tracking-wider">
              {currentTimesheet.role} • <span className="text-slate-300">{currentTimesheet.worker.gdcNumber}</span>
            </p>
          </div>

          <span className={`text-[9px] font-extrabold px-2.5 py-0.5 rounded-full border shrink-0 ${getStatusBadge()}`}>
            {status}
          </span>
        </div>

        {/* 2. Detailed Rota Times Card */}
        <div className="glass-card-dark rounded-3xl p-5 border border-white/5 shadow-xl flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <span className="text-[10px] uppercase tracking-wider text-slate-450 font-extrabold">
              Shift Hours Verification
            </span>
            <span className="text-[9px] text-blue-400 bg-blue-500/10 font-bold border border-blue-500/20 px-2 py-0.5 rounded-full">
              Standard Rota
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs text-slate-350">
            <div className="flex items-start gap-2.5 text-left">
              <Calendar className="w-4 h-4 text-slate-500 stroke-[2.5px] mt-0.5 shrink-0" />
              <div>
                <p className="text-[8.5px] uppercase font-extrabold text-slate-500">Shift Date</p>
                <p className="font-extrabold text-white mt-0.5">{currentTimesheet.shiftDate}</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 text-left">
              <Clock className="w-4 h-4 text-slate-500 stroke-[2.5px] mt-0.5 shrink-0" />
              <div>
                <p className="text-[8.5px] uppercase font-extrabold text-slate-500">Hours Logged</p>
                <p className="font-extrabold text-white mt-0.5">{currentTimesheet.startTime} - {currentTimesheet.endTime}</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 pt-1 border-t border-white/5 text-left">
              <Clock className="w-4 h-4 text-slate-500 stroke-[2.5] mt-0.5 shrink-0" />
              <div>
                <p className="text-[8.5px] uppercase font-extrabold text-slate-500">Break Taken</p>
                <p className="font-extrabold text-white mt-0.5">{currentTimesheet.breakDuration}</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 pt-1 border-t border-white/5 text-left">
              <FileCheck2 className="w-4 h-4 text-slate-500 stroke-[2.5] mt-0.5 shrink-0" />
              <div>
                <p className="text-[8.5px] uppercase font-extrabold text-slate-500">Net Rota Hours</p>
                <p className="font-extrabold text-blue-450 mt-0.5">{currentTimesheet.totalHours.toFixed(1)} hrs</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Gross Earnings and Invoicing */}
        <div className="relative overflow-hidden rounded-3xl p-5 border border-white/10 bg-slate-900 flex items-center justify-between shadow-2xl">
          {/* Ambient background blur */}
          <div className="absolute top-0 left-0 w-24 h-24 bg-blue-500/10 rounded-full filter blur-xl ambient-glow-node" />

          <div className="text-left z-10">
            <p className="text-[8px] uppercase font-extrabold tracking-widest text-slate-500">Total gross pay</p>
            <h3 className="text-xl font-extrabold text-teal-450 mt-1">
              ${currentTimesheet.grossPay.toFixed(2)}
            </h3>
            <p className="text-[8.5px] text-slate-400 mt-1 font-semibold">Direct bank transfer release</p>
          </div>

          <div className="h-10 border-l border-white/5 z-10" />

          <div className="text-right z-10">
            <p className="text-[8px] uppercase font-extrabold tracking-widest text-slate-500">Hourly Rate</p>
            <h4 className="text-base font-extrabold text-white mt-1">
              ${currentTimesheet.hourlyRate}/hr
            </h4>
            <p className="text-[8.5px] text-slate-400 mt-1 font-semibold">Locked price tier</p>
          </div>
        </div>

        {/* 4. Worker Note Section */}
        {currentTimesheet.workerNotes && (
          <div className="glass-card-dark rounded-[24px] p-4.5 border border-white/5 shadow-xl flex flex-col gap-2.5">
            <h4 className="text-[9.5px] font-extrabold uppercase tracking-wider text-slate-500 text-left">
              Locum Worker Shift Notes
            </h4>
            <div className="bg-slate-900/60 rounded-2xl p-3 border border-white/5 text-[10.5px] font-semibold text-slate-350 leading-relaxed italic text-left">
              “{currentTimesheet.workerNotes}”
            </div>
          </div>
        )}

      </main>

      {/* Sticky Bottom Actions */}
      <div className="absolute bottom-[72px] left-0 right-0 px-4 py-3 bg-slate-950/80 border-t border-white/5 backdrop-blur-xl z-20 flex items-center gap-3">
        {status === 'Pending Approval' ? (
          <>
            <button
              onClick={() => setShowQueryModal(true)}
              className="flex-1 py-3 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 text-rose-400 rounded-xl text-xs font-bold cursor-pointer transition-colors text-center"
            >
              Query / Reject
            </button>

            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => setShowApproveModal(true)}
              className="flex-2 py-3 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white rounded-xl text-xs font-bold cursor-pointer shadow-lg shadow-blue-500/15 flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
              <span>Approve Timesheet</span>
            </motion.button>
          </>
        ) : (
          <button
            onClick={() => navigate('/')}
            className="w-full py-3 bg-slate-900 border border-white/5 hover:bg-slate-800 text-slate-300 rounded-xl text-xs font-bold cursor-pointer transition-colors text-center"
          >
            Back to Dashboard
          </button>
        )}
      </div>

      {/* Query/Reject Input overlay sheet */}
      <AnimatePresence>
        {showQueryModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-end md:items-center justify-center p-0 md:p-6"
            onClick={() => setShowQueryModal(false)}
          >
            <motion.div
              initial={{ y: 250, opacity: 0.8 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 250, opacity: 0.8 }}
              className="w-full md:max-w-xs bg-slate-900 rounded-t-3xl md:rounded-[32px] p-5.5 shadow-2xl border-t md:border border-white/10 flex flex-col gap-4 text-left"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400">
                  <FileX2 className="w-4.5 h-4.5" />
                </div>
                <h3 className="font-extrabold text-[14px] text-white">Query Timesheet</h3>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9.5px] font-extrabold uppercase text-slate-450">Query Reason Details</label>
                <textarea
                  value={queryText}
                  onChange={(e) => setQueryText(e.target.value)}
                  className="w-full bg-slate-950 border border-white/5 rounded-xl p-3 text-xs font-semibold focus:outline-none focus:border-blue-500 focus:bg-slate-950 transition-all text-slate-200 glow-input min-h-[90px]"
                  placeholder="Explain why you are query-flagging this shift (e.g. incorrect hours, prolonged breaks)..."
                />
              </div>

              <div className="flex items-center gap-2.5 mt-1">
                <button
                  onClick={() => setShowQueryModal(false)}
                  className="flex-1 py-2.5 bg-slate-950 border border-white/5 hover:bg-slate-800 text-slate-350 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleQuery}
                  disabled={!queryText.trim()}
                  className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold disabled:opacity-50 cursor-pointer shadow-lg"
                >
                  Submit Query
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Approval Confirmation prompt overlay */}
      <AnimatePresence>
        {showApproveModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-6"
            onClick={() => setShowApproveModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              className="glass-card-dark rounded-[32px] p-5 shadow-2xl border border-white/10 flex flex-col gap-4 text-center max-w-xs"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-6 h-6 stroke-[2]" />
              </div>

              <div>
                <h3 className="font-extrabold text-[14px] text-white">Approve Locum Hours?</h3>
                <p className="text-[10.5px] text-slate-450 font-bold mt-1.5 leading-relaxed">
                  This authorizes a secure billing payment of <span className="text-white font-extrabold">${currentTimesheet.grossPay.toFixed(2)}</span> to {currentTimesheet.worker.name}.
                </p>
              </div>

              <div className="flex items-center gap-2.5 mt-1">
                <button
                  onClick={() => setShowApproveModal(false)}
                  className="flex-1 py-2.5 bg-slate-900 border border-white/5 hover:bg-slate-800 text-slate-300 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Go Back
                </button>
                <button
                  onClick={handleApprove}
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold cursor-pointer shadow-lg shadow-emerald-500/15"
                >
                  Approve & Release
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
