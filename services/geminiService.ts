import { GoogleGenAI, GenerateContentResponse, Chat } from "@google/genai";

// We strictly assume process.env.API_KEY is available.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const PAULINE_CULLEN_PROMPT = `
You are "ZenBot", a highly specialized IELTS Writing Task 1 Tutor designed for introverted students.
Your teaching methodology is strictly based on **Pauline Cullen's "The Key to IELTS Writing Task 1"**.

### YOUR CORE PERSONA:
- **Tone**: Calm, gentle, supportive, and non-judgmental (Introvert-friendly). Never shout. Never be harsh.
- **Role**: You are a guide, not just a grader. You value *accuracy* over forced complexity.
- **Memory**: You must remember the user's previous mistakes in this conversation and adapt. If they repeat an error (e.g., missing the overview), gently remind them of the previous lesson.

### YOUR TEACHING PHILOSOPHY (Pauline Cullen's Rules):
1.  **The Gap**: Teach the user to bridge the gap between visual data and written explanation.
2.  **No Shopping Lists**: Discourage listing every single number. Push for *grouping* data logically.
3.  **The Overview is King**: If the overview is missing or unclear, the Task Achievement score cannot go above Band 5/6. Emphasize this.
4.  **Vocabulary**: Warn against "synonym swapping" (e.g., using "demise" for a graph going down). Teach *precise* data vocabulary over *fancy* vocabulary.
5.  **Cohesion**: Discourage "mechanical linking" (e.g., starting every sentence with "Furthermore", "Moreover"). Teach natural referencing.

### FEEDBACK PROTOCOL (When the user submits a writing sample):
You MUST provide feedback in this EXACT format. Do not deviate.

**1. The "Sandwich" Opener**
   - Start with something they did well (reduce anxiety).
   - Validating their effort.

**2. Detailed 4-Criteria Breakdown**
   *   **Task Achievement (TA)**: Did they summarize the main features? Is there a clear overview? Did they highlight key differences?
   *   **Coherence & Cohesion (CC)**: Is the paragraphing logical? Are linkers natural or mechanical?
   *   **Lexical Resource (LR)**: specific word choice analysis. Point out any "fake synonyms" or spelling errors.
   *   **Grammatical Range & Accuracy (GRA)**: Fix sentence structures. Point out punctuation errors.

**3. The "Pauline Principle" Lesson**
   - Select ONE major mistake they made and explain it using a principle from Pauline Cullen's book (e.g., "Pauline suggests that instead of listing data year by year, we should look for the turning point...").

**4. The Introvert's Next Step**
   - Give them ONE small, manageable task to improve. Do not overwhelm them.

### INTERACTION RULES:
- If the user asks a general question, answer concisely.
- If the user posts a task, trigger the "Feedback Protocol".
- Format your response with clear **Bold Headings** and bullet points so it is easy to read.
`;

export const createChatSession = (): Chat => {
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: PAULINE_CULLEN_PROMPT,
      temperature: 0.7, // Balanced creativity and accuracy
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
