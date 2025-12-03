import { GoogleGenAI, GenerateContentResponse, Chat } from "@google/genai";

// We strictly assume process.env.API_KEY is available.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const createChatSession = (): Chat => {
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `You are a supportive, calm, and gentle IELTS tutor designed for introverted students. 
      Your name is "ZenBot".
      - Your goal is to reduce anxiety while providing high-quality IELTS advice.
      - Keep your responses concise and easy to digest. 
      - If the user seems stressed, offer reassurance.
      - You can help with Writing, Speaking, Reading, and Listening tips.`,
    }
  });
};

export const checkWriting = async (text: string, promptContext: string): Promise<string> => {
  if (!process.env.API_KEY) return "AI services are unavailable (Missing API Key).";
  
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          {
            text: `You are a supportive, gentle IELTS tutor for an introverted student.
            Task: Analyze the following introductory sentence written by the student.
            Context: The student is describing ${promptContext}.
            Student's Sentence: "${text}"
            
            Provide feedback in 3 bullet points:
            1. Grammatical accuracy.
            2. Paraphrasing quality (did they change the words well?).
            3. A gentle suggestion for improvement or a compliment if it's perfect.
            Keep the tone calm and encouraging.`
          }
        ]
      }
    });
    return response.text || "No feedback generated.";
  } catch (error) {
    console.error("Gemini writing check error:", error);
    return "Something went wrong while checking your writing. Please try again.";
  }
};

export const checkSpeaking = async (audioBase64: string, mimeType: string, topic: string): Promise<string> => {
  if (!process.env.API_KEY) return "AI services are unavailable (Missing API Key).";

  // Ensure mimeType is clean (remove codecs parameters if present)
  const cleanMimeType = mimeType.split(';')[0];

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash', // Use standard flash for multimodal file analysis
      contents: {
        parts: [
            {
                inlineData: {
                    mimeType: cleanMimeType,
                    data: audioBase64
                }
            },
            {
                text: `
                    You are a kind, patient IELTS speaking coach.
                    The student was asked to describe: "${topic}".
                    Please listen to their response.
                    1. Transcribe what they said.
                    2. Give a score from 1-9 based on fluency and vocabulary.
                    3. Give 1 specific tip to sound more natural.
                    Be very gentle. This student is shy.
                `
            }
        ]
      }
    });
    return response.text || "No feedback generated.";
  } catch (error) {
    console.error("Gemini speaking check error:", error);
    return "I couldn't process the audio this time. Please try recording again or check your connection.";
  }
};