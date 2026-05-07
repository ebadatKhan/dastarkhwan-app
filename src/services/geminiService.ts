import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const getSmartMenuSuggestions = async (budget: number, guests: number) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Suggest 3 realistic catering event menus for a budget of Rs. ${budget} and ${guests} guests in Karachi. Format as an array of objects.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              packageName: { type: Type.STRING },
              pricePerHead: { type: Type.NUMBER },
              dishes: { type: Type.ARRAY, items: { type: Type.STRING } },
              vibe: { type: Type.STRING, description: "e.g. Budget Friendly, Premium, Traditional" }
            },
            required: ["packageName", "pricePerHead", "dishes", "vibe"]
          }
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
};
