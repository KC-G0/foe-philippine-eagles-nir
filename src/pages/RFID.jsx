// src/pages/RFID.jsx
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function RFID() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [error, setError] = useState(null);
  const [checkins, setCheckins] = useState([]);
  const [tapAnimation, setTapAnimation] = useState(false);
  const [lastTap, setLastTap] = useState(null);
  const hiddenInputRef = useRef(null);
  const tapTimeoutRef = useRef(null);

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login-page', { state: { from: '/rfid-page' } });
    }
  }, [user, authLoading, navigate]);

  // Focus hidden input on mount (for USB HID reader)
  useEffect(() => {
    if (hiddenInputRef.current) {
      hiddenInputRef.current.focus();
    }
  }, []);

  // Load recent check-ins
  const loadCheckins = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/rfid/checkins`, { credentials: 'include' });
      const data = await res.json();
      setCheckins(data.checkins || []);
    } catch (err) {
      console.error('Failed to load checkins:', err);
    }
  };

  useEffect(() => {
    if (user) {
      loadCheckins();
    }
  }, [user]);

  // Handle RFID tap (from USB HID reader or manual input)
  const handleTap = async (rfidTag) => {
    if (!rfidTag || !rfidTag.trim()) return;

    setError(null);
    setTapAnimation(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/rfid/tap`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ rfidTagId: rfidTag.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Tap failed');
        setMember(null);
      } else {
        setMember(data.member);
        setLastTap({
          name: data.member.name,
          role: data.member.role,
          time: new Date().toLocaleTimeString(),
        });
        loadCheckins(); // Refresh list
      }
    } catch (err) {
      setError('Network error — try again');
      setMember(null);
    }

    // Clear after delay
    tapTimeoutRef.current = setTimeout(() => {
      setTapAnimation(false);
      setMember(null);
      setError(null);
    }, 5000);
  };

  // Handle hidden input change (USB HID reader types here)
  const handleHiddenInputChange = (e) => {
    const value = e.target.value;
    if (value.length >= 6) {
      // Most RFID tags are 8-10 characters
      handleTap(value);
      e.target.value = ''; // Reset for next tap
    }
  };

  // Handle manual input
  const handleManualSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const tag = formData.get('rfidTag');
    handleTap(tag);
    e.target.reset();
  };

  // Focus handler — keep focus on hidden input
  const handleContainerClick = () => {
    if (hiddenInputRef.current) {
      hiddenInputRef.current.focus();
    }
  };

  if (authLoading) {
    return <div className="py-20 text-center text-white/60">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="py-8 px-4 min-h-screen relative">
      {/* Background accent */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gold-500 blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto">
        <motion.h1
          className="text-4xl font-bold text-gold-500 mb-2 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          RFID Kiosk
        </motion.h1>
        <motion.p
          className="text-white/60 mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Tap your RFID card to check in
        </motion.p>

        {/* Hidden input for USB HID reader */}
        <input
          ref={hiddenInputRef}
          type="text"
          className="absolute opacity-0 pointer-events-none w-0 h-0"
          onChange={handleHiddenInputChange}
          autoFocus
          aria-hidden="true"
        />

        {/* Tap Area */}
        <div
          onClick={handleContainerClick}
          className={`relative cursor-pointer rounded-2xl border-4 border-dashed p-12 text-center transition-all duration-300 ${
            tapAnimation && member
              ? 'border-green-400 bg-green-500/10'
              : tapAnimation && error
              ? 'border-red-400 bg-red-500/10'
              : 'border-gold-500/50 bg-navy-600/30 hover:border-gold-500'
          }`}
        >
          <AnimatePresence mode="wait">
            {member ? (
              <motion.div
                key="member"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="space-y-4"
              >
                <div className="text-6xl">✓</div>
                <div className="text-3xl font-bold text-gold-500">{member.name}</div>
                <div className="text-xl text-white/80">{member.role}</div>
                <div className="text-sm text-white/50">
                  Checked in at {new Date().toLocaleTimeString()}
                </div>
              </motion.div>
            ) : error ? (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="space-y-4"
              >
                <div className="text-6xl text-red-400">✗</div>
                <div className="text-2xl font-bold text-red-400">{error}</div>
                <div className="text-sm text-white/50">Try again or use manual entry</div>
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="space-y-4"
              >
                <div className="text-6xl text-gold-500">📡</div>
                <div className="text-2xl font-bold text-white/80">Tap RFID Card</div>
                <div className="text-sm text-white/50">
                  Hold your RFID card near the reader
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Manual Entry (for testing or as fallback) */}
        <div className="mt-8 glass-panel p-6">
          <h2 className="text-lg font-bold text-gold-500 mb-4">Manual Entry (Testing)</h2>
          <form onSubmit={handleManualSubmit} className="flex gap-4">
            <input
              type="text"
              name="rfidTag"
              placeholder="Enter RFID tag ID..."
              className="input-field flex-1"
              autoComplete="off"
            />
            <button type="submit" className="btn-gold">
              Submit Tap
            </button>
          </form>
          {lastTap && (
            <div className="mt-4 p-3 bg-white/5 rounded-lg text-sm">
              <span className="text-white/50">Last tap:</span>{' '}
              <span className="text-gold-500 font-medium">{lastTap.name}</span>{' '}
              <span className="text-white/40">at {lastTap.time}</span>
            </div>
          )}
        </div>

        {/* Hardware Info */}
        <div className="mt-8 glass-panel p-6">
          <h2 className="text-lg font-bold text-gold-500 mb-4">Hardware Integration</h2>
          <div className="space-y-3 text-white/70 text-sm">
            <p>
              <strong className="text-gold-500">USB HID Reader:</strong> Plug in a USB RFID reader
              that acts as keyboard input. The system automatically captures the tag ID.
            </p>
            <p>
              <strong className="text-gold-500">Serial/RS-232:</strong> For serial readers, a small
              client-side script reads the serial port and sends the tag ID to{' '}
              <code className="bg-white/10 px-1 rounded">/api/rfid/tap</code>.
            </p>
            <p>
              <strong className="text-gold-500">Endpoint:</strong>{' '}
              <code className="bg-white/10 px-1 rounded">POST /api/rfid/tap</code> with{' '}
              <code className="bg-white/10 px-1 rounded">{`{ "rfidTagId": "..." }`}</code>
            </p>
          </div>
        </div>

        {/* Recent Check-ins */}
        {checkins.length > 0 && (
          <div className="mt-8 glass-panel p-6">
            <h2 className="text-lg font-bold text-gold-500 mb-4">Recent Check-ins</h2>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {checkins.map((checkin) => (
                <div
                  key={checkin.id}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                >
                  <div>
                    <div className="text-white font-medium">{checkin.user.name}</div>
                    <div className="text-white/50 text-sm">{checkin.user.role}</div>
                  </div>
                  <div className="text-white/40 text-sm">
                    {new Date(checkin.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
