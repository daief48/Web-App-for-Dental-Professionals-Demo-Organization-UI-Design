import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  CheckCircle,
  AlertTriangle,
  Heart,
  ShieldCheck
} from 'lucide-react';
import AppHeader from '../components/AppHeader';
import BottomNavigation from '../components/BottomNavigation';
import WorkerCard from '../components/WorkerCard';

export default function ShiftDetails({ shifts, setShifts, org, theme, toggleTheme }) {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find current shift
  const currentShift = shifts.find(s => s.id === id) || shifts[0];

  const [shiftStatus, setShiftStatus] = useState(currentShift?.status || 'Active');
  const [showConfirmCancel, setShowConfirmCancel] = useState(false);
  const [showConfirmComplete, setShowConfirmComplete] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  if (!currentShift) {
    return (
      <div className="flex-1 flex flex-col justify-between select-none relative bg-slate-950">
        <AppHeader title="Shift Details" showBack={true} org={org} theme={theme} onThemeToggle={toggleTheme} />
        <div className="flex-1 flex items-center justify-center p-6 text-center text-slate-500">
          Shift not found.
        </div>
        <BottomNavigation />
      </div>
    );
  }

  // Handle Contact Trigger
  const handleContact = (type) => {
    setToastMessage(`Opening ${type} channel to ${currentShift.assignedWorkers[0]?.name || 'locum worker'}...`);
    setTimeout(() => setToastMessage(''), 2500);
  };

  // Cancel Shift Action
  const handleCancelShift = () => {
    setShifts(prev => prev.map(s => s.id === currentShift.id ? { ...s, status: 'Cancelled' } : s));
    setShiftStatus('Cancelled');
    setShowConfirmCancel(false);
    setToastMessage('Shift cancelled successfully');
    setTimeout(() => {
      setToastMessage('');
      navigate('/');
    }, 1500);
  };

  // Complete Shift Action
  const handleCompleteShift = () => {
    setShifts(prev => prev.map(s => s.id === currentShift.id ? { ...s, status: 'Completed' } : s));
    setShiftStatus('Completed');
    setShowConfirmComplete(false);
    setToastMessage('Shift marked as Completed');
    setTimeout(() => {
      setToastMessage('');
      navigate('/');
    }, 1500);
  };

  // Helpers for Status indicator colours
  const getStatusBadgeClass = () => {
    switch (shiftStatus) {
      case 'Filled':
        return 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400';
      case 'Completed':
        return 'bg-blue-500/10 border-blue-500/25 text-blue-400';
      case 'Cancelled':
        return 'bg-rose-500/10 border-rose-500/25 text-rose-400';
      default:
        return 'bg-amber-500/10 border-amber-500/25 text-amber-400';
    }
  };

  // Calculated estimated budget
  const calculateTotalBudget = () => {
    try {
      const [sh, sm] = currentShift.startTime.split(':').map(Number);
      const [eh, em] = currentShift.endTime.split(':').map(Number);
      let diffHrs = eh + em / 60 - (sh + sm / 60);
      if (diffHrs < 0) diffHrs += 24;
      return diffHrs * currentShift.hourlyRate * currentShift.workersNeeded;
    } catch (e) {
      return 0;
    }
  };

  const totalEstPay = calculateTotalBudget();
  const hasWorkers = currentShift.assignedWorkers && currentShift.assignedWorkers.length > 0;

  return (
    <div className="flex-1 flex flex-col justify-between select-none relative bg-slate-950">
      
      {/* Top Navigation */}
      <AppHeader title="Shift Details" showBack={true} org={org} theme={theme} onThemeToggle={toggleTheme} />

      {/* Main Details Panel */}
      <main className="flex-1 px-4 py-4 flex flex-col gap-4.5 overflow-y-auto no-scrollbar pb-32">
        
        {/* Toast Alert popup banner */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-slate-900 border border-white/10 text-slate-100 rounded-xl px-3.5 py-2 text-center text-[11px] font-bold shadow-lg"
            >
              {toastMessage}
            </motion.div>
          )}
        </AnimatePresence>

        {/* 1. Header Hero Card */}
        <div className="glass-card-dark rounded-[28px] p-5 border border-white/5 shadow-xl flex flex-col gap-4 relative overflow-hidden">
          {/* Accent light blob */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full filter blur-xl ambient-glow-node" />

          <div className="flex items-start justify-between">
            <div className="text-left">
              <span className={`text-[9px] font-extrabold px-2.5 py-0.5 rounded-full border tracking-wide uppercase ${getStatusBadgeClass()}`}>
                {shiftStatus}
              </span>
              <h1 className="text-lg font-extrabold text-white mt-3 leading-tight">
                {currentShift.role}
              </h1>
              <p className="text-[10px] text-slate-450 font-bold mt-1.5 flex items-center gap-1">
                <span>Clinic Account:</span>
                <span className="text-slate-300">{org.name}</span>
              </p>
            </div>

            <div className="w-9 h-9 rounded-xl bg-slate-900 border border-white/5 text-rose-500 flex items-center justify-center">
              <Heart className="w-5 h-5 fill-rose-500/10 stroke-[2]" />
            </div>
          </div>

          {/* Core timing specs */}
          <div className="grid grid-cols-2 gap-3.5 border-t border-white/5 pt-4 mt-1 text-slate-350 text-xs">
            <div className="flex items-center gap-2.5 text-left">
              <Calendar className="w-4 h-4 text-slate-500" />
              <div>
                <p className="text-[8.5px] uppercase font-extrabold text-slate-500">Date</p>
                <p className="font-extrabold text-white mt-0.5">{currentShift.formattedDate}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2.5 border-l border-white/5 pl-4 text-left">
              <Clock className="w-4 h-4 text-slate-500" />
              <div>
                <p className="text-[8.5px] uppercase font-extrabold text-slate-500">Time</p>
                <p className="font-extrabold text-white mt-0.5">{currentShift.startTime} - {currentShift.endTime}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Job Statistics & Financial Breakdown */}
        <div className="relative overflow-hidden rounded-3xl p-5 border border-white/10 bg-slate-900 flex items-center justify-between shadow-2xl">
          {/* Ambient light glow */}
          <div className="absolute top-0 left-0 w-24 h-24 bg-blue-500/10 rounded-full filter blur-xl ambient-glow-node" />

          <div className="text-left z-10">
            <p className="text-[8px] uppercase font-extrabold tracking-widest text-slate-500">Estimated Budget</p>
            <h3 className="text-xl font-extrabold text-teal-450 mt-1">
              ${totalEstPay.toFixed(2)}
            </h3>
            <p className="text-[8.5px] text-slate-400 mt-1 font-semibold">Based on rate (${currentShift.hourlyRate}/hr)</p>
          </div>

          <div className="h-10 border-l border-white/5 z-10" />

          <div className="text-right flex flex-col items-end z-10">
            <p className="text-[8px] uppercase font-extrabold tracking-widest text-slate-500">Allocations</p>
            <div className="flex items-center gap-1.5 mt-1 bg-slate-950 border border-white/5 px-2.5 py-1 rounded-lg">
              <Users className="w-3.5 h-3.5 text-teal-400" />
              <span className="text-[10px] font-extrabold text-white">
                {currentShift.workersConfirmedCount} / {currentShift.workersNeeded} Filled
              </span>
            </div>
            <p className="text-[8.5px] text-slate-400 mt-1 font-semibold">NPI verified only</p>
          </div>
        </div>

        {/* 3. Address & Instructions Section */}
        <div className="glass-card-dark rounded-3xl p-4.5 border border-white/5 shadow-xl flex flex-col gap-3">
          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-slate-900 border border-white/5 text-slate-400 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="text-left">
              <h4 className="text-[9.5px] font-extrabold uppercase tracking-wider text-slate-500">Clinic Address</h4>
              <p className="text-xs text-slate-200 font-bold mt-1 leading-relaxed">{currentShift.location}</p>
            </div>
          </div>

          {currentShift.notes && (
            <div className="border-t border-white/5 pt-3 mt-1.5 flex flex-col gap-2">
              <h4 className="text-[9.5px] font-extrabold uppercase tracking-wider text-slate-500 text-left">Special Instructions</h4>
              <div className="bg-slate-900/60 rounded-2xl p-3 border border-white/5 text-[10.5px] font-semibold text-slate-350 leading-relaxed whitespace-pre-line text-left">
                {currentShift.notes}
              </div>
            </div>
          )}
        </div>

        {/* 4. Assigned Worker Section */}
        <div className="flex flex-col gap-3">
          <h2 className="text-[10px] uppercase tracking-wider text-slate-500 font-extrabold text-left">
            Assigned Locum Staff
          </h2>
          
          {hasWorkers ? (
            <WorkerCard 
              worker={currentShift.assignedWorkers[0]} 
              onContact={handleContact}
            />
          ) : (
            <div className="glass-card-dark rounded-3xl p-6 text-center text-slate-500 font-bold text-xs flex flex-col items-center justify-center gap-2 select-none border border-white/5 shadow-2xl">
              <div className="w-8 h-8 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center text-slate-400">
                <Users className="w-4.5 h-4.5" />
              </div>
              <p>No worker assigned yet.</p>
              <p className="text-[9.5px] text-slate-500 font-semibold uppercase tracking-wider">System is checking matches...</p>
            </div>
          )}
        </div>

      </main>

      {/* Sticky Bottom Actions */}
      <div className="absolute bottom-[72px] left-0 right-0 px-4 py-3 bg-slate-950/80 border-t border-white/5 backdrop-blur-xl z-20 flex items-center gap-3">
        {shiftStatus !== 'Cancelled' && shiftStatus !== 'Completed' && (
          <>
            <button
              onClick={() => setShowConfirmCancel(true)}
              className="flex-1 py-3 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 text-rose-400 rounded-xl text-xs font-bold cursor-pointer transition-colors text-center"
            >
              Cancel Shift
            </button>

            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => setShowConfirmComplete(true)}
              className="flex-2 py-3 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white rounded-xl text-xs font-bold cursor-pointer shadow-lg shadow-blue-500/15 flex items-center justify-center gap-1.5"
            >
              <CheckCircle className="w-4 h-4 stroke-[2.5]" />
              <span>Mark Completed</span>
            </motion.button>
          </>
        )}

        {(shiftStatus === 'Cancelled' || shiftStatus === 'Completed') && (
          <button
            onClick={() => navigate('/')}
            className="w-full py-3 bg-slate-900 border border-white/5 hover:bg-slate-800 text-slate-350 rounded-xl text-xs font-bold cursor-pointer transition-colors text-center"
          >
            Back to Dashboard
          </button>
        )}
      </div>

      {/* Cancel Confirmation Prompt overlay */}
      <AnimatePresence>
        {showConfirmCancel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-6"
            onClick={() => setShowConfirmCancel(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              className="glass-card-dark rounded-[32px] p-5 shadow-2xl border border-white/10 flex flex-col gap-4 text-center max-w-xs"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-450 flex items-center justify-center mx-auto shadow-inner">
                <AlertTriangle className="w-6 h-6 animate-pulse" />
              </div>

              <div>
                <h3 className="font-extrabold text-[14px] text-white">Cancel locum shift?</h3>
                <p className="text-[10.5px] text-slate-450 font-bold mt-1.5 leading-relaxed">
                  Cancellation within 24 hours might trigger a standard admin review. Are you sure?
                </p>
              </div>

              <div className="flex items-center gap-2.5 mt-1">
                <button
                  onClick={() => setShowConfirmCancel(false)}
                  className="flex-1 py-2.5 bg-slate-900 border border-white/5 hover:bg-slate-800 text-slate-300 rounded-xl text-xs font-bold cursor-pointer"
                >
                  No, Keep
                </button>
                <button
                  onClick={handleCancelShift}
                  className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold cursor-pointer shadow-lg shadow-rose-500/15"
                >
                  Yes, Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Complete Confirmation Prompt overlay */}
      <AnimatePresence>
        {showConfirmComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-6"
            onClick={() => setShowConfirmComplete(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              className="glass-card-dark rounded-[32px] p-5 shadow-2xl border border-white/10 flex flex-col gap-4 text-center max-w-xs"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle className="w-6 h-6" />
              </div>

              <div>
                <h3 className="font-extrabold text-[14px] text-white">Mark Completed?</h3>
                <p className="text-[10.5px] text-slate-450 font-bold mt-1.5 leading-relaxed">
                  This confirms the worker finished hours. A timesheet will be generated for approval.
                </p>
              </div>

              <div className="flex items-center gap-2.5 mt-1">
                <button
                  onClick={() => setShowConfirmComplete(false)}
                  className="flex-1 py-2.5 bg-slate-900 border border-white/5 hover:bg-slate-800 text-slate-350 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCompleteShift}
                  className="flex-1 py-2.5 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white rounded-xl text-xs font-bold cursor-pointer shadow-lg"
                >
                  Confirm Done
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
