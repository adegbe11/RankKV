import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI, Type } from "@google/genai";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { query, platform, country, language } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    const prompt = `Perform a high-precision, REAL-TIME SEO analysis for the query: "${query}" on the platform "${platform}" for the region "${country}" (Language: ${language}).

    DATA REQUIREMENTS:
    1. Use real-time web data to estimate current monthly search volumes for the 2024-2025 period.
    2. Provide estimated USD CPC and competition scores (0-1).
    3. Analyze search intent (Informational, Transactional, Commercial, Navigational).
    4. Generate a 12-month historical/predicted trend data points.
    5. Identify 12 highly relevant long-tail variations with volume, cpc, and intent.
    6. Create 3 topical authority clusters (groups of related keywords for content siloing).
    7. If this is a local search (contains "near me", "in [City]", etc.), factor in the specific geography.
    8. Provide a concise 2-sentence AI SEO strategy summary.

    Return ONLY a valid JSON object with this structure:
    {
      "keyword": "the query",
      "volume": 1000,
      "cpc": 1.5,
      "competition": 0.5,
      "intent": "Informational",
      "summary": "SEO strategy summary here",
      "confidenceScore": 0.85,
      "platformComparison": [{"platform": "Google", "score": 0.9}],
      "trend": [{"month": "Jan 2025", "volume": 1000}],
      "related": [{"keyword": "example", "volume": 500, "cpc": 1.0, "competition": 0.3, "intent": "Commercial"}],
      "clusters": [{"name": "Cluster Name", "keywords": ["keyword1", "keyword2"]}]
    }`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
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

    const baseResult = JSON.parse(response.text);

    // Extract grounding sources
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
      title: chunk.web?.title || 'Search Source',
      uri: chunk.web?.uri || ''
    })).filter((s: any) => s.uri) || [];

    return res.status(200).json({ ...baseResult, sources });
  } catch (error) {
    console.error('Analysis error:', error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Analysis failed'
    });
  }
}
