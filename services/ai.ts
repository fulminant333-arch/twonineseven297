import { GoogleGenAI } from "@google/genai";
import { SERVICES } from "../data/services";

// Эта функция создает "мозги" бота на основе вашего списка услуг
const getSystemInstruction = () => {
  const serviceList = SERVICES.map(s => `- ${s.title}: ${s.price} (${s.description})`).join('\n');
  
  return `
  Ты — полезный и вежливый виртуальный менеджер графического дизайнера.
  Твоя цель — отвечать на вопросы клиентов, опираясь ТОЛЬКО на следующий список услуг:
  
  ${serviceList}
  
  Правила:
  1. Если клиент спрашивает о чем-то из списка, назови цену и предложи оформить заказ.
  2. Если клиент спрашивает о чем-то, чего нет в списке, вежливо предложи обсудить индивидуальный проект и дай контакты дизайнера.
  3. Будь кратким, профессиональным и дружелюбным.
  4. Не говори, что ты AI или робот, если тебя прямо не спросят. Представляйся как "Менеджер".
  5. Отвечай на русском языке.
  `;
};

export const sendMessageToGemini = async (history: {role: string, text: string}[], newMessage: string) => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        return "Ошибка: API ключ не найден. Пожалуйста, убедитесь, что вы добавили API_KEY в настройки (файл .env или переменные среды).";
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // Используем быструю модель для чата
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: getSystemInstruction(),
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text || "Извините, я не смог обработать ваш запрос.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Произошла временная ошибка при связи с сервером. Попробуйте позже.";
  }
};