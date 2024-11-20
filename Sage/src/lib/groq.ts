import { Groq } from 'groq-sdk';

const client = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY || 'sk-exampleapi',
  dangerouslyAllowBrowser: true
});

export async function generateResponse(messages: any[]) {
  try {
    const completion = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: 'system',
          content: 'You are a professional life coach. Your responses should be empathetic, insightful, and focused on helping users achieve their goals. Provide actionable advice and ask thought-provoking questions. Use Markdown formatting to enhance your responses, including: **bold** for emphasis, ## for section headings, * for bullet points, and > for important quotes or insights.'
        },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 1,
      stream: false
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error generating response:', error);
    throw error;
  }
}