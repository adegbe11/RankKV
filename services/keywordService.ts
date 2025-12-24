import { GoogleGenAI, Type } from "@google/genai";
import { KeywordAnalysis, SearchConfig } from "../types";

export const getKeywordAnalysis = async (config: SearchConfig): Promise<KeywordAnalysis> => {
  const apiKey = process.env.API_KEY;
  
  if (!apiKey || apiKey === 'undefined' || apiKey === '') {
    throw new Error("RankKV Configuration Error: API_KEY is missing. If you are the owner, please set the API_KEY environment variable in your hosting dashboard.");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const prompt = `Task: Perform a deep SEO keyword analysis for the query "${config.query}" on the platform "${config.platform}".
  Region: ${config.country}
  Language: ${config.language}

  Instructions:
  1. Estimate monthly search volume (REAL-TIME 2024/2025 data).
  2. Estimate CPC in USD and competition difficulty (0 to 1).
  3. Generate 12 months of historical/forecasted trend data.
  4. Provide exactly 12 long-tail keyword variations.
  5. Create 3 topical clusters for site architecture.
  6. Provide a 2-sentence SEO strategy summary.
  
  You MUST return ONLY a JSON object. No preamble, no markdown formatting.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
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
    });

    const text = response.text || "";
    const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const result = JSON.parse(cleanJson);

    // Filter and format grounding sources
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
      ?.map((chunk: any) => ({
        title: chunk.web?.title || 'Search Source',
        uri: chunk.web?.uri || ''
      }))
      .filter((s: any) => s.uri) || [];

    return { ...result, sources };
  } catch (error: any) {
    console.error("RankKV Engine Error:", error);
    if (error.message?.includes("API_KEY")) throw error;
    throw new Error("RankKV failed to process the request. This can happen if the query is blocked by safety filters or the API is currently throttled.");
  }
};