import React from 'react';
import { ReadingLog } from '../types';
import { RUNES } from '../constants';
import RuneCard from './RuneCard'; // 引入 RuneCard 以顯示圖片

interface LogBookProps {
  logs: ReadingLog[];
  onClear: () => void;
}

const LogBook: React.FC<LogBookProps> = ({ logs, onClear }) => {
  // 依照時間排序，最新的在最上面
  const sortedLogs = [...logs].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-cinzel text-purple-400">靈魂日誌</h2>
          <p className="text-slate-400">記錄你與符文、動物靈交會的每一個瞬間。</p>
        </div>
        {logs.length > 0 && (
          <button 
            onClick={onClear}
            className="text-xs text-red-400 hover:text-red-300 underline font-medium transition-colors"
          >
            清除所有紀錄
          </button>
        )}
      </div>

      {logs.length === 0 ? (
        <div className="text-center py-24 border-2 border-dashed border-slate-800 rounded-[3rem] bg-slate-900/20">
          <p className="text-slate-500 italic text-lg">
            尚未有任何占卜紀錄。<br/>
            現在就抽取一張符文，開始你的探索之旅。
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {sortedLogs.map(log => {
            const rune = RUNES.find(r => r.id === log.runeId);
            if (!rune) return null;
            
            return (
              <div 
                key={log.id} 
                className="bg-slate-800/40 border border-slate-700 rounded-3xl overflow-hidden hover:border-purple-500/30 transition-all duration-300 shadow-xl group"
              >
                <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
                  
                  {/* 左側：顯示卡片圖片 */}
                  <div className="flex flex-col items-center justify-start">
                    <div className="group-hover:scale-105 transition-transform duration-500 shadow-2xl">
                      <RuneCard 
                        rune={rune} 
                        isReversed={log.isReversed} 
                        size="sm" // 日誌中使用小尺寸縮圖
                      />
                    </div>
                    {/* 圖片下方的小字資訊 */}
                    <div className="mt-4 text-center">
                      <span className="block text-[10px] uppercase font-bold text-purple-300 tracking-widest">
                        {rune.name}
                      </span>
                      <span className="block text-[10px] text-slate-500 mt-1">
                        {rune.animal}
                      </span>
                    </div>
                  </div>
                  
                  {/* 右側：紀錄內容 */}
                  <div className="flex-1 space-y-5">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <p className="text-xs text-slate-500 font-medium tracking-wider">
                          {new Date(log.timestamp).toLocaleString('zh-TW')}
                        </p>
                        {log.question && (
                          <p className="text-white font-bold text-xl mt-1 italic group-hover:text-purple-200 transition-colors">
                            「{log.question}」
                          </p>
                        )}
                        {!log.question && <p className="text-slate-400 font-medium">今日指引</p>}
                      </div>
                      
                      {/* 正逆位標籤 */}
                      <span className={`text-[10px] px-3 py-1 rounded-full border font-bold uppercase tracking-widest ${
                        log.isReversed 
                          ? 'border-indigo-500/50 text-indigo-400 bg-indigo-950/20' 
                          : 'border-purple-500/50 text-purple-400 bg-purple-950/20'
                      }`}>
                        {log.isReversed ? '逆位' : '正位'}
                      </span>
                    </div>

                    {/* AI 解讀內容 */}
                    {log.aiInterpretation && (
                      <div className="text-base text-slate-300 leading-relaxed bg-black/30 p-6 rounded-2xl border-l-4 border-purple-500 shadow-lg relative overflow-hidden">
                        {/* 背景微光裝飾 */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-3xl -z-10"></div>
                        
                        <h4 className="text-[10px] font-bold uppercase text-purple-400 mb-2 tracking-[0.2em]">
                          靈魂神諭內容
                        </h4>
                        <div className="whitespace-pre-wrap relative z-10">
                          {log.aiInterpretation}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LogBook;