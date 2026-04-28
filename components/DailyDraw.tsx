import React, { useState } from 'react';
import { RUNES } from '../constants';
import { RuneData, ReadingLog } from '../types';
import RuneCard from './RuneCard';
import { getRuneInterpretation } from '../services/geminiService';

interface DailyDrawProps {
  onSave: (log: ReadingLog) => void;
}

const DailyDraw: React.FC<DailyDrawProps> = ({ onSave }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedRune, setSelectedRune] = useState<RuneData | null>(null);
  const [isReversed, setIsReversed] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [question, setQuestion] = useState("");
  const [aiResult, setAiResult] = useState("");
  const [loadingAi, setLoadingAi] = useState(false);

  const drawRune = () => {
    setIsDrawing(true);
    setIsFlipped(false);
    setAiResult("");
    setSelectedRune(null);
    
    // 模擬抽牌感應過程
    setTimeout(() => {
      const randomRune = RUNES[Math.floor(Math.random() * RUNES.length)];
      const reversed = Math.random() > 0.3; // 30% 機率逆位
      setSelectedRune(randomRune);
      setIsReversed(reversed);
      setIsDrawing(false);
      setIsFlipped(true);
    }, 1500);
  };

  const getAiGuidance = async () => {
    if (!selectedRune) return;
    setLoadingAi(true);
    try {
      const result = await getRuneInterpretation(selectedRune, isReversed, question);
      setAiResult(result);
      
      onSave({
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        runeId: selectedRune.id,
        question: question,
        isReversed: isReversed,
        aiInterpretation: result
      });
    } catch (error) {
      console.error("AI 解讀失敗:", error);
      setAiResult("星辰的聯繫暫時中斷，請稍後再試。");
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-8 space-y-10">
      <div className="text-center space-y-3">
        <h2 className="text-4xl font-cinzel text-purple-400 tracking-widest">神聖抽牌</h2>
        <p className="text-slate-400">閉上雙眼，深呼吸，將你的困惑交託給符文與動物靈。</p>
      </div>

      <div className="flex flex-col items-center space-y-8">
        {/* 問題輸入框 - 更有儀式感的設計 */}
        <div className="w-full max-w-md relative group">
          <input 
            type="text" 
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="在心中默念你的問題，或在此輸入..."
            className="w-full bg-slate-900/60 border-b-2 border-slate-700 py-3 text-slate-200 focus:outline-none focus:border-purple-500 text-center transition-all placeholder:text-slate-600 italic"
          />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-purple-500 group-focus-within:w-full transition-all duration-500"></div>
        </div>

        {/* 抽牌與顯示區塊 */}
        {!selectedRune && !isDrawing ? (
          <div className="py-12">
            <button 
              onClick={drawRune}
              className="group relative inline-flex items-center justify-center px-12 py-6 font-bold text-white transition-all duration-300 bg-gradient-to-br from-purple-600 to-indigo-700 font-cinzel rounded-full hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] active:scale-95"
            >
              <span className="mr-2 text-xl">✨</span> 啟動抽牌儀式
            </button>
          </div>
        ) : isDrawing ? (
          <div className="py-10 flex flex-col items-center space-y-6">
            <div className="w-48 h-72 rounded-3xl bg-slate-800 border-2 border-purple-500/30 flex items-center justify-center animate-pulse shadow-[0_0_50px_rgba(168,85,247,0.2)]">
              <span className="text-6xl animate-bounce">🔮</span>
            </div>
            <p className="text-purple-400 font-cinzel tracking-widest animate-pulse">正在與古老智慧連結...</p>
          </div>
        ) : (
          /* 抽牌結果 */
          <div className="w-full flex flex-col items-center space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-1000">
            <RuneCard 
              rune={selectedRune} 
              isReversed={isReversed} 
              size="lg" 
            />
            
            <div className="text-center w-full space-y-6">
              <div className="space-y-1">
                <h3 className="text-4xl font-cinzel text-white">
                  {selectedRune.name} <span className="text-purple-500 mx-2">·</span> {isReversed ? '逆位' : '正位'}
                </h3>
                <p className="text-purple-300 text-xl font-medium tracking-wide">
                  動物靈：{selectedRune.animal}
                </p>
              </div>

              {/* 基本含義預覽：在 AI 出現前提供價值 */}
              <div className="max-w-md mx-auto p-5 rounded-2xl bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm">
                <h4 className="text-[10px] uppercase tracking-widest text-slate-500 mb-2 font-bold">基本象徵</h4>
                <p className="text-slate-300 italic">
                  {isReversed ? selectedRune.reversed : selectedRune.upright}
                </p>
              </div>

              {/* AI 解讀按鈕與內容 */}
              <div className="space-y-6 pt-4 w-full">
                {!aiResult && !loadingAi && (
                  <button 
                    onClick={getAiGuidance}
                    className="group relative px-8 py-3 rounded-full border border-purple-500/50 text-purple-300 hover:text-white transition-all overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center">
                      <span className="mr-2">🧙‍♂️</span> 尋求靈性大師解讀
                    </span>
                    <div className="absolute inset-0 bg-purple-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  </button>
                )}

                {loadingAi && (
                  <div className="flex flex-col items-center space-y-2">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                    <p className="text-purple-400 text-sm italic font-cinzel">正在為您轉譯靈魂訊息...</p>
                  </div>
                )}

                {aiResult && (
                  <div className="animate-in fade-in slide-in-from-top-4 duration-700">
                    <div className="relative p-8 rounded-[2rem] bg-gradient-to-b from-slate-800/80 to-slate-900/80 border border-purple-500/20 shadow-2xl text-left">
                      <span className="absolute top-4 left-6 text-4xl text-purple-500/20 font-serif">“</span>
                      <div className="relative z-10 text-slate-200 leading-relaxed whitespace-pre-wrap text-lg first-letter:text-3xl first-letter:font-cinzel first-letter:text-purple-400">
                        {aiResult}
                      </div>
                      <span className="absolute bottom-4 right-6 text-4xl text-purple-500/20 font-serif">”</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-8">
                <button 
                  onClick={() => { setSelectedRune(null); setAiResult(""); }}
                  className="px-6 py-2 text-xs tracking-widest text-slate-500 hover:text-purple-400 hover:border-purple-400 border border-transparent rounded-full transition-all"
                >
                  回歸寧靜 · 重新抽牌
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyDraw;