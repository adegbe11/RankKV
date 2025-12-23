
import { GoogleGenAI, Type } from "@google/genai";
import { KeywordAnalysis, SearchConfig } from "../types";

export const getKeywordAnalysis = async (config: SearchConfig): Promise<KeywordAnalysis> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Perform a high-precision, REAL-TIME SEO analysis for the query: "${config.query}" on the platform "${config.platform}" for the region "${config.country}" (Language: ${config.language}).
  
  DATA REQUIREMENTS:
  1. Use real-time web data to estimate current monthly search volumes for the 2024-2025 period.
  2. Provide estimated USD CPC and competition scores (0-1).
  3. Analyze search intent (Informational, Transactional, Commercial, Navigational).
  4. Generate a 12-month historical/predicted trend data points.
  5. Identify 12 highly relevant long-tail variations with volume, cpc, and intent.
  6. Create 3 topical authority clusters (groups of related keywords for content siloing).
  7. If this is a local search (contains "near me", "in [City]", etc.), factor in the specific geography.
  8. Provide a concise 2-sentence AI SEO strategy summary.
  
  Return a strictly valid JSON object following the provided schema.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
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

  try {
    const baseResult = JSON.parse(response.text);
    
    // Extract grounding sources for transparency
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
      title: chunk.web?.title || 'Search Source',
      uri: chunk.web?.uri || ''
    })).filter((s: any) => s.uri) || [];

    return { ...baseResult, sources };
  } catch (e) {
    console.error("Failed to parse AI response:", response.text);
    throw new Error("RankKV engine received malformed data. Please try again.");
  }
};
