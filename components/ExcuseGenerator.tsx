import React, { useState } from 'react';
import { generateExcuse } from '../services/geminiService';

const ExcuseGenerator: React.FC = () => {
  const [excuse, setExcuse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGetExcuse = async () => {
    if (loading) return;
    setLoading(true);
    setExcuse(null);
    const newExcuse = await generateExcuse();
    setExcuse(newExcuse);
    setLoading(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-12 text-center">
      <div className="bg-slate-900 border border-slate-700 p-6 rounded-lg shadow-lg relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-950 px-4 py-1 border border-slate-700 rounded-full">
           <span className="text-yellow-600 text-xs font-bold uppercase tracking-widest">Developer Update</span>
        </div>

        <p className="text-slate-300 italic text-lg md:text-xl min-h-[80px] flex items-center justify-center">
          {loading ? (
             <span className="animate-pulse text-yellow-500">Consulting the Elder Gods...</span>
          ) : excuse ? (
            `"${excuse}"`
          ) : (
            "Click below to find out why it's delayed this time."
          )}
        </p>

        <div className="mt-6">
          <button
            onClick={handleGetExcuse}
            disabled={loading}
            className="group relative inline-flex items-center justify-center px-8 py-3 font-bold text-white transition-all duration-200 bg-red-700 font-lg rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 hover:bg-red-600 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Pinging Server...' : 'Ping Development Team'}
            <div className="absolute -inset-3 rounded-full bg-red-400 opacity-20 group-hover:opacity-40 blur-lg transition-opacity duration-200" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExcuseGenerator;
