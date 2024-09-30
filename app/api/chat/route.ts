import { openai } from '@ai-sdk/openai';
import { streamText, convertToCoreMessages } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini'
  const { messages } = await req.json();
  let result;

  try {
    result = await streamText({
      model: openai(model),
      messages: convertToCoreMessages(messages),
    });
  } catch (err) {
    return  new Response(err)
  }

  return result.toDataStreamResponse();
}