import React, { useState, useRef, useEffect } from 'react';
import { IconMap } from './Icons';
import { sendMessageToGemini } from '../services/ai';
import { ChatMessage } from '../types';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Начальное сообщение от бота
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Здравствуйте! Я менеджер. Подсказать по ценам или услугам?', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
        // Подготовка истории для API
        const historyForApi = messages.map(m => ({ role: m.role, text: m.text }));
        const responseText = await sendMessageToGemini(historyForApi, userMsg.text);
        
        const botMsg: ChatMessage = { role: 'model', text: responseText, timestamp: new Date() };
        setMessages(prev => [...prev, botMsg]);
    } catch (e) {
        setMessages(prev => [...prev, { role: 'model', text: 'Ошибка соединения.', timestamp: new Date() }]);
    } finally {
        setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      {/* Кнопка открытия чата */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300 ${isOpen ? 'bg-red-500 rotate-90' : 'bg-brand-600 hover:bg-brand-500 animate-pulse-slow'}`}
        title="Открыть чат с менеджером"
      >
        {isOpen ? <IconMap.close className="w-6 h-6 text-white" /> : <IconMap.chat className="w-6 h-6 text-white" />}
      </button>

      {/* Окно чата */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 md:right-6 w-[90%] md:w-96 h-[500px] bg-dark-800 border border-dark-700 rounded-2xl shadow-2xl z-40 flex flex-col overflow-hidden backdrop-blur-sm">
          {/* Шапка */}
          <div className="bg-dark-900/90 p-4 border-b border-dark-700 flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-600 to-blue-600 flex items-center justify-center">
                <IconMap.bot className="w-6 h-6 text-white" />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-dark-900 rounded-full"></div>
            </div>
            <div>
              <h3 className="font-bold text-white">Менеджер</h3>
              <p className="text-xs text-brand-400">Отвечает мгновенно</p>
            </div>
          </div>

          {/* Сообщения */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-brand-600 text-white rounded-br-none shadow-md' 
                      : 'bg-dark-700 text-gray-200 rounded-bl-none border border-dark-600'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-dark-700 p-3 rounded-2xl rounded-bl-none border border-dark-600">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Ввод */}
          <div className="p-4 bg-dark-900 border-t border-dark-700">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Спросите цену..."
                className="flex-1 bg-dark-800 border border-dark-600 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500 text-sm transition-colors"
              />
              <button 
                onClick={handleSend}
                disabled={loading}
                className="p-3 bg-brand-600 rounded-xl hover:bg-brand-500 transition-colors disabled:opacity-50 hover:scale-105 active:scale-95"
              >
                <IconMap.send className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;