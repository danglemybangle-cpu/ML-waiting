import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateExcuse = async (): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: "Generate a single, short, hilarious, slightly technical or absurd bureaucratic excuse for why the fictional video game 'Medieval Lands' has been delayed again. Max 30 words. Tone: Cynical game developer or chaotic project manager.",
    });

    return response.text.trim();
  } catch (error) {
    console.error("Failed to fetch excuse:", error);
    return "The excuse generator is currently compiling shaders. Please wait 4 years.";
  }
};
