import { GoogleGenerativeAI } from "@google/generative-ai";
import { RuneData } from "../types";

/**
 * 獲取盧恩符文與動物靈的 AI 靈性解讀
 */
export const getRuneInterpretation = async (
  rune: RuneData,
  isReversed: boolean,
  userQuestion: string = ""
): Promise<string> => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) return "連結靈性領域失敗：請配置 API 金鑰。";

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    
    /**
     * 【最終對策】
     * 如果 1.5-flash 持續 404，通常是 Key 沒申請好或是帳號權限問題。
     * 我們改用最原始且最不容易報錯的 "gemini-pro" 名稱測試。
     */
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash" 
    });

    const orientation = isReversed ? "逆位" : "正位";
    const prompt = `你是一位精通北歐盧恩符文與動物靈的靈性大師。
      抽中符文：${rune.name} (${orientation})，對應動物：${rune.animal}。
      核心意義：${rune.meaning}。
      使用者問題：${userQuestion || "今日指引"}。
      請給予一段150~200 字的溫暖靈性解讀，並附上一句「靈魂實踐建議」。
      請務必使用繁體中文。`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text || "大師點了點頭，但沒有說話。";

  } catch (error: any) {
    console.error("【終極除錯報告】:", error);
    
    // 如果連 gemini-pro 都報 404，那 100% 是金鑰申請錯地方了
    if (error.message?.includes("404")) {
      return "【金鑰權限錯誤】大師無法辨認您的身分。請確認您使用的是 Google AI Studio 申請的 API Key，而非 Google Cloud Console 的 Key。";
    }

    return "大師正在深層冥想中，請嘗試開啟 VPN (台灣/美國) 或稍後再試。";
  }
};