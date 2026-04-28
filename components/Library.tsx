import React, { useState } from 'react';
import { RUNES } from '../constants';
import RuneCard from './RuneCard';
import { RuneData } from '../types';

const Library: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRune, setSelectedRune] = useState<RuneData | null>(null);
  const [activeTab, setActiveTab] = useState<'upright' | 'reversed'>('upright');

  const filteredRunes = RUNES.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.animal.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.meaning.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-cinzel text-purple-400">盧恩圖鑑</h2>
          <p className="text-slate-400">探索 24 張結合動物靈的神聖符文。</p>
        </div>
        <div className="relative">
          <input 
            type="text"
            placeholder="搜尋符文、動物或關鍵字..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 pl-10 text-sm w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-200"
          />
          <span className="absolute left-3 top-2.5 opacity-50">🔍</span>
        </div>
      </div>

      {/* 列表網格區 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {filteredRunes.map(rune => (
          <div key={rune.id} className="flex flex-col items-center">
            <RuneCard 
              rune={rune} 
              size="sm" 
              onClick={() => { setSelectedRune(rune); setActiveTab('upright'); }} 
            />
            <p className="mt-2 text-sm font-cinzel text-purple-300">{rune.name}</p>
            <p className="text-[10px] text-slate-500">{rune.animal}</p>
          </div>
        ))}
      </div>

      {/* 點擊後的詳細資訊彈窗 */}
      {selectedRune && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <div className="max-w-4xl w-full bg-slate-900 border border-purple-500/30 rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl animate-in zoom-in duration-300">
            
            {/* 左側：卡片視覺呈現區 (已修正為顯示圖片) */}
            <div className="md:w-2/5 p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-purple-500/20 relative overflow-hidden bg-slate-800">
              {/* 背景裝飾：模糊的動物圖片 */}
              <img 
                src={`/cards/${selectedRune.name}.png`} 
                className="absolute inset-0 w-full h-full object-cover opacity-20 blur-xl scale-125"
                alt=""
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
              
              {/* 核心卡片組件：這會調用你的 RuneCard 並顯示圖片 */}
              <div className="relative z-10">
                <RuneCard 
                  rune={selectedRune} 
                  size="lg" 
                  isReversed={activeTab === 'reversed'} 
                />
              </div>

              <div className="mt-8 text-center space-y-1 relative z-10">
                <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">符文類別</p>
                <p className="text-purple-400 font-cinzel text-lg">{selectedRune.category}</p>
              </div>
            </div>
            
            {/* 右側：文字內容區 */}
            <div className="md:w-3/5 p-6 md:p-10 overflow-y-auto max-h-[75vh] md:max-h-[85vh] bg-slate-900">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center space-x-3">
                    <h3 className="text-4xl font-cinzel text-white">{selectedRune.name}</h3>
                    <span className="text-2xl text-purple-500/50 font-cinzel">{selectedRune.symbol}</span>
                  </div>
                  <p className="text-purple-300 text-xl font-medium">動物靈：{selectedRune.animal}</p>
                </div>
                <button 
                  onClick={() => setSelectedRune(null)}
                  className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-8">
                {/* 象徵意義 */}
                <section>
                  <h4 className="text-xs font-bold uppercase text-slate-500 mb-3 tracking-widest border-b border-slate-800 pb-1">象徵意義</h4>
                  <p className="text-slate-200 text-lg leading-relaxed">{selectedRune.meaning}</p>
                </section>

                {/* 正逆位切換頁籤 */}
                <section>
                  <div className="flex space-x-2 mb-4 bg-slate-800 p-1 rounded-xl">
                    <button 
                      onClick={() => setActiveTab('upright')}
                      className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'upright' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
                    >
                      正位意涵
                    </button>
                    <button 
                      onClick={() => setActiveTab('reversed')}
                      className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'reversed' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
                    >
                      逆位意涵
                    </button>
                  </div>
                  <div className="p-5 bg-slate-800/40 rounded-2xl border border-slate-700 min-h-[100px] animate-in fade-in duration-300">
                    <p className="text-slate-200 leading-relaxed">
                      {activeTab === 'upright' ? selectedRune.upright : selectedRune.reversed}
                    </p>
                  </div>
                </section>

                {/* 占卜訊息與實踐 */}
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase text-purple-400 flex items-center">
                      <span className="mr-2">💡</span> 占卜訊息
                    </h4>
                    <div className="bg-purple-900/10 p-5 rounded-2xl border border-purple-500/10 italic text-purple-100">
                      {selectedRune.message}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase text-emerald-400 flex items-center">
                      <span className="mr-2">🧘</span> 實踐練習
                    </h4>
                    <div className="bg-emerald-900/10 p-5 rounded-2xl border border-emerald-500/10 text-emerald-100 leading-relaxed">
                      {selectedRune.practice}
                    </div>
                  </div>
                </div>

                {/* 底部按鈕 */}
                <div className="flex justify-between items-center pt-6 border-t border-slate-800">
                  <button className="flex items-center space-x-2 text-slate-400 hover:text-pink-400 transition-colors">
                    <span>❤️</span> <span className="text-xs uppercase font-bold">收藏</span>
                  </button>
                  <button className="flex items-center space-x-2 text-slate-400 hover:text-blue-400 transition-colors">
                    <span>💬</span> <span className="text-xs uppercase font-bold">討論</span>
                  </button>
                  <button className="flex items-center space-x-2 text-slate-400 hover:text-purple-400 transition-colors">
                    <span>📝</span> <span className="text-xs uppercase font-bold">記錄</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Library;
