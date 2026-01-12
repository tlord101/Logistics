
import { GoogleGenAI, Type } from "@google/genai";
import { GreetingInfo } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const fetchGreetingInfo = async (language: string): Promise<GreetingInfo> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Tell me about the phrase "Hello World" in ${language}.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          language: { type: Type.STRING },
          translation: { type: Type.STRING },
          pronunciation: { type: Type.STRING },
          funFact: { type: Type.STRING }
        },
        required: ["language", "translation", "pronunciation", "funFact"]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("No response from AI");
  return JSON.parse(text) as GreetingInfo;
};

export const fetchRandomGreeting = async (): Promise<GreetingInfo> => {
    const languages = ["Japanese", "French", "Swahili", "Icelandic", "Binary", "Python", "Klingon", "Ancient Greek"];
    const randomLang = languages[Math.floor(Math.random() * languages.length)];
    return fetchGreetingInfo(randomLang);
}
