import React, { useState, useEffect, useRef } from 'react';
import { TimerState } from '../types';

const BrokenTimer: React.FC = () => {
  // Start with a "reasonable" fake release date (e.g., 6 months from now)
  const [targetDate, setTargetDate] = useState<Date>(() => {
    const d = new Date();
    d.setMonth(d.getMonth() + 6);
    return d;
  });

  const [timeLeft, setTimeLeft] = useState<TimerState>({ years: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [glitch, setGlitch] = useState(false);

  // The "Evil" Effect: Every second, push the date back by a random amount
  useEffect(() => {
    const interval = setInterval(() => {
      setTargetDate(prevDate => {
        const newDate = new Date(prevDate);
        // Add between 1 hour and 3 days every second
        const randomDelay = Math.floor(Math.random() * (259200000 - 3600000) + 3600000); 
        newDate.setTime(newDate.getTime() + randomDelay);
        return newDate;
      });
      
      // Trigger visual glitch occasionally
      if (Math.random() > 0.7) {
        setGlitch(true);
        setTimeout(() => setGlitch(false), 150);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Calculate difference for display
  useEffect(() => {
    const now = new Date();
    const diff = targetDate.getTime() - now.getTime();

    if (diff > 0) {
      const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
      const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ years, days, hours, minutes, seconds });
    }
  }, [targetDate]);

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-black/50 border-4 border-double border-yellow-700/50 rounded-xl backdrop-blur-sm shadow-2xl relative overflow-hidden">
      {/* Glitch Overlay */}
      {glitch && (
        <div className="absolute inset-0 bg-red-500/20 z-10 pointer-events-none mix-blend-overlay"></div>
      )}

      <h2 className="text-xl md:text-2xl text-yellow-500 medieval-font mb-6 tracking-widest uppercase">
        Time Until Release
      </h2>

      <div className={`grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8 text-center ${glitch ? 'translate-x-1' : ''}`}>
        <TimeUnit value={timeLeft.years} label="Years" color="text-red-500" />
        <TimeUnit value={timeLeft.days} label="Days" />
        <TimeUnit value={timeLeft.hours} label="Hours" />
        <TimeUnit value={timeLeft.minutes} label="Minutes" />
        <TimeUnit value={timeLeft.seconds} label="Seconds" />
      </div>

      <div className="mt-8 text-center">
        <p className="text-slate-400 text-sm uppercase tracking-widest mb-2">Target Launch Date</p>
        <p className={`text-xl md:text-3xl font-bold text-red-400 medieval-font ${glitch ? 'blur-[1px]' : ''}`}>
          {targetDate.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
        <p className="text-red-500/60 text-xs mt-1 animate-pulse">
          * Subject to change based on planetary alignment
        </p>
      </div>
    </div>
  );
};

const TimeUnit: React.FC<{ value: number; label: string; color?: string }> = ({ value, label, color = "text-white" }) => (
  <div className="flex flex-col bg-slate-900/80 p-4 rounded-lg border border-slate-700 min-w-[80px]">
    <span className={`text-3xl md:text-5xl font-black ${color} tabular-nums leading-none mb-2`}>
      {value.toString().padStart(2, '0')}
    </span>
    <span className="text-xs md:text-sm text-slate-500 font-bold uppercase tracking-wider">{label}</span>
  </div>
);

export default BrokenTimer;
