import { GoogleGenAI, Type } from "@google/genai";
import { KeywordAnalysis, SearchConfig } from "../types";

const MAX_RETRIES = 2;
const INITIAL_BACKOFF = 1500; 

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getKeywordAnalysis = async (config: SearchConfig): Promise<KeywordAnalysis> => {
  const apiKey = process.env.API_KEY;
  
  if (!apiKey || apiKey === 'undefined' || apiKey === '') {
    throw new Error("RankKV Configuration Error: API_KEY is missing in Vercel. Please add it and redeploy.");
  }

  const generateData = async (useSearchTool: boolean) => {
    const ai = new GoogleGenAI({ apiKey });
    
    const prompt = `Task: Perform expert SEO keyword analysis for "${config.query}" on ${config.platform}.
    Region: ${config.country} | Language: ${config.language}
    ${useSearchTool ? 'Use Google Search grounding for 2025 real-time accuracy.' : 'Use your internal high-performance knowledge base to estimate 2024-2025 metrics.'}

    Requirements:
    - Monthly Volume, CPC (USD), Competition (0-1).
    - 12-month Trend data.
    - 12 Related long-tail keywords.
    - 3 Topical clusters.
    - High-impact SEO strategy summary.
    - Intent type.
    
    Return ONLY valid JSON.`;

    const modelConfig: any = {
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        safetySettings: [
          { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_ONLY_HIGH" },
          { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_ONLY_HIGH" },
          { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_ONLY_HIGH" },
          { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_ONLY_HIGH" }
        ],
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            keyword: { type: Type.STRING },
            volume: { type: Type.NUMBER },
            cpc: { type: Type.NUMBER },
            competition: { type: Type.NUMBER },
            intent: { type: Type.STRING },
            summary: { type: Type.STRING },
            confidenceScore: { type: Type.NUMBER },
            platformComparison: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  platform: { type: Type.STRING },
                  score: { type: Type.NUMBER }
                },
                required: ["platform", "score"]
              }
            },
            trend: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  month: { type: Type.STRING },
                  volume: { type: Type.NUMBER }
                },
                required: ["month", "volume"]
              }
            },
            related: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  keyword: { type: Type.STRING },
                  volume: { type: Type.NUMBER },
                  cpc: { type: Type.NUMBER },
                  competition: { type: Type.NUMBER },
                  intent: { type: Type.STRING }
                },
                required: ["keyword", "volume", "cpc", "competition", "intent"]
              }
            },
            clusters: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  keywords: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ["name", "keywords"]
              }
            }
          },
          required: ["keyword", "volume", "cpc", "competition", "trend", "related", "summary", "intent", "clusters", "platformComparison", "confidenceScore"]
        }
      }
    };

    if (useSearchTool) {
      modelConfig.config.tools = [{ googleSearch: {} }];
    }

    const response = await ai.models.generateContent(modelConfig);
    const text = response.text || "";
    if (!text) throw new Error("Empty response from engine.");

    const result = JSON.parse(text);
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
      ?.map((chunk: any) => ({
        title: chunk.web?.title || 'Search Source',
        uri: chunk.web?.uri || ''
      }))
      .filter((s: any) => s.uri) || [];

    return { ...result, sources };
  };

  // EXECUTION LOGIC: Try with Search first, Fallback to AI Estimation on failure
  let attempts = 0;
  while (attempts <= MAX_RETRIES) {
    try {
      // First attempt always tries real-time search
      return await generateData(attempts === 0);
    } catch (error: any) {
      const isRateLimit = error.message?.includes("429") || error.message?.includes("quota") || error.message?.includes("capacity");
      
      // If it's a rate limit on the first attempt, immediately try without the search tool
      if (isRateLimit && attempts === 0) {
        console.warn("RankKV: Search tool at capacity. Falling back to Deep AI Estimation...");
        attempts++;
        continue;
      }

      if (attempts >= MAX_RETRIES) {
        throw new Error(`RankKV Error: ${error.message || "The engine is currently unavailable."}`);
      }

      attempts++;
      await sleep(INITIAL_BACKOFF * attempts);
    }
  }

  throw new Error("RankKV: Connection timeout.");
};