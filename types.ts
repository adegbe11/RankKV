
export interface TrendPoint {
  month: string;
  volume: number;
}

export type IntentType = 'Informational' | 'Transactional' | 'Commercial' | 'Navigational';

export interface RelatedKeyword {
  keyword: string;
  volume: number;
  cpc: number;
  competition: number;
  intent: IntentType;
}

export interface PlatformScore {
  platform: string;
  score: number; // 1-100
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface KeywordAnalysis {
  keyword: string;
  volume: number;
  cpc: number;
  competition: number;
  intent: IntentType;
  trend: TrendPoint[];
  related: RelatedKeyword[];
  summary: string;
  clusters: { name: string; keywords: string[] }[];
  platformComparison: PlatformScore[];
  confidenceScore: number;
  sources?: GroundingSource[];
}

export enum Platform {
  // Search Engines
  GOOGLE = 'Google',
  BING = 'Bing',
  YAHOO = 'Yahoo',
  BAIDU = 'Baidu',
  NAVER = 'Naver',
  DUCKDUCKGO = 'DuckDuckGo',
  
  // Video & Social
  YOUTUBE = 'YouTube',
  TIKTOK = 'TikTok',
  INSTAGRAM = 'Instagram',
  X = 'X (Twitter)',
  PINTEREST = 'Pinterest',
  FACEBOOK = 'Facebook',
  TRILLER = 'Triller',
  LIKEE = 'Likee',
  
  // E-commerce & Apps
  AMAZON = 'Amazon',
  EBAY = 'eBay',
  ETSY = 'Etsy',
  APP_STORE = 'App Store',
  PLAY_STORE = 'Play Store',
  SHOPIFY = 'Shopify',
  
  // AI & Emerging
  PERPLEXITY = 'Perplexity AI',
  CHATGPT = 'ChatGPT',
  BING_AI = 'Bing AI',
  YOU_COM = 'You.com',
  
  // Specialty & Professional
  REDDIT = 'Reddit',
  QUORA = 'Quora',
  LINKEDIN = 'LinkedIn',
  MEDIUM = 'Medium',
  SPOTIFY = 'Spotify',
  APPLE_MUSIC = 'Apple Music'
}

export interface SearchConfig {
  query: string;
  country: string;
  language: string;
  platform: Platform;
  lat?: number;
  lng?: number;
}
