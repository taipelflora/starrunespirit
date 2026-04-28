import React, { useState } from 'react';
import { RuneData } from '../types';

interface RuneCardProps {
  rune: RuneData;
  isReversed?: boolean;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
}

const RuneCard: React.FC<RuneCardProps> = ({ 
  rune, 
  isReversed = false, 
  onClick, 
  size = 'md', 
  showDetails = false 
}) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  const sizeClasses = {
    sm: 'w-24 h-36',
    md: 'w-48 h-72',
    lg: 'w-64 h-96'
  };

  return (
    <div 
      onClick={onClick}
      className={`
        ${sizeClasses[size]} 
        relative cursor-pointer transition-all duration-500 transform hover:scale-105
        rounded-2xl border-2 border-purple-500/30 bg-slate-900 overflow-hidden flex flex-col
        shadow-[0_0_20px_rgba(168,85,247,0.3)] group
      `}
    >
      {/* 1. 核心圖片層：直接使用資料清單中的 image 路徑 */}
      <div className="absolute inset-0 w-full h-full bg-slate-800">
        <img 
          src={rune.image} 
          alt={`${rune.animal} ${rune.name}`}
          onLoad={() => setImgLoaded(true)}
          className={`
            w-full h-full object-cover transition-all duration-700
            ${isReversed ? 'rotate-180' : 'rotate-0'}
            ${imgLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}
          `}
          // 錯誤處理：如果路徑不對或檔案不存在，顯示備用圖
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null; 
            target.src = 'https://via.placeholder.com/400x600/1e293b/a855f7?text=Image+Not+Found';
          }}
        />
        
        {/* 漸層遮罩：底部加深，確保文字可讀性 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-70" />
      </div>

      {/* 2. 頂部符文符號 */}
      <div className="absolute top-3 left-3 z-20">
        <div className="bg-black/60 backdrop-blur-md w-9 h-9 rounded-full flex items-center justify-center border border-white/20 shadow-lg">
          <span className={`text-purple-400 text-xl font-cinzel transition-transform duration-700 ${isReversed ? 'rotate-180' : ''}`}>
            {rune.symbol}
          </span>
        </div>
      </div>

      {/* 3. 底部資訊欄 */}
      <div className="mt-auto relative z-10 p-3 text-center border-t border-white/10 bg-black/20 backdrop-blur-[2px]">
        <p className="text-[10px] uppercase tracking-[0.2em] text-purple-300 font-bold leading-none drop-shadow-md">
          {rune.name}
        </p>
        <p className="text-sm text-white font-medium mt-1 drop-shadow-md">
          {rune.animal}
        </p>
      </div>

      {/* 4. 詳細資訊滑入層 */}
      {showDetails && (
        <div className="absolute inset-0 z-30 bg-purple-900/90 backdrop-blur-md p-6 flex flex-col justify-center items-center text-center animate-in fade-in zoom-in duration-300">
          <p className="text-white text-lg font-bold mb-2">{rune.meaning}</p>
          <div className="w-12 h-0.5 bg-purple-400 mb-4" />
          <p className="text-purple-100 text-sm leading-relaxed line-clamp-6 px-2">
            {isReversed ? rune.reversed : rune.upright}
          </p>
        </div>
      )}
    </div>
  );
};

export default RuneCard;