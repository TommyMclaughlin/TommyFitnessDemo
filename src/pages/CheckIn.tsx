import React, { useState, useEffect, useRef } from 'react';
import { api } from '../services/api';
import { Phone, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import logo from '../assets/MainLogo.png';

const CheckIn = () => {
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'expired' | 'not-found'>('idle');
  const [memberName, setMemberName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const audioCtxRef = useRef<AudioContext | null>(null);

  // Initialize or resume AudioContext
  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      audioCtxRef.current = new AudioContextClass();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  const playAudioEffect = (type: 'gong' | 'siren') => {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    if (type === 'gong') {
      // Create a rich gong sound using multiple oscillators
      const frequencies = [100, 150, 220, 310, 450];
      frequencies.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = i === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.9, now + 3);

        gain.gain.setValueAtTime(i === 0 ? 0.6 : 0.2 / i, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 3);
      });
    } else {
      // Create a classic wailing siren
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      // Wailing frequency sweep
      osc.frequency.setValueAtTime(300, now);
      for (let i = 0; i < 4; i++) {
        osc.frequency.exponentialRampToValueAtTime(800, now + (i * 0.8) + 0.4);
        osc.frequency.exponentialRampToValueAtTime(300, now + (i * 0.8) + 0.8);
      }

      gain.gain.setValueAtTime(0.1, now);
      gain.gain.linearRampToValueAtTime(0.1, now + 3.0);
      gain.gain.linearRampToValueAtTime(0, now + 3.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 3.2);
    }
  };

  useEffect(() => {
    // Keep focus on the input for easy entry
    const focusInterval = setInterval(() => {
      if (document.activeElement?.tagName !== 'INPUT') {
        inputRef.current?.focus();
      }
    }, 1000);
    return () => clearInterval(focusInterval);
  }, []);

  const handleCheckIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || status !== 'idle') return;

    setStatus('loading');
    try {
      const resp = await api.get(`/api/public/check-in?phone=${phone}`);
      const { name, isExpired } = resp.data;

      setMemberName(name);

      if (isExpired) {
        setStatus('expired');
        playAudioEffect('siren');
        setTimeout(reset, 5000);
      } else {
        setStatus('success');
        playAudioEffect('gong');
        setTimeout(reset, 5000);
      }
    } catch (err: any) {
      console.error("Check-in error:", err);
      setStatus(err.response?.status === 404 ? 'not-found' : 'idle');
      playAudioEffect('siren');
      setTimeout(reset, 5000);
    }
  };

  const reset = () => {
    setStatus('idle');
    setPhone('');
    setMemberName('');
    inputRef.current?.focus();
  };

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: status === 'success' ? '#dcfce7' :
        status === 'expired' ? '#fee2e2' :
          status === 'not-found' ? '#f3f4f6' : '#ffffff',
      transition: 'all 0.5s ease',
      overflow: 'hidden',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 9999
    }}>
      <div style={{ textAlign: 'center', maxWidth: '800px', width: '90%' }}>
        <img src={logo} alt="Tommy Fitness Logo" style={{ maxHeight: '250px', marginBottom: '3rem' }} />

        {status === 'idle' && (
          <>
            <h1 style={{ fontSize: '4rem', fontWeight: 900, marginBottom: '2rem', color: '#1a1a1a' }}>TOMMY FITNESS<br />
              CHECK-IN</h1>
            <p style={{ fontSize: '1.5rem', color: '#666', marginBottom: '3rem' }}>Please enter your phone number to enter</p>

            <form onSubmit={handleCheckIn}>
              <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
                <Phone size={48} style={{ position: 'absolute', left: '24px', top: '50%', transform: 'translateY(-50%)', color: '#ccc' }} />
                <input
                  ref={inputRef}
                  type="tel"
                  autoFocus
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="--- --- ----"
                  style={{
                    width: '100%',
                    padding: '30px 30px 30px 90px',
                    fontSize: '3.5rem',
                    borderRadius: '24px',
                    border: '4px solid #eee',
                    outline: 'none',
                    fontWeight: 700,
                    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
                    transition: 'border-color 0.2s'
                  }}
                  onBlur={() => inputRef.current?.focus()}
                />
              </div>
              <button type="submit" style={{ display: 'none' }}>Submit</button>
            </form>
          </>
        )}

        {status === 'loading' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
            <Loader2 size={120} className="animate-spin" color="var(--primary)" />
            <h2 style={{ fontSize: '3rem', fontWeight: 700 }}>Checking Status...</h2>
          </div>
        )}

        {status === 'success' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.5rem', animation: 'fadeIn 0.5s ease' }}>
            <div style={{ backgroundColor: '#22c55e', padding: '2rem', borderRadius: '50%' }}>
              <CheckCircle size={150} color="white" />
            </div>
            <h1 style={{ fontSize: '6rem', fontWeight: 900, color: '#14532d', margin: 0, textTransform: 'uppercase' }}>
              WELCOME!
            </h1>
            <h2 style={{ fontSize: '4.5rem', fontWeight: 800, color: '#166534' }}>
              {memberName}
            </h2>
            <p style={{ fontSize: '2rem', color: '#15803d', fontWeight: 600 }}>Enjoy your workout!</p>
          </div>
        )}

        {status === 'expired' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.5rem', animation: 'shake 0.5s ease' }}>
            <div style={{ backgroundColor: '#ef4444', padding: '2rem', borderRadius: '50%' }}>
              <XCircle size={150} color="white" />
            </div>
            <h1 style={{ fontSize: '5rem', fontWeight: 900, color: '#7f1d1d', margin: 0 }}>
              EXPIRED
            </h1>
            <h2 style={{ fontSize: '3.5rem', fontWeight: 800, color: '#991b1b' }}>
              {memberName}
            </h2>
            <p style={{ fontSize: '2rem', color: '#b91c1c', fontWeight: 600 }}>Please see front desk to renew.</p>
          </div>
        )}

        {status === 'not-found' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.5rem' }}>
            <div style={{ backgroundColor: '#6b7280', padding: '2rem', borderRadius: '50%' }}>
              <Phone size={150} color="white" />
            </div>
            <h1 style={{ fontSize: '5rem', fontWeight: 900, color: '#1f2937', margin: 0 }}>
              NOT FOUND
            </h1>
            <p style={{ fontSize: '2rem', color: '#374151', fontWeight: 600 }}>Member not found in system.</p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-20px); }
          75% { transform: translateX(20px); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default CheckIn;
