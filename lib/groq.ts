import axios from "axios";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const API_KEY = process.env.EXPO_PUBLIC_GROQ_API_KEY;

export const sendMessageToGroq = async (message: string) => {
  try {
    const response = await axios.post(
      GROQ_API_URL,
      {
        messages: [{ role: "user", content: message }],
        model: "gemma2-9b-it", // or use "llama3-70b-8192" or "llama3-8b-8192" based on Groq docs
        temperature: 0.7,
        max_tokens: 1000,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error: any) {
    console.error("Error sending message to Groq:", error.response?.data || error.message);
    throw error;
  }
};
