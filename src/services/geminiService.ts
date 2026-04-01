import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const researchTrendingTopics = async (niche: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Research the top 5 trending topics in the ${niche} niche for this week. Provide a summary and why it's relevant for content creators.`,
    config: {
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            summary: { type: Type.STRING },
            sourceUrl: { type: Type.STRING },
            relevanceScore: { type: Type.NUMBER },
          },
          required: ["title", "summary", "sourceUrl", "relevanceScore"],
        },
      },
    },
  });

  return JSON.parse(response.text);
};

export const generateMultiPlatformContent = async (topic: any, audience: string, tone: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate content for a topic: "${topic.title}". 
    Summary: ${topic.summary}
    Target Audience: ${audience}
    Tone: ${tone}
    
    Generate:
    1. A detailed newsletter (Markdown).
    2. A Twitter thread (max 5 tweets).
    3. A professional LinkedIn post.
    4. An Instagram caption with hashtag suggestions.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          newsletter: { type: Type.STRING },
          twitter: { type: Type.STRING },
          linkedin: { type: Type.STRING },
          instagram: { type: Type.STRING },
        },
        required: ["newsletter", "twitter", "linkedin", "instagram"],
      },
    },
  });

  return JSON.parse(response.text);
};
