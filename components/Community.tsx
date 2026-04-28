
import React from 'react';

const Community: React.FC = () => {
  const mockPosts = [
    { id: 1, user: "RavenEye", rune: "ᚨ Ansuz", content: "今天參加「24天符文挑戰」的第一天！抽到了 Ansuz 正位，正好要開始寫作，感覺靈感真的源源不絕。烏鴉帶來的啟示真準！🖋️✨", likes: 24, time: "2 小時前" },
    { id: 2, user: "MountainBear", rune: "ᚢ Uruz", content: "生病恢復中抽到了公牛 Uruz。感覺體內的原始生命力正在回歸，這種與土地連結的冥想真的很有幫助。相信過程。", likes: 18, time: "5 小時前" },
    { id: 3, user: "LunarWolf", rune: "ᚦ Thurisaz", content: "Thurisaz 逆位——意識到自己最近在團隊溝通中防禦心太強了。是時候打破內在的阻礙，放下那顆帶刺的狼牙了。", likes: 31, time: "8 小時前" },
    { id: 4, user: "SeaStallion", rune: "ᛖ Ehwaz", content: "正在尋找新的合作夥伴，結果抽到了白馬 Ehwaz！這代表互信與流動的旅程即將開啟。期待這份共鳴！", likes: 12, time: "1 天前" },
  ];

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-8 space-y-8">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-cinzel text-purple-400">符文廣場</h2>
        <p className="text-slate-400">分享你的靈性旅程與每日抽牌心得。</p>
        <div className="inline-block px-4 py-1 bg-purple-900/30 border border-purple-500/30 rounded-full text-xs text-purple-200">
          🔥 當前活動：#24天符文挑戰
        </div>
      </div>

      <div className="bg-slate-800/30 p-6 rounded-3xl border border-purple-500/20 mb-8 shadow-inner">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-700 flex items-center justify-center text-sm font-bold shadow-lg">ME</div>
          <input 
            type="text" 
            placeholder="分享你今天的符文練習心得..." 
            className="flex-1 bg-transparent border-none focus:outline-none text-slate-200 text-base"
          />
          <button className="bg-purple-600 text-sm px-6 py-2.5 rounded-full font-bold hover:bg-purple-500 transition-all shadow-lg shadow-purple-600/30">發佈</button>
        </div>
      </div>

      <div className="space-y-6">
        {mockPosts.map(post => (
          <div key={post.id} className="bg-slate-800/40 p-6 rounded-3xl border border-slate-700 hover:border-purple-500/30 transition-all duration-300">
            <div className="flex justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow-md">
                  {post.user.substring(0,2)}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{post.user}</p>
                  <p className="text-[10px] text-slate-500 font-medium tracking-wider">{post.time}</p>
                </div>
              </div>
              <span className="text-xs bg-purple-900/40 text-purple-300 px-3 py-1.5 rounded-xl font-cinzel border border-purple-500/20 shadow-sm">
                {post.rune}
              </span>
            </div>
            <p className="text-slate-300 text-base leading-relaxed mb-5">
              {post.content}
            </p>
            <div className="flex items-center space-x-6 pt-4 border-t border-slate-700/50">
              <button className="text-xs text-slate-500 flex items-center space-x-1.5 hover:text-pink-400 transition-colors">
                <span className="text-lg">❤️</span> <span>{post.likes} 個能量</span>
              </button>
              <button className="text-xs text-slate-500 flex items-center space-x-1.5 hover:text-blue-400 transition-colors">
                <span className="text-lg">💬</span> <span>給予回饋</span>
              </button>
              <button className="text-xs text-slate-500 flex items-center space-x-1.5 hover:text-purple-400 transition-colors">
                <span className="text-lg">✨</span> <span>收藏靈感</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;
