
export interface RuneData {
  id: number;
  symbol: string;
  name: string;
  animal: string;
  image: string;
  meaning: string;
  upright: string;
  reversed: string;
  message: string;
  practice: string;
  category: string;
}

export interface ReadingLog {
  id: string;
  timestamp: number;
  runeId: number;
  question?: string;
  isReversed: boolean;
  aiInterpretation?: string;
  userNote?: string;
}

export type AppView = 'home' | 'draw' | 'library' | 'log' | 'community';
