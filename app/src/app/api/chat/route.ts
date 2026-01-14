import { NextRequest } from 'next/server';
import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { SYSTEM_PROMPT } from '@/lib/ai/prompts';

export const runtime = 'edge';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface RequestBody {
  messages: ChatMessage[];
  provider: 'openai' | 'gemini' | 'openrouter' | 'ollama';
  apiKey: string; // For Ollama, this is the base URL
  model?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: RequestBody = await req.json();
    const { messages, provider, apiKey, model } = body;

    // Ollama doesn't require API key, use default URL if not provided
    if (!apiKey && provider !== 'ollama') {
      return new Response(
        JSON.stringify({ error: 'API 키가 필요합니다.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!messages || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: '메시지가 필요합니다.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Add system prompt
    const messagesWithSystem: ChatMessage[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages,
    ];

    if (provider === 'openai') {
      return await handleOpenAI(messagesWithSystem, apiKey, model || 'gpt-4o-mini');
    } else if (provider === 'gemini') {
      return await handleGemini(messagesWithSystem, apiKey, model || 'gemini-2.0-flash');
    } else if (provider === 'openrouter') {
      return await handleOpenRouter(messagesWithSystem, apiKey, model || 'moonshotai/kimi-k2');
    } else if (provider === 'ollama') {
      return await handleOllama(messagesWithSystem, apiKey || 'http://localhost:11434', model || 'llama3.2');
    } else {
      return new Response(
        JSON.stringify({ error: '지원하지 않는 AI 제공자입니다.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

async function handleOpenAI(
  messages: ChatMessage[],
  apiKey: string,
  model: string
): Promise<Response> {
  const openai = new OpenAI({ apiKey });

  const response = await openai.chat.completions.create({
    model,
    messages: messages.map((m) => ({
      role: m.role as 'user' | 'assistant' | 'system',
      content: m.content,
    })),
    stream: true,
    temperature: 0.7,
    max_tokens: 4096,
  });

  // Create a streaming response
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of response) {
          const content = chunk.choices[0]?.delta?.content || '';
          if (content) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`));
          }
        }
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      } catch (error) {
        controller.error(error);
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}

async function handleGemini(
  messages: ChatMessage[],
  apiKey: string,
  model: string
): Promise<Response> {
  const genAI = new GoogleGenerativeAI(apiKey);

  // Get system instruction content
  const systemInstructionContent = messages.find((m) => m.role === 'system')?.content || '';

  // Create model with systemInstruction as Content object
  const geminiModel = genAI.getGenerativeModel({
    model,
    systemInstruction: {
      role: 'user',
      parts: [{ text: systemInstructionContent }],
    },
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 4096,
    },
  });

  // Convert messages to Gemini format
  const chatMessages = messages
    .filter((m) => m.role !== 'system')
    .map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

  // Get the last user message
  const lastMessage = chatMessages.pop();
  if (!lastMessage) {
    return new Response(
      JSON.stringify({ error: '메시지가 필요합니다.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const chat = geminiModel.startChat({
    history: chatMessages as unknown as import('@google/generative-ai').Content[],
  });

  const result = await chat.sendMessageStream(lastMessage.parts[0].text);

  // Create a streaming response
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of result.stream) {
          const content = chunk.text();
          if (content) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`));
          }
        }
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      } catch (error) {
        controller.error(error);
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}

async function handleOpenRouter(
  messages: ChatMessage[],
  apiKey: string,
  model: string
): Promise<Response> {
  const openrouter = new OpenAI({
    apiKey,
    baseURL: 'https://openrouter.ai/api/v1',
    defaultHeaders: {
      'HTTP-Referer': 'https://lemon-protocol.app',
      'X-Title': 'Lemon Protocol',
    },
  });

  const response = await openrouter.chat.completions.create({
    model,
    messages: messages.map((m) => ({
      role: m.role as 'user' | 'assistant' | 'system',
      content: m.content,
    })),
    stream: true,
    temperature: 0.7,
    max_tokens: 4096,
  });

  // Create a streaming response
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of response) {
          const content = chunk.choices[0]?.delta?.content || '';
          if (content) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`));
          }
        }
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      } catch (error) {
        controller.error(error);
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}

async function handleOllama(
  messages: ChatMessage[],
  baseUrl: string,
  model: string
): Promise<Response> {
  // Ollama uses OpenAI-compatible API
  const ollama = new OpenAI({
    apiKey: 'ollama', // Ollama doesn't require a real API key
    baseURL: `${baseUrl}/v1`,
  });

  const response = await ollama.chat.completions.create({
    model,
    messages: messages.map((m) => ({
      role: m.role as 'user' | 'assistant' | 'system',
      content: m.content,
    })),
    stream: true,
    temperature: 0.7,
  });

  // Create a streaming response
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of response) {
          const content = chunk.choices[0]?.delta?.content || '';
          if (content) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`));
          }
        }
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      } catch (error) {
        controller.error(error);
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
