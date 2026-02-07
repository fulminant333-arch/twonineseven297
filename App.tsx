import React, { useState } from 'react';
import { SERVICES, CONTACT_INFO } from './data/services';
import { ServiceIcon, IconMap } from './components/Icons';
import ChatBot from './components/ChatBot';
import AdminManual from './components/AdminManual';
import { AppView } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.HOME);

  if (view === AppView.MANUAL) {
    return <AdminManual onClose={() => setView(AppView.HOME)} />;
  }

  return (
    <div className="min-h-screen bg-dark-900 text-gray-100 selection:bg-brand-500 selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-30 bg-dark-900/80 backdrop-blur-md border-b border-dark-800">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center shadow-lg shadow-brand-900/50">
              <span className="font-bold text-white text-lg">D</span>
            </div>
            <span className="font-bold text-xl tracking-tight hidden sm:block">Design<span className="text-brand-500">Bot</span></span>
          </div>
          <div className="flex items-center gap-4">
             <a href="#services" className="text-sm font-medium text-gray-300 hover:text-brand-400 transition-colors hidden md:block">Услуги</a>
             <button 
                onClick={() => setView(AppView.MANUAL)}
                className="text-xs bg-dark-800 hover:bg-dark-700 px-4 py-2 rounded-full border border-dark-700 transition-all flex items-center gap-2 hover:border-brand-500/50 group"
             >
               <IconMap.settings className="w-3 h-3 text-gray-400 group-hover:text-brand-400 group-hover:rotate-90 transition-all" />
               <span className="font-semibold">Админ / Мануал</span>
             </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-600/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-900/20 border border-brand-500/20 text-brand-400 text-sm font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
            </span>
            Принимаю заказы прямо сейчас
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-b from-white via-gray-200 to-gray-500 bg-clip-text text-transparent pb-2">
            Графический дизайн <br /> с интеллектом
          </h1>
          
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Профессиональная ретушь, удаление фона и AI-генерация. 
            Мой бот-менеджер уже готов рассчитать стоимость вашего заказа.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => (document.querySelector('button[title="Открыть чат с менеджером"]') as HTMLElement)?.click()}
              className="px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-full font-semibold transition-all shadow-lg shadow-brand-900/50 w-full sm:w-auto text-center flex items-center justify-center gap-2 group"
            >
              <IconMap.chat className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Спросить Бота
            </button>
            <a href="#services" className="px-8 py-4 bg-dark-800 hover:bg-dark-700 border border-dark-700 text-white rounded-full font-semibold transition-all w-full sm:w-auto text-center hover:border-brand-500/30">
              Смотреть Прайс
            </a>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-24 bg-dark-800/30 border-y border-dark-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Услуги и Цены</h2>
            <p className="text-gray-400 max-w-xl mx-auto">Все цены актуальны. Вы можете обсудить детали с ботом или написать мне напрямую.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service) => (
              <div key={service.id} className="group p-6 bg-dark-900 border border-dark-700 rounded-2xl hover:border-brand-500/50 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-900/10 flex flex-col">
                <div className="w-12 h-12 bg-dark-800 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-900/20 group-hover:text-brand-500 transition-colors text-gray-400 border border-dark-700 group-hover:border-brand-500/20">
                  <ServiceIcon name={service.iconName} className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-100">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">{service.description}</p>
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-dark-800">
                  <span className="text-brand-400 font-bold text-lg">{service.price}</span>
                  <button onClick={() => (document.querySelector('button[title="Открыть чат с менеджером"]') as HTMLElement)?.click()} className="text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-white transition-colors">
                    Заказать &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-dark-800 bg-dark-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-dark-800 rounded flex items-center justify-center text-gray-400 text-xs font-bold">D</div>
            <span className="text-gray-500 font-medium">DesignBot Portal &copy; 2024</span>
          </div>
          <div className="flex gap-6 text-sm text-gray-400">
            <span className="hover:text-brand-400 transition-colors cursor-pointer">{CONTACT_INFO.telegram}</span>
            <span className="hover:text-brand-400 transition-colors cursor-pointer">{CONTACT_INFO.email}</span>
          </div>
        </div>
      </footer>

      {/* The AI Bot Component */}
      <ChatBot />
    </div>
  );
};

export default App;