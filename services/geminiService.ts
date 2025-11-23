import { GoogleGenAI, Type, Schema } from "@google/genai";
import { GenerationParams, NPCDialogue } from "../types";

const apiKey = process.env.API_KEY;

if (!apiKey) {
  console.error("API_KEY is missing from environment variables.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || 'DUMMY_KEY_FOR_DEV' });

export const generateDialogue = async (params: GenerationParams): Promise<NPCDialogue> => {
  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
      npcName: {
        type: Type.STRING,
        description: "A creative, lore-appropriate name for the traveler."
      },
      archetype: {
        type: Type.STRING,
        description: "The character class or job (e.g., Merchant, Knight, Smuggler)."
      },
      visualDescription: {
        type: Type.STRING,
        description: "A one-sentence description of their appearance."
      },
      shortBark: {
        type: Type.STRING,
        description: "A very short (3-8 words) cry for attention or muttered curse they say before noticing the player."
      },
      mainDialogue: {
        type: Type.STRING,
        description: "The main paragraph of dialogue explaining their situation and why they are lost. Should include specific sensory details related to the setting."
      },
      reactionToHelp: {
        type: Type.STRING,
        description: "Their verbal response when the player offers assistance."
      }
    },
    required: ["npcName", "archetype", "visualDescription", "shortBark", "mainDialogue", "reactionToHelp"]
  };

  const prompt = `
    You are a master creative writer for a tabletop role-playing game.
    Create a unique NPC who is a lost traveler.
    
    Configuration:
    - Setting: ${params.setting}
    - Emotional Tone: ${params.tone}
    - Specific Context/Plight: ${params.context || "General confusion and disorientation"}

    Make the dialogue flavorful, immersive, and distinct. Avoid clichés where possible.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: schema,
        temperature: 0.8, // Slightly higher for creativity
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from AI");
    }

    const data = JSON.parse(text) as NPCDialogue;
    return data;

  } catch (error) {
    console.error("Error generating NPC dialogue:", error);
    throw error;
  }
};