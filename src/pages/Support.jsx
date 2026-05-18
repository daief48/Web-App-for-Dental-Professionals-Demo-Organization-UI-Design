import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircleQuestion, 
  Mail, 
  Phone, 
  Send, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle,
  HelpCircle,
  ShieldAlert
} from 'lucide-react';
import AppHeader from '../components/AppHeader';
import BottomNavigation from '../components/BottomNavigation';

export default function Support({ org, theme, toggleTheme }) {
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState('');
  const [ticketText, setTicketText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // State for active FAQ accordions
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    {
      id: 'faq-1',
      question: 'How do I cancel a published locum shift?',
      answer: 'Navigate to the shift details page from your Dashboard, click "Cancel Shift", and confirm. Shifts cancelled within 24 hours of starting may trigger an administrative review.'
    },
    {
      id: 'faq-2',
      question: 'What is the HIPAA and SOC-2 standard?',
      answer: 'Locum Connect employs strict HIPAA compliant data standard protocols, matching only NPI active registrants who have cleared FBI-level background screening and hold active professional malpractice insurance policies.'
    },
    {
      id: 'faq-3',
      question: 'When are timesheets processed?',
      answer: 'Locums submit timesheets immediately upon completing their hours. Once you review and click "Approve & Release", funds are transferred securely to the worker via standard bank settlement.'
    },
    {
      id: 'faq-4',
      question: 'How do I top up my wallet?',
      answer: 'Go to the "Billing & Invoices" page from your Profile. Click "Top Up Wallet", choose your Stripe deposit amount, and click confirm to credit funds instantly.'
    }
  ];

  const handleToggleFaq = (id) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  const handleSubmitTicket = (e) => {
    e.preventDefault();
    if (!ticketText.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setTicketText('');
      setToastMessage('Support ticket submitted successfully!');
      setTimeout(() => setToastMessage(''), 3000);
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col justify-between select-none relative bg-slate-950">
      
      {/* Page Header */}
      <AppHeader title="Help & Support" showBack={true} org={org} theme={theme} onThemeToggle={toggleTheme} />

      {/* Main Support scroll layout */}
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
              <CheckCircle className="w-4.5 h-4.5" />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 1. Hotlines card */}
        <div className="glass-card-dark rounded-3xl p-5 border border-white/5 shadow-xl flex flex-col gap-4 text-left">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-400" />
            <h3 className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
              Direct Contact Lines
            </h3>
          </div>

          <div className="flex flex-col gap-3.5 mt-1.5 text-xs text-slate-350">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[8.5px] uppercase font-extrabold text-slate-550">Support Email</p>
                <p className="font-extrabold text-white mt-0.5">support@apexclinical.com</p>
              </div>
            </div>

            <div className="flex items-center gap-3 border-t border-white/5 pt-3.5">
              <div className="w-8 h-8 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center text-slate-400">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[8.5px] uppercase font-extrabold text-slate-550">Emergency Phone</p>
                <p className="font-extrabold text-white mt-0.5">+1 (800) 555-0198</p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Interactive FAQ Accordions */}
        <div className="flex flex-col gap-3">
          <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-slate-550 text-left px-1">
            Frequently Asked Questions
          </h4>

          <div className="flex flex-col gap-2.5">
            {faqs.map((faq) => {
              const isOpen = activeFaq === faq.id;
              return (
                <div 
                  key={faq.id}
                  className="glass-card-dark rounded-2xl border border-white/5 overflow-hidden transition-all shadow-md"
                >
                  <button
                    onClick={() => handleToggleFaq(faq.id)}
                    className="w-full p-4 flex items-center justify-between text-left cursor-pointer hover:bg-white/5 transition-colors"
                  >
                    <span className="text-[11.5px] font-extrabold text-slate-200 pr-4 leading-snug">
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-blue-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                    )}
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-4 pb-4.5 pt-1.5 text-[10.5px] font-semibold text-slate-400 border-t border-white/5 bg-slate-900/40 leading-relaxed text-left">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Submit support ticket */}
        <div className="glass-card-dark rounded-3xl p-5 border border-white/5 shadow-xl flex flex-col gap-4 text-left">
          <div className="flex items-center gap-2">
            <MessageCircleQuestion className="w-5 h-5 text-purple-400" />
            <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-slate-550">
              Submit Help Ticket
            </h4>
          </div>

          <form onSubmit={handleSubmitTicket} className="flex flex-col gap-3.5 mt-1.5">
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] font-extrabold uppercase text-slate-550">Describe your issue</label>
              <textarea
                required
                value={ticketText}
                onChange={(e) => setTicketText(e.target.value)}
                className="w-full bg-slate-950 border border-white/5 rounded-xl p-3 text-xs font-bold text-slate-200 focus:outline-none focus:border-blue-500 focus:bg-slate-950 transition-all glow-input min-h-[85px] leading-relaxed"
                placeholder="Briefly explain your concern or questions. Support response standard is 15 minutes..."
              />
            </div>

            <motion.button
              whileTap={{ scale: 0.96 }}
              type="submit"
              disabled={isSubmitting || !ticketText.trim()}
              className="py-2.5 w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white rounded-xl text-xs font-bold cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1.5 shadow-lg"
            >
              {isSubmitting ? (
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Submit Ticket</span>
                </>
              )}
            </motion.button>
          </form>
        </div>

      </main>

      {/* Sticky Bottom Nav */}
      <BottomNavigation />
    </div>
  );
}
