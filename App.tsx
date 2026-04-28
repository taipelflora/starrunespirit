
import React, { useState, useEffect } from 'react';
import { AppView, ReadingLog } from './types';
import DailyDraw from './components/DailyDraw';
import Library from './components/Library';
import LogBook from './components/LogBook';
import Community from './components/Community';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('home');
  const [logs, setLogs] = useState<ReadingLog[]>([]);

  useEffect(() => {
    const savedLogs = localStorage.getItem('rune_logs');
    if (savedLogs) {
      setLogs(JSON.parse(savedLogs));
    }
  }, []);

  const saveLog = (newLog: ReadingLog) => {
    const updated = [newLog, ...logs];
    setLogs(updated);
    localStorage.setItem('rune_logs', JSON.stringify(updated));
  };

  const clearLogs = () => {
    if (window.confirm("確定要清除所有的占卜紀錄嗎？這項動作無法復原。")) {
      setLogs([]);
      localStorage.removeItem('rune_logs');
    }
  };

  const renderView = () => {
    switch (view) {
      case 'draw': return <DailyDraw onSave={saveLog} />;
      case 'library': return <Library />;
      case 'log': return <LogBook logs={logs} onClear={clearLogs} />;
      case 'community': return <Community />;
      default: return (
        <div className="flex flex-col items-center justify-center min-h-[75vh] text-center px-4 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="space-y-4">
            <h1 className="text-7xl md:text-9xl font-cinzel rune-glow text-white">RuneSpirit</h1>
            <p className="text-xl md:text-2xl text-purple-300 font-cinzel tracking-[0.3em] uppercase">動物靈盧恩占卜</p>
          </div>
          
          <p className="max-w-xl text-slate-400 leading-relaxed text-lg md:text-xl font-light">
            將古老的北歐智慧與動物圖騰連結。<br/>
            在這裡，抽象的符文變得具象且溫暖。
          </p>

          <div className="flex flex-wrap justify-center gap-6 pt-4">
            <button 
              onClick={() => setView('draw')}
              className="px-10 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-cinzel font-bold transition-all transform hover:scale-105 shadow-xl shadow-purple-500/20 text-lg"
            >
              開啟每日抽牌
            </button>
            <button 
              onClick={() => setView('library')}
              className="px-10 py-4 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-full font-cinzel font-bold transition-all transform hover:scale-105 text-lg"
            >
              進入符文圖鑑
            </button>
          </div>
          
          <div className="grid grid-cols-4 gap-12 pt-16 opacity-30">
            <span className="text-5xl font-cinzel hover:rune-glow cursor-default transition-all">ᚠ</span>
            <span className="text-5xl font-cinzel hover:rune-glow cursor-default transition-all">ᚢ</span>
            <span className="text-5xl font-cinzel hover:rune-glow cursor-default transition-all">ᚦ</span>
            <span className="text-5xl font-cinzel hover:rune-glow cursor-default transition-all">ᚨ</span>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-purple-500/30">
      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-purple-500/20 px-6 py-4 flex items-center justify-between shadow-2xl">
        <div 
          onClick={() => setView('home')} 
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/40 group-hover:rotate-12 transition-transform">
            <span className="text-2xl font-cinzel text-white">ᛟ</span>
          </div>
          <span className="text-xl font-cinzel text-white tracking-widest font-bold">RUNESPIRIT</span>
        </div>

        <div className="hidden md:flex items-center space-x-10 text-sm font-bold tracking-[0.1em] text-slate-400">
          <button onClick={() => setView('draw')} className={`hover:text-purple-400 transition-colors ${view === 'draw' ? 'text-purple-400' : ''}`}>每日抽牌</button>
          <button onClick={() => setView('library')} className={`hover:text-purple-400 transition-colors ${view === 'library' ? 'text-purple-400' : ''}`}>符文圖鑑</button>
          <button onClick={() => setView('community')} className={`hover:text-purple-400 transition-colors ${view === 'community' ? 'text-purple-400' : ''}`}>符文社群</button>
          <button onClick={() => setView('log')} className={`hover:text-purple-400 transition-colors ${view === 'log' ? 'text-purple-400' : ''}`}>占卜紀錄</button>
        </div>

        <div className="md:hidden">
          <button onClick={() => setView('home')} className="text-slate-400 text-2xl p-2">☰</button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-24">
        {renderView()}
      </main>

      {/* Bottom Nav for Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-950/90 backdrop-blur-md border-t border-purple-500/20 px-4 py-3 flex justify-around items-center z-50">
        <button onClick={() => setView('draw')} className={`flex flex-col items-center p-2 rounded-xl transition-colors ${view === 'draw' ? 'text-purple-400 bg-purple-500/10' : 'text-slate-500'}`}>
          <span className="text-2xl">✨</span>
          <span className="text-[10px] font-bold mt-1">抽牌</span>
        </button>
        <button onClick={() => setView('library')} className={`flex flex-col items-center p-2 rounded-xl transition-colors ${view === 'library' ? 'text-purple-400 bg-purple-500/10' : 'text-slate-500'}`}>
          <span className="text-2xl">📚</span>
          <span className="text-[10px] font-bold mt-1">圖鑑</span>
        </button>
        <button onClick={() => setView('community')} className={`flex flex-col items-center p-2 rounded-xl transition-colors ${view === 'community' ? 'text-purple-400 bg-purple-500/10' : 'text-slate-500'}`}>
          <span className="text-2xl">👥</span>
          <span className="text-[10px] font-bold mt-1">社群</span>
        </button>
        <button onClick={() => setView('log')} className={`flex flex-col items-center p-2 rounded-xl transition-colors ${view === 'log' ? 'text-purple-400 bg-purple-500/10' : 'text-slate-500'}`}>
          <span className="text-2xl">📜</span>
          <span className="text-[10px] font-bold mt-1">紀錄</span>
        </button>
      </nav>

      {/* Decorative Background Icons */}
      <div className="fixed -bottom-10 -right-10 pointer-events-none opacity-5 hidden lg:block">
        <span className="text-[20rem] font-cinzel">ᚠ</span>
      </div>
      <div className="fixed -bottom-10 -left-10 pointer-events-none opacity-5 hidden lg:block">
        <span className="text-[20rem] font-cinzel">ᛞ</span>
      </div>
    </div>
  );
};

export default App;
