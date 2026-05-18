import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  UploadCloud, 
  CheckCircle2, 
  FileCheck2, 
  Users, 
  AlertCircle,
  FileText,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import AppHeader from '../components/AppHeader';
import BottomNavigation from '../components/BottomNavigation';

export default function Compliance({ org, theme, toggleTheme }) {
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // Mock list of required compliance items (US Standard)
  const [audits, setAudits] = useState([
    { id: 'aud-1', title: 'Holistic Board & State Licensure', description: 'Real-time American Wellness & State board credentials validation.', status: 'Compliant', date: 'Checked today' },
    { id: 'aud-2', title: 'OIG Background Clearance', description: 'Enhanced OIG exclusion checks and FBI-level background screening.', status: 'Compliant', date: 'Checked today' },
    { id: 'aud-3', title: 'Medical Malpractice Coverage', description: 'Professional medical malpractice insurance policies verifications.', status: 'Compliant', date: 'Checked 1 day ago' },
    { id: 'aud-4', title: 'Form I-9 Work Authorization', description: 'USCIS Form I-9 verification and work authorization validation.', status: 'Warning', date: 'Needs renewal' }
  ]);

  const handleUploadAudit = () => {
    setIsUploading(true);
    setToastMessage('Preparing secure document vault...');
    
    setTimeout(() => {
      setIsUploading(false);
      setToastMessage('Compliance audit document uploaded successfully!');
      setTimeout(() => setToastMessage(''), 3000);
    }, 2000);
  };

  return (
    <div className="flex-1 flex flex-col justify-between select-none relative bg-slate-950">
      
      {/* Top Navigation */}
      <AppHeader title="Compliance Audits" showBack={true} org={org} theme={theme} onThemeToggle={toggleTheme} />

      {/* Main compliance viewport */}
      <main className="flex-1 px-4 py-4 flex flex-col gap-4.5 overflow-y-auto no-scrollbar pb-32">
        
        {/* Toast warnings */}
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

        {/* 1. Score Gauge Hero Card */}
        <div className="relative overflow-hidden rounded-[32px] p-5 border border-white/5 bg-slate-900 flex items-center gap-5 shadow-2xl">
          {/* Accent light blob */}
          <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-500/10 rounded-full filter blur-xl ambient-glow-node" />

          {/* SVG Score Gauge Circle */}
          <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="40"
                cy="40"
                r="34"
                className="stroke-slate-950 fill-none"
                strokeWidth="7.5"
              />
              <circle
                cx="40"
                cy="40"
                r="34"
                className="stroke-teal-400 fill-none neon-glow-teal"
                strokeWidth="7.5"
                strokeDasharray="213.6"
                strokeDashoffset="12.8" // 94% dash offset
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-[14px] font-black text-white">98.4%</span>
              <span className="text-[7px] text-slate-500 font-extrabold uppercase">Score</span>
            </div>
          </div>

          <div className="flex-1 text-left z-10">
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-500">HIPAA / SOC-2 SECURE</span>
            </div>
            
            <h3 className="text-[13.5px] font-extrabold text-white mt-1.5">Fully Compliant</h3>
            <p className="text-[9.5px] text-slate-450 mt-1 font-semibold leading-normal">
              Your resort clinic is verified and authorized to book active US-licensed wellness practitioners.
            </p>
          </div>

        </div>

        {/* 2. Audit Requirements list */}
        <div className="flex flex-col gap-3">
          <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-slate-550 text-left px-1">
            Mandatory Rota Checks
          </h4>

          <div className="flex flex-col gap-3">
            {audits.map((item) => (
              <div 
                key={item.id}
                className="glass-card-dark rounded-[24px] p-4 border border-white/5 flex gap-3 text-left shadow-md"
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border mt-0.5 ${
                  item.status === 'Compliant' 
                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                    : 'bg-rose-500/10 border-rose-500/20 text-rose-450'
                }`}>
                  {item.status === 'Compliant' ? (
                    <FileCheck2 className="w-4.5 h-4.5 stroke-[2.5]" />
                  ) : (
                    <AlertCircle className="w-4.5 h-4.5 stroke-[2.5]" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-[12px] font-extrabold text-white truncate">{item.title}</h4>
                    <span className={`text-[8.5px] font-extrabold px-2 py-0.5 rounded-full border shrink-0 ${
                      item.status === 'Compliant' 
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                        : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  
                  <p className="text-[10px] text-slate-350 font-semibold mt-1 leading-normal">
                    {item.description}
                  </p>
                  
                  <p className="text-[8.5px] text-slate-500 font-bold mt-1.5 uppercase tracking-wide">
                    {item.date}
                  </p>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* 3. Secure Vault Upload Trigger */}
        <div className="glass-card-dark rounded-3xl p-5 border border-white/5 shadow-xl flex flex-col gap-4 text-center">
          <div className="w-12 h-12 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center text-slate-450 mx-auto">
            <UploadCloud className="w-6 h-6 stroke-[1.5]" />
          </div>

          <div>
            <h4 className="text-xs font-extrabold text-slate-200">Upload Audit Certificate</h4>
            <p className="text-[9px] text-slate-500 font-semibold mt-1 max-w-[240px] mx-auto leading-relaxed">
              Upload ADA board certifications, clinic state license documents, or background screening reviews to our encrypted HIPAA-compliant vault.
            </p>
          </div>

          <button
            onClick={handleUploadAudit}
            disabled={isUploading}
            className="py-2.5 w-full bg-slate-950 border border-white/5 hover:bg-slate-800 text-slate-300 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center justify-center gap-1.5"
          >
            {isUploading ? (
              <span className="w-3.5 h-3.5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Secure Upload Document</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>

      </main>

      {/* Sticky Bottom Nav */}
      <BottomNavigation />
    </div>
  );
}
