import React from 'react';
import { IconMap } from './Icons';

interface AdminManualProps {
  onClose: () => void;
}

const AdminManual: React.FC<AdminManualProps> = ({ onClose }) => {
  return (
    <div className="min-h-screen bg-dark-900 text-gray-200 p-6 md:p-12 animate-in fade-in duration-300">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-dark-700">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-brand-600/20 rounded-lg">
                <IconMap.settings className="w-6 h-6 text-brand-500" />
             </div>
             <h1 className="text-2xl md:text-3xl font-bold text-white">Панель Администратора</h1>
          </div>
          <button onClick={onClose} className="px-4 py-2 rounded-lg bg-dark-800 hover:bg-dark-700 text-white transition-colors flex items-center gap-2">
            <IconMap.close className="w-4 h-4" />
            Закрыть
          </button>
        </div>

        <div className="grid gap-8">
          {/* Инструкция по услугам */}
          <section className="bg-dark-800 p-6 rounded-2xl border border-dark-700 shadow-xl">
            <h2 className="text-xl font-semibold text-brand-400 mb-4 flex items-center gap-2">
              1. Как добавить или изменить услуги?
            </h2>
            <p className="mb-4 text-gray-400">
              Ваш бот берет информацию из файла <code className="bg-black/50 px-2 py-1 rounded text-green-400 font-mono">data/services.ts</code>.
              Вам не нужно переписывать сложный код. Просто найдите этот файл и измените текст внутри кавычек.
            </p>
            <div className="bg-black/80 p-5 rounded-xl border border-gray-700 overflow-x-auto relative group">
              <div className="absolute top-2 right-2 text-xs text-gray-500 font-mono">data/services.ts</div>
              <pre className="text-sm font-mono text-gray-300 leading-relaxed">
{`export const SERVICES: ServiceItem[] = [
  {
    id: '1',
    title: 'Удаление фона',  // <-- МЕНЯЙТЕ НАЗВАНИЕ
    price: '100₽',           // <-- МЕНЯЙТЕ ЦЕНУ
    description: '...',      // <-- ОПИСАНИЕ УСЛУГИ
    iconName: 'scissors'     // <-- ИКОНКА
  },
  // Чтобы добавить новую услугу, скопируйте блок {...},
  // вставьте его ниже и поменяйте id на '5'.
];`}
              </pre>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-yellow-500/80 bg-yellow-500/10 p-3 rounded-lg">
                <IconMap.info className="w-4 h-4" />
                <span>Важно: Как только вы сохраните файл, Бот автоматически выучит новые цены.</span>
            </div>
          </section>

          {/* Инструкция по Боту */}
          <section className="bg-dark-800 p-6 rounded-2xl border border-dark-700 shadow-xl">
            <h2 className="text-xl font-semibold text-brand-400 mb-4 flex items-center gap-2">
              2. Как работает Бот?
            </h2>
            <p className="text-gray-400 mb-4">
              Бот работает на технологии Google Gemini. Он читает файл услуг и выступает в роли "Менеджера". 
              Вам не нужно прописывать диалоги вручную. Нейросеть сама понимает вопросы вроде "Сколько стоит?" или "Что вы умеете?".
            </p>
             <p className="text-gray-400">
              Логика бота находится в файле <code className="bg-black/50 px-2 py-1 rounded text-green-400 font-mono">services/ai.ts</code>. 
              Там можно изменить "Системную инструкцию" (System Instruction), если вы захотите, чтобы бот вел себя более дерзко или официально.
            </p>
          </section>

           {/* Инструкция по контактам */}
          <section className="bg-dark-800 p-6 rounded-2xl border border-dark-700 shadow-xl">
            <h2 className="text-xl font-semibold text-brand-400 mb-4 flex items-center gap-2">
              3. Как изменить контакты?
            </h2>
            <p className="text-gray-400 mb-4">
              В том же файле <code className="bg-black/50 px-2 py-1 rounded text-green-400 font-mono">data/services.ts</code> в самом низу есть блок <code className="text-white">CONTACT_INFO</code>.
            </p>
            <div className="bg-black/80 p-4 rounded-xl border border-gray-700">
               <pre className="text-sm font-mono text-gray-300">
{`export const CONTACT_INFO = {
  telegram: "@ваш_ник",
  email: "почта@example.com"
};`}
               </pre>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminManual;