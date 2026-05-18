import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MobileLayout from './components/MobileLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreateShift from './pages/CreateShift';
import ShiftDetails from './pages/ShiftDetails';
import TimesheetApproval from './pages/TimesheetApproval';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import Billing from './pages/Billing';
import Compliance from './pages/Compliance';
import Support from './pages/Support';

export default function App() {
  // Initial Mock Wellness Organisation (US-Japan Zen Theme)
  const [org, setOrg] = useState({
    name: 'Miyabi Zen Wellness Group',
    code: 'ZEN-90210',
    email: 'concierge@miyabizen.com',
    address: '90210 Wilshire Blvd, Beverly Hills, CA 90210',
    logo: '🌸',
    balance: 4850.00
  });

  // Mock notifications database state (US-Japan Zen Standard)
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      type: 'timesheet',
      title: 'Timesheet Pending',
      message: 'Sarah Johnson submitted hours for Saturday 30 May.',
      time: '2 hours ago',
      read: false,
      link: '/timesheet/timesheet-1'
    },
    {
      id: 'notif-2',
      type: 'shift',
      title: 'Therapist Applied',
      message: 'John Miller applied for Mindfulness & Tea Master shift on Sun 31 May.',
      time: '5 hours ago',
      read: false,
      link: '/shift/shift-2'
    },
    {
      id: 'notif-3',
      type: 'wallet',
      title: 'Wallet Balance Deduction',
      message: 'Approved timesheet payment of $665.00 completed successfully.',
      time: '1 day ago',
      read: false,
      link: '/'
    },
    {
      id: 'notif-4',
      type: 'system',
      title: 'Credentials Verified',
      message: 'US Board Certification & State License for Sarah Johnson verified.',
      time: '2 days ago',
      read: true,
      link: '/profile'
    }
  ]);

  // Compute unread notifications dynamically
  const orgWithCount = {
    ...org,
    notificationsCount: notifications.filter(n => !n.read).length
  };

  // Initial shifts list for US-Japan Luxury Zen Resorts & Wellness Spas
  const [shifts, setShifts] = useState([
    {
      id: 'shift-1',
      role: 'Zen Massage Therapist',
      date: '2026-05-30',
      formattedDate: 'Sat 30 May',
      startTime: '08:30',
      endTime: '17:00',
      hourlyRate: 35,
      location: 'Manhattan Zen Garden Retreat, New York, NY 10016',
      workersNeeded: 2,
      workersConfirmedCount: 1,
      status: 'Active',
      assignedWorkers: [
        {
          id: 'worker-1',
          name: 'Sarah Johnson',
          role: 'Zen Massage Therapist',
          gdcNumber: 'NPI #1982736452',
          rating: 4.9,
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
          complianceVerified: true,
        }
      ],
      notes: 'Please arrive 15 minutes early. Wear premium sand-tone linen uniform. Front reception guest check-in. Parking validated at structure B.'
    },
    {
      id: 'shift-2',
      role: 'Mindfulness & Tea Master',
      date: '2026-05-31',
      formattedDate: 'Sun 31 May',
      startTime: '09:00',
      endTime: '17:30',
      hourlyRate: 145,
      location: 'Beverly Hills Bamboo Sanctuary, Beverly Hills, CA 90210',
      workersNeeded: 1,
      workersConfirmedCount: 1,
      status: 'Filled',
      assignedWorkers: [
        {
          id: 'worker-1',
          name: 'Sarah Johnson',
          role: 'Mindfulness & Tea Master',
          gdcNumber: 'NPI #1982736452',
          rating: 4.9,
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
          complianceVerified: true,
        }
      ],
      notes: 'Bring standard organic matcha whisk (Chasen) and tea ceramic tools. Deep knowledge of Japanese tea traditions and US mindfulness coaching required.'
    },
    {
      id: 'shift-3',
      role: 'Aromatherapist & Aesthetician',
      date: '2026-06-01',
      formattedDate: 'Mon 1 Jun',
      startTime: '20:00',
      endTime: '08:00',
      hourlyRate: 26,
      location: 'Boston Matcha Tea House, Boston, MA 02115',
      workersNeeded: 1,
      workersConfirmedCount: 0,
      status: 'Active',
      assignedWorkers: [],
      notes: 'Evening spa relaxation therapy oversight. Guide aromatherapy sessions, premium lotion preparations, and candle room safety monitoring.'
    },
    {
      id: 'shift-4',
      role: 'Zen Garden & Tea Host',
      date: '2026-06-02',
      formattedDate: 'Tue 2 Jun',
      startTime: '06:00',
      endTime: '10:00',
      hourlyRate: 20,
      location: 'Chicago Onsen & Thermal Baths, Chicago, IL 60611',
      workersNeeded: 1,
      workersConfirmedCount: 0,
      status: 'Active',
      assignedWorkers: [],
      notes: 'Morning stone pathway raking, organic matcha station replenishment, clean organic towels arrangement. Premium hospitality.'
    },
    {
      id: 'shift-5',
      role: 'Organic Skincare Specialist',
      date: '2026-06-03',
      formattedDate: 'Wed 3 Jun',
      startTime: '09:00',
      endTime: '17:00',
      hourlyRate: 55,
      location: 'Dallas Sakura Aesthetic Spa, Dallas, TX 75201',
      workersNeeded: 1,
      workersConfirmedCount: 0,
      status: 'Active',
      assignedWorkers: [],
      notes: 'Facial massage, clay mask preparation, and skin analysis list. Coordinate digital client logs. Zensoft software pre-loaded.'
    },
    {
      id: 'shift-6',
      role: 'Spa Experience Coordinator',
      date: '2026-06-04',
      formattedDate: 'Thu 4 Jun',
      startTime: '08:00',
      endTime: '16:30',
      hourlyRate: 40,
      location: 'Miyabi Zen Sanctuary, Beverly Hills, CA 90210',
      workersNeeded: 1,
      workersConfirmedCount: 0,
      status: 'Active',
      assignedWorkers: [],
      notes: 'Scheduling guest sessions, organic oil supply logistics, premium compliance license filings audits.'
    },
    {
      id: 'shift-7',
      role: 'Zen Massage Therapist',
      date: '2026-06-05',
      formattedDate: 'Fri 5 Jun',
      startTime: '08:30',
      endTime: '17:00',
      hourlyRate: 35,
      location: 'Manhattan Zen Garden Retreat, New York, NY 10016',
      workersNeeded: 1,
      workersConfirmedCount: 1,
      status: 'Filled',
      assignedWorkers: [
        {
          id: 'worker-2',
          name: 'John Miller',
          role: 'Zen Massage Therapist',
          gdcNumber: 'NPI #1209384756',
          rating: 4.8,
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
          complianceVerified: true,
        }
      ],
      notes: 'Premium hot stone therapy for couples retreat. Linen scrubs will be provided. Organic lunch catering included.'
    },
    {
      id: 'shift-8',
      role: 'Mindfulness & Tea Master',
      date: '2026-06-06',
      formattedDate: 'Sat 6 Jun',
      startTime: '09:00',
      endTime: '15:00',
      hourlyRate: 145,
      location: 'Beverly Hills Bamboo Sanctuary, Beverly Hills, CA 90210',
      workersNeeded: 1,
      workersConfirmedCount: 0,
      status: 'Active',
      assignedWorkers: [],
      notes: 'Saturday walk-in sound bath and meditation session guide. Active meditation coaching license required.'
    },
    {
      id: 'shift-9',
      role: 'Zen Guest Experience Host',
      date: '2026-06-07',
      formattedDate: 'Sun 7 Jun',
      startTime: '10:00',
      endTime: '16:00',
      hourlyRate: 24,
      location: 'Dallas Sakura Aesthetic Spa, Dallas, TX 75201',
      workersNeeded: 1,
      workersConfirmedCount: 0,
      status: 'Active',
      assignedWorkers: [],
      notes: 'Welcome premium guests, verify reservation passes, process luxury spa wellness packages. High elegance and phone courtesy.'
    },
    {
      id: 'shift-10',
      role: 'Aromatherapist & Aesthetician',
      date: '2026-06-08',
      formattedDate: 'Mon 8 Jun',
      startTime: '08:00',
      endTime: '20:00',
      hourlyRate: 26,
      location: 'Boston Matcha Tea House, Boston, MA 02115',
      workersNeeded: 2,
      workersConfirmedCount: 0,
      status: 'Active',
      assignedWorkers: [],
      notes: 'Conduct essential oil skin trials, custom botanical oil blend selections, client skincare charting. HIPAA privacy training.'
    },
    {
      id: 'shift-11',
      role: 'Organic Skincare Specialist',
      date: '2026-06-09',
      formattedDate: 'Tue 9 Jun',
      startTime: '09:00',
      endTime: '13:00',
      hourlyRate: 55,
      location: 'Miyabi Zen Sanctuary, Beverly Hills, CA 90210',
      workersNeeded: 1,
      workersConfirmedCount: 1,
      status: 'Filled',
      assignedWorkers: [
        {
          id: 'worker-2',
          name: 'John Miller',
          role: 'Organic Skincare Specialist',
          gdcNumber: 'NPI #1209384756',
          rating: 4.8,
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
          complianceVerified: true,
        }
      ],
      notes: 'Morning shift. Rapid recall periodontal checks and routine children cleanings list.'
    },
    {
      id: 'shift-12',
      role: 'Zen Massage Therapist',
      date: '2026-06-10',
      formattedDate: 'Wed 10 Jun',
      startTime: '13:00',
      endTime: '21:00',
      hourlyRate: 38,
      location: 'Manhattan Zen Garden Retreat, New York, NY 10016',
      workersNeeded: 1,
      workersConfirmedCount: 0,
      status: 'Active',
      assignedWorkers: [],
      notes: 'Late evening massage shift. Deep tissue bodywork, hot stone setups, and end-of-day tatami cleanup checklist.'
    }
  ]);

  // Initial bank timesheets for verification (US-Japan Zen Standard)
  const [timesheets, setTimesheets] = useState([
    {
      id: 'timesheet-1',
      worker: {
        name: 'Sarah Johnson',
        role: 'Zen Massage Therapist',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
        gdcNumber: 'NPI #1982736452'
      },
      role: 'Zen Massage Therapist',
      shiftDate: 'Sat 30 May',
      startTime: '08:30',
      endTime: '17:00',
      breakDuration: '30 mins',
      totalHours: 8.0,
      hourlyRate: 35,
      grossPay: 280.00,
      status: 'Pending Approval',
      workerNotes: 'Hot stone therapy completed. Excellent guest feedback and all stone warmers safely disinfected.'
    },
    {
      id: 'timesheet-2',
      worker: {
        name: 'John Miller',
        role: 'Mindfulness & Tea Master',
        avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200',
        gdcNumber: 'NPI #1209384756'
      },
      role: 'Mindfulness & Tea Master',
      shiftDate: 'Fri 29 May',
      startTime: '09:00',
      endTime: '17:00',
      breakDuration: '60 mins',
      totalHours: 7.0,
      hourlyRate: 145,
      grossPay: 1015.00,
      status: 'Approved',
      workerNotes: 'Zen meditation and tea ceremony session completed with maximum attendance. Peaceful guest experience.'
    }
  ]);

  // Theme switching state
  const [theme, setTheme] = useState('dark');
  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  // Authentication guard state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Append new shift published
  const addShift = (newShift) => {
    setShifts((prev) => [newShift, ...prev]);
  };

  return (
    <Router>
      <MobileLayout org={orgWithCount} theme={theme}>
        <Routes>
          <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
          <Route path="/" element={isLoggedIn ? <Dashboard shifts={shifts} timesheets={timesheets} org={orgWithCount} theme={theme} toggleTheme={toggleTheme} /> : <Navigate to="/login" replace />} />
          <Route path="/create-shift" element={isLoggedIn ? <CreateShift shifts={shifts} addShift={addShift} org={orgWithCount} theme={theme} toggleTheme={toggleTheme} /> : <Navigate to="/login" replace />} />
          <Route path="/shift/:id" element={isLoggedIn ? <ShiftDetails shifts={shifts} setShifts={setShifts} org={orgWithCount} theme={theme} toggleTheme={toggleTheme} /> : <Navigate to="/login" replace />} />
          <Route path="/timesheet/:id" element={isLoggedIn ? <TimesheetApproval timesheets={timesheets} setTimesheets={setTimesheets} org={orgWithCount} setOrg={setOrg} theme={theme} toggleTheme={toggleTheme} /> : <Navigate to="/login" replace />} />
          <Route path="/profile" element={isLoggedIn ? <Profile org={orgWithCount} setOrg={setOrg} theme={theme} toggleTheme={toggleTheme} onLogout={() => setIsLoggedIn(false)} /> : <Navigate to="/login" replace />} />
          <Route path="/notifications" element={isLoggedIn ? <Notifications notifications={notifications} setNotifications={setNotifications} org={orgWithCount} theme={theme} toggleTheme={toggleTheme} /> : <Navigate to="/login" replace />} />
          <Route path="/settings" element={isLoggedIn ? <Settings org={orgWithCount} setOrg={setOrg} theme={theme} toggleTheme={toggleTheme} /> : <Navigate to="/login" replace />} />
          <Route path="/billing" element={isLoggedIn ? <Billing org={orgWithCount} setOrg={setOrg} theme={theme} toggleTheme={toggleTheme} /> : <Navigate to="/login" replace />} />
          <Route path="/compliance" element={isLoggedIn ? <Compliance org={orgWithCount} theme={theme} toggleTheme={toggleTheme} /> : <Navigate to="/login" replace />} />
          <Route path="/support" element={isLoggedIn ? <Support org={orgWithCount} theme={theme} toggleTheme={toggleTheme} /> : <Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MobileLayout>
    </Router>
  );
}
