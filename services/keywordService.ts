import { GoogleGenAI, Type } from "@google/genai";
import { KeywordAnalysis, SearchConfig } from "../types";

export const getKeywordAnalysis = async (config: SearchConfig): Promise<KeywordAnalysis> => {
  const apiKey = process.env.API_KEY;
  
  if (!apiKey || apiKey === 'undefined' || apiKey === '') {
    throw new Error("RankKV Configuration Error: API_KEY is missing. Please ensure you have added the API_KEY to your Vercel Environment Variables and redeployed.");
  }

  // Create instance right before call to ensure fresh key from env
  const ai = new GoogleGenAI({ apiKey });
  
  const prompt = `Task: Perform an expert-level SEO keyword analysis for "${config.query}" on the platform "${config.platform}".
  Region: ${config.country}
  Language: ${config.language}

  Instructions:
  1. Use Google Search grounding to find the most recent trends (late 2024 / early 2025).
  2. Estimate monthly search volume, CPC (USD), and competition difficulty (0 to 1).
  3. Generate 12 months of historical/forecasted trend data.
  4. Provide 12 highly relevant long-tail keyword variations.
  5. Create 3 topical clusters for site architecture.
  6. Provide a concise, high-impact SEO strategy summary.
  
  Format Requirement: Return ONLY valid JSON matching the provided schema.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        // Adding thinking budget allows the model to process search results before formatting them
        thinkingConfig: { thinkingBudget: 2048 },
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
    if (!text) throw new Error("The RankKV engine returned an empty response. Please try a different keyword.");

    const result = JSON.parse(text);

    // Filter and format grounding sources
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
      ?.map((chunk: any) => ({
        title: chunk.web?.title || 'Search Source',
        uri: chunk.web?.uri || ''
      }))
      .filter((s: any) => s.uri) || [];

    return { ...result, sources };
  } catch (error: any) {
    console.error("RankKV Engine Internal Error:", error);
    
    // Pass through specific API errors to help the user debug their setup
    if (error.message?.includes("API_KEY") || error.message?.includes("401") || error.message?.includes("403")) {
      throw new Error("RankKV Authentication Error: Your API Key might be invalid or not yet active. Check your Vercel settings and redeploy.");
    }
    
    if (error.message?.includes("429") || error.message?.includes("quota")) {
      throw new Error("RankKV is currently at capacity. Please wait 60 seconds and try again.");
    }

    throw new Error(`RankKV could not process "${config.query}". Error: ${error.message || "Unknown connectivity issue."}`);
  }
};