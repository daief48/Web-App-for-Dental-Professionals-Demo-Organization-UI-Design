import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PlusCircle, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  FileCheck2, 
  CheckCircle,
  HelpCircle,
  Loader2,
  Sparkles,
  ClipboardList
} from 'lucide-react';
import AppHeader from '../components/AppHeader';
import BottomNavigation from '../components/BottomNavigation';

export default function CreateShift({ shifts, addShift, org, theme, toggleTheme }) {
  const navigate = useNavigate();
  const [role, setRole] = useState('Zen Massage Therapist');
  const [date, setDate] = useState('2026-06-03');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [hourlyRate, setHourlyRate] = useState(35);
  const [location, setLocation] = useState('Miyabi Zen Sanctuary, Beverly Hills, CA 90210');
  const [workersNeeded, setWorkersNeeded] = useState(1);
  const [notes, setNotes] = useState('');
  
  // Document Requirements Checklist state
  const [requirements, setRequirements] = useState({
    dbs: true,
    registration: true,
    rightToWork: true,
    indemnity: false
  });

  const [estEarnings, setEstEarnings] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Auto-calculate estimated earnings
  useEffect(() => {
    try {
      const [sh, sm] = startTime.split(':').map(Number);
      const [eh, em] = endTime.split(':').map(Number);
      let diffHrs = eh + em / 60 - (sh + sm / 60);
      if (diffHrs < 0) diffHrs += 24; // Handle overnight shifts
      
      const total = diffHrs * hourlyRate * workersNeeded;
      setEstEarnings(isNaN(total) ? 0 : total);
    } catch (e) {
      setEstEarnings(0);
    }
  }, [startTime, endTime, hourlyRate, workersNeeded]);

  // Handle standard hourly rate auto-selection based on role
  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
    if (selectedRole === 'Mindfulness & Tea Master') setHourlyRate(145);
    else if (selectedRole === 'Zen Massage Therapist') setHourlyRate(35);
    else if (selectedRole === 'Aromatherapist & Aesthetician') setHourlyRate(26);
    else if (selectedRole === 'Zen Garden & Tea Host') setHourlyRate(20);
  };

  // Quick instructions injectors
  const injectInstruction = (template) => {
    setNotes((prev) => (prev ? `${prev}\n- ${template}` : `- ${template}`));
  };

  const handleToggleRequirement = (key) => {
    setRequirements(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handlePublish = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      // Create new shift object
      const formattedDateObj = new Date(date);
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      
      const dayName = days[formattedDateObj.getDay()];
      const dayNum = formattedDateObj.getDate();
      const monthName = months[formattedDateObj.getMonth()];
      const formattedDateString = `${dayName} ${dayNum} ${monthName}`;

      const newShift = {
        id: `shift-${Date.now()}`,
        role,
        date,
        formattedDate: formattedDateString,
        startTime,
        endTime,
        hourlyRate: Number(hourlyRate),
        location,
        workersNeeded: Number(workersNeeded),
        workersConfirmedCount: 0,
        status: 'Active',
        assignedWorkers: [],
        notes
      };

      addShift(newShift);
      setIsSubmitting(false);
      setShowSuccessModal(true);
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col justify-between select-none relative bg-slate-950">
      
      {/* Top Navigation */}
      <AppHeader title="Create Shift" showBack={true} org={org} theme={theme} onThemeToggle={toggleTheme} />

      {/* Rota Forms scroll container */}
      <main className="flex-1 px-4 py-4 flex flex-col gap-5 overflow-y-auto no-scrollbar pb-32">
        
        {/* Helper Instructions Badge */}
        <div className="bg-blue-500/5 border border-blue-500/10 rounded-2xl p-3.5 flex items-start gap-2.5">
          <HelpCircle className="w-5 h-5 text-blue-400 shrink-0 stroke-[2.5]" />
          <div className="text-left">
            <p className="text-xs font-extrabold text-white leading-tight">Publish a Locum Need</p>
            <p className="text-[10px] text-slate-400 font-semibold leading-relaxed mt-1">
              Fill in key requirements. Shifts are published instantly to verified wellness and spa practitioners in your area.
            </p>
          </div>
        </div>

        <form onSubmit={handlePublish} className="flex flex-col gap-4">
          
          {/* 1. ROLE / SERVICE SELECTION */}
          <div className="glass-card-dark rounded-2xl p-4.5 border border-white/5 shadow-xl flex flex-col gap-2">
            <label className="text-[9.5px] font-extrabold uppercase tracking-wider text-slate-450">
              Role / Service Needed
            </label>
            
            <div className="grid grid-cols-2 gap-2 mt-1">
              {[
                { name: 'Zen Massage Therapist', icon: '🌸' },
                { name: 'Mindfulness & Tea Master', icon: '🍵' },
                { name: 'Aromatherapist & Aesthetician', icon: '🍃' },
                { name: 'Zen Garden & Tea Host', icon: '🎋' }
              ].map((r) => (
                <button
                  key={r.name}
                  type="button"
                  onClick={() => handleRoleChange(r.name)}
                  className={`py-3 px-2 rounded-xl text-[10.5px] font-bold border transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
                    role === r.name
                      ? 'bg-blue-500/10 border-blue-500/30 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.15)]'
                      : 'bg-slate-900/60 border-white/5 text-slate-450 hover:bg-slate-800'
                  }`}
                >
                  <span className="text-sm leading-none">{r.icon}</span>
                  <span>{r.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. DATE AND TIMEPICKER SECTION */}
          <div className="glass-card-dark rounded-2xl p-4.5 border border-white/5 shadow-xl flex flex-col gap-3.5">
            
            <div className="flex flex-col gap-1.5">
              <label className="text-[9.5px] font-extrabold uppercase tracking-wider text-slate-450 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-500 stroke-[2.5]" />
                <span>Shift Date</span>
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-slate-900/60 border border-white/5 rounded-xl py-2.5 px-3 text-xs font-semibold focus:outline-none focus:border-blue-500 focus:bg-slate-900 transition-all text-slate-200 glow-input"
              />
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[9.5px] font-extrabold uppercase tracking-wider text-slate-450 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-500 stroke-[2.5]" />
                  <span>Start Time</span>
                </label>
                <input
                  type="time"
                  required
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full bg-slate-900/60 border border-white/5 rounded-xl py-2.5 px-3 text-xs font-semibold focus:outline-none focus:border-blue-500 focus:bg-slate-900 transition-all text-slate-200 glow-input"
                />
              </div>
              
              <div className="flex flex-col gap-1.5">
                <label className="text-[9.5px] font-extrabold uppercase tracking-wider text-slate-450 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-500 stroke-[2.5]" />
                  <span>End Time</span>
                </label>
                <input
                  type="time"
                  required
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full bg-slate-900/60 border border-white/5 rounded-xl py-2.5 px-3 text-xs font-semibold focus:outline-none focus:border-blue-500 focus:bg-slate-900 transition-all text-slate-200 glow-input"
                />
              </div>
            </div>
          </div>

          {/* 3. RATES, LOCATION, WORKERS NEEDED */}
          <div className="glass-card-dark rounded-2xl p-4.5 border border-white/5 shadow-xl flex flex-col gap-3.5">
            
            <div className="grid grid-cols-2 gap-3.5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[9.5px] font-extrabold uppercase tracking-wider text-slate-450">
                  Hourly Rate ($)
                </label>
                <input
                  type="number"
                  required
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="w-full bg-slate-900/60 border border-white/5 rounded-xl py-2.5 px-3 text-xs font-extrabold focus:outline-none focus:border-blue-500 focus:bg-slate-900 transition-all text-slate-200 glow-input"
                  placeholder="$"
                  min="5"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9.5px] font-extrabold uppercase tracking-wider text-slate-450 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-slate-500 stroke-[2.5]" />
                  <span>Workers Needed</span>
                </label>
                <input
                  type="number"
                  required
                  value={workersNeeded}
                  onChange={(e) => setWorkersNeeded(Number(e.target.value))}
                  className="w-full bg-slate-900/60 border border-white/5 rounded-xl py-2.5 px-3 text-xs font-extrabold focus:outline-none focus:border-blue-500 focus:bg-slate-900 transition-all text-slate-200 glow-input"
                  min="1"
                  max="10"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[9.5px] font-extrabold uppercase tracking-wider text-slate-450 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-500 stroke-[2.5]" />
                <span>Location / Address</span>
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-slate-900/60 border border-white/5 rounded-xl py-2.5 px-3 text-xs font-semibold focus:outline-none focus:border-blue-500 focus:bg-slate-900 transition-all text-slate-200 glow-input"
                placeholder="Full address of medical practice"
              />
            </div>
          </div>

          {/* 4. REQUIRED DOCUMENTS COMPLIANCE */}
          <div className="glass-card-dark rounded-2xl p-4.5 border border-white/5 shadow-xl flex flex-col gap-2.5">
            <label className="text-[9.5px] font-extrabold uppercase tracking-wider text-slate-450 flex items-center gap-1.5">
              <FileCheck2 className="w-3.5 h-3.5 text-slate-500 stroke-[2.5]" />
              <span>Required Compliance Checklist</span>
            </label>
            
            <div className="grid grid-cols-2 gap-2 mt-1">
              {[
                { key: 'dbs', name: 'Background Clearance' },
                { key: 'registration', name: 'ADA Board Licensure' },
                { key: 'rightToWork', name: 'Form I-9 Eligibility' },
                { key: 'indemnity', name: 'Malpractice Coverage' }
              ].map((doc) => {
                const checked = requirements[doc.key];
                return (
                  <button
                    key={doc.key}
                    type="button"
                    onClick={() => handleToggleRequirement(doc.key)}
                    className={`py-3 px-2 rounded-xl text-[9.5px] font-bold border transition-all text-left flex items-start gap-2 cursor-pointer ${
                      checked
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.1)]'
                        : 'bg-slate-900/60 border-white/5 text-slate-500 hover:bg-slate-800'
                    }`}
                  >
                    <div className={`w-3.5 h-3.5 rounded border mt-0.5 shrink-0 flex items-center justify-center ${
                      checked ? 'bg-emerald-500 border-transparent text-white' : 'border-slate-700'
                    }`}>
                      {checked && <span className="text-[8px] leading-none font-bold">✓</span>}
                    </div>
                    <span>{doc.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. NOTES AND SPECIAL INSTRUCTIONS SECTION */}
          <div className="glass-card-dark rounded-2xl p-4.5 border border-white/5 shadow-xl flex flex-col gap-3">
            <label className="text-[9.5px] font-extrabold uppercase tracking-wider text-slate-450 flex items-center gap-1.5">
              <ClipboardList className="w-3.5 h-3.5 text-slate-500 stroke-[2.5]" />
              <span>Special Instructions for Workers</span>
            </label>
            
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-slate-900/60 border border-white/5 rounded-xl p-3 text-xs font-semibold focus:outline-none focus:border-blue-500 focus:bg-slate-900 transition-all text-slate-200 glow-input min-h-[90px]"
              placeholder="Any special requirements or instructions for workers..."
            />

            {/* Quick Template Injectors */}
            <div className="flex flex-wrap gap-1.5 mt-1 border-t border-white/5 pt-2.5">
              {[
                'Please arrive 15 minutes early',
                'Bring full uniform',
                'Reception check-in required',
                'Parking available at rear'
              ].map((template) => (
                <button
                  key={template}
                  type="button"
                  onClick={() => injectInstruction(template)}
                  className="text-[8.5px] font-extrabold bg-slate-900 border border-white/5 hover:bg-slate-800 text-slate-400 px-2.5 py-1 rounded-lg cursor-pointer transition-colors"
                >
                  + {template.split(' ')[1]}...
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Gross Pay Calculator Display */}
          <div className="relative overflow-hidden rounded-3xl p-5 border border-white/10 bg-slate-900 flex items-center justify-between shadow-2xl mt-1.5">
            {/* Ambient background blob */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/10 rounded-full filter blur-xl ambient-glow-node" />
            
            <div className="text-left z-10">
              <p className="text-[8px] uppercase font-extrabold tracking-widest text-slate-500">Total Budget</p>
              <h4 className="text-lg font-extrabold text-teal-400 mt-1">
                ${estEarnings.toFixed(2)}
              </h4>
            </div>
            
            <div className="text-right text-[9.5px] text-slate-400 font-bold leading-tight z-10">
              <p>Rate: ${hourlyRate}/hr</p>
              <p className="mt-1">Workers: {workersNeeded}</p>
            </div>
          </div>

          {/* Form Actions (Sticky container handles this) */}
          <div className="mt-2" />

        </form>

      </main>

      {/* Sticky Bottom Actions Bezel */}
      <div className="absolute bottom-[72px] left-0 right-0 px-4 py-3 bg-slate-950/80 border-t border-white/5 backdrop-blur-xl z-20 flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="flex-1 py-3 bg-slate-900 border border-white/5 hover:bg-slate-800 text-slate-300 rounded-xl text-xs font-bold cursor-pointer transition-colors text-center"
        >
          Cancel
        </button>

        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={handlePublish}
          disabled={isSubmitting}
          className="flex-2 py-3 bg-gradient-to-r from-rose-500 to-teal-500 hover:from-rose-600 hover:to-teal-600 text-white rounded-xl text-xs font-bold cursor-pointer shadow-lg shadow-rose-500/15 flex items-center justify-center gap-1.5 disabled:opacity-75"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Publishing...</span>
            </>
          ) : (
            <>
              <PlusCircle className="w-4 h-4 stroke-[2.5]" />
              <span>Publish Shift</span>
            </>
          )}
        </motion.button>
      </div>

      {/* Confetti Success Overlay Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.85, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              className="glass-card-dark rounded-[32px] p-6 shadow-2xl border border-white/10 flex flex-col gap-4 text-center max-w-sm"
            >
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-inner relative">
                <CheckCircle className="w-8 h-8 stroke-[2.5]" />
                <Sparkles className="w-4.5 h-4.5 text-blue-400 absolute -top-1 -right-1 animate-bounce" />
              </div>

              <div>
                <h3 className="font-extrabold text-base text-white">Shift Published!</h3>
                <p className="text-[11px] text-slate-450 font-bold mt-1.5 leading-relaxed">
                  The locum booking was registered. Staff matches are being checked in real-time.
                </p>
              </div>

              <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-3.5 text-left flex flex-col gap-1.5 text-[11px] text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-450 font-bold">Service</span>
                  <span className="font-extrabold">{role}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-450 font-bold">Hourly Rate</span>
                  <span className="font-extrabold">${hourlyRate}/hr</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-450 font-bold">Date</span>
                  <span className="font-extrabold">{new Date(date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}</span>
                </div>
              </div>

              <button 
                onClick={() => {
                  setShowSuccessModal(false);
                  navigate('/');
                }}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-500/15 cursor-pointer"
              >
                Return to Dashboard
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Bottom Nav */}
      <BottomNavigation />
    </div>
  );
}
