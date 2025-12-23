import { KeywordAnalysis, SearchConfig } from "../types";

export const getKeywordAnalysis = async (config: SearchConfig): Promise<KeywordAnalysis> => {
  const response = await fetch('/api/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(config),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Analysis failed');
  }

  return response.json();
};
