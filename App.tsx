import React from 'react';
import BrokenTimer from './components/BrokenTimer';
import ExcuseGenerator from './components/ExcuseGenerator';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[url('https://picsum.photos/1920/1080?grayscale&blur=2')] bg-cover bg-center bg-fixed bg-no-repeat text-slate-200 selection:bg-red-500 selection:text-white">
      <div className="min-h-screen bg-gradient-to-b from-black/90 via-slate-900/90 to-black/90 flex flex-col">
        
        {/* Header */}
        <header className="p-6 border-b border-white/10 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500 medieval-font tracking-tighter drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
            MEDIEVAL LANDS
          </h1>
          <p className="text-slate-400 mt-2 text-sm uppercase tracking-[0.3em]">The Most Anticipated RPG of the Millennium</p>
        </header>

        {/* Main Content */}
        <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-8 w-full max-w-6xl mx-auto space-y-12">
          
          <div className="text-center space-y-4 max-w-3xl">
            <span className="inline-block px-3 py-1 bg-red-900/30 border border-red-500/30 rounded text-red-400 text-xs font-bold uppercase tracking-wider animate-pulse">
              Status: Delayed Indefinitely
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight medieval-font">
              Get Ready to Wait. <br/>
              <span className="text-slate-500">Forever.</span>
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Experience the groundbreaking open-world RPG that is redefining the concept of "Development Hell." Pre-order now to secure your great-grandchildren's access key.
            </p>
          </div>

          <BrokenTimer />
          
          <ExcuseGenerator />

          {/* Feature List (Satire) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-16 text-center">
            <FeatureCard 
              title="Real-Time Aging" 
              desc="Our engine is so realistic, you actually age in real life while waiting for the loading screen." 
            />
            <FeatureCard 
              title="Infinite Map" 
              desc="Procedurally generated delays ensure the roadmap never actually ends." 
            />
            <FeatureCard 
              title="420K Resolution" 
              desc="Graphics so high-fidelity, they haven't been invented yet. That's why we're waiting." 
            />
          </div>

        </main>

        {/* Footer */}
        <footer className="p-8 border-t border-white/10 text-center text-slate-600 text-sm">
          <p>&copy; {new Date().getFullYear()} - 3024 Medieval Lands Studio. All Rights Reserved.</p>
          <p className="mt-2 text-xs">By using this site, you agree to wait an additional 50 years.</p>
        </footer>
      </div>
    </div>
  );
};

const FeatureCard: React.FC<{ title: string; desc: string }> = ({ title, desc }) => (
  <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-yellow-500/50 transition-colors duration-300">
    <h3 className="text-xl font-bold text-yellow-500 mb-3 medieval-font">{title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
  </div>
);

export default App;
