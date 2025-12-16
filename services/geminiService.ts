import { GoogleGenAI, Type } from "@google/genai";
import { ClassificationResult } from "../types";

// Initialize the client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Analyzes a contact form message to demonstrate the "Email Classifier Agent" skill live.
 */
export const analyzeMessage = async (message: string): Promise<ClassificationResult> => {
  if (!process.env.API_KEY) {
    // Fallback if no API key is present
    return {
      category: "Demo Mode",
      priority: "Normal",
      sentiment: "Neutral",
      suggestedAction: "Please configure API_KEY to see live AI analysis."
    };
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Analyze the following contact form message. Act as an AI Email Classifier Agent.
      
      Message: "${message}"
      
      Classify it into JSON with the following fields:
      - category: (e.g., Recruitment, Project Inquiry, Collaboration, Spam, General)
      - priority: (High, Medium, Low)
      - sentiment: (Positive, Neutral, Negative)
      - suggestedAction: (Short instruction on how to handle it, max 10 words)
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            category: { type: Type.STRING },
            priority: { type: Type.STRING },
            sentiment: { type: Type.STRING },
            suggestedAction: { type: Type.STRING },
          },
          required: ["category", "priority", "sentiment", "suggestedAction"],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as ClassificationResult;
  } catch (error) {
    console.error("AI Analysis failed:", error);
    return {
      category: "Error",
      priority: "Unknown",
      sentiment: "Unknown",
      suggestedAction: "Could not analyze message at this time."
    };
  }
};