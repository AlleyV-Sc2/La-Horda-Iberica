
import React from 'react';
import { Newspaper, ExternalLink, Calendar, Flame, ScrollText } from 'lucide-react';

const NewsSection: React.FC = () => {
  const newsItems = [
    {
      id: 1,
      title: "Actualizaciones de The Burning Crusade Classic",
      summary: "Mantente al día con los últimos ajustes de clases, mazmorras y bandas en Terrallende.",
      date: "Reciente",
      link: "https://www.wowhead.com/tbc/news",
      icon: "https://wow.zamimg.com/images/wow/icons/large/inv_scroll_03.jpg"
    },
    {
      id: 2,
      title: "Guía de Profesiones para TBC",
      summary: "Optimiza tu Herrería, Joyería y Peletería para las raids de Tier 5.",
      date: "Guía",
      link: "https://www.wowhead.com/tbc/guides/professions",
      icon: "https://wow.zamimg.com/images/wow/icons/large/trade_blacksmithing.jpg"
    },
    {
      id: 3,
      title: "Análisis de Parches de Blizzard",
      summary: "Revisa las notas oficiales y el impacto en el meta-juego actual de la Horda.",
      date: "Oficial",
      link: "https://www.wowhead.com/news",
      icon: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_tourn_bannerhorde.jpg"
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-stone-800 pb-6">
        <div className="flex items-center gap-4">
           <div className="bg-red-950 p-3 rounded border border-red-900 shadow-lg guild-banner-glow">
              <ScrollText className="text-red-500" size={32} />
           </div>
           <div>
              <h2 className="text-4xl font-bold text-red-700 horde-font uppercase tracking-widest">Crónicas de Azeroth</h2>
              <p className="text-stone-400 italic text-sm">Información estratégica y noticias de WoWHead</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsItems.map(item => (
          <a 
            key={item.id}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-stone-950 border-2 border-stone-800 rounded-xl overflow-hidden hover:border-red-900 transition-all metallic-border shadow-2xl flex flex-col"
          >
            <div className="h-40 bg-stone-900 relative flex items-center justify-center overflow-hidden">
               <img src={item.icon} alt="icon" className="w-24 h-24 object-contain opacity-50 group-hover:opacity-100 transition-opacity group-hover:scale-110 duration-500" />
               <div className="absolute top-3 right-3 bg-red-900/80 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest text-white border border-red-700">
                  {item.date}
               </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
               <div>
                  <h3 className="horde-font text-xl text-stone-200 mb-3 group-hover:text-red-600 transition-colors uppercase tracking-tighter">
                    {item.title}
                  </h3>
                  <p className="text-stone-500 text-sm leading-relaxed italic mb-6">
                    "{item.summary}"
                  </p>
               </div>
               <div className="flex items-center justify-between border-t border-stone-900 pt-4">
                  <span className="text-[10px] font-bold text-stone-700 uppercase tracking-widest flex items-center gap-2">
                    <Flame size={12} className="text-red-900" /> Fuente: WoWHead
                  </span>
                  <ExternalLink size={18} className="text-stone-600 group-hover:text-red-500 transition-colors" />
               </div>
            </div>
          </a>
        ))}
      </div>

      <div className="bg-stone-900/50 p-8 rounded-lg metallic-border border border-stone-800 flex flex-col md:flex-row items-center gap-8 shadow-2xl">
         <div className="shrink-0 w-24 h-24 bg-stone-950 p-1 rounded-sm border border-stone-700">
            <img src="https://wow.zamimg.com/images/wow/icons/large/inv_misc_tourn_bannerhorde.jpg" className="w-full h-full object-contain" alt="Horde Banner" />
         </div>
         <div className="flex-1 space-y-4">
            <h4 className="horde-font text-2xl text-red-700 uppercase tracking-widest">Tablón de la Horda Iberica</h4>
            <p className="text-stone-400 text-sm leading-relaxed">
               "Mantenéos informados, hermanos. El conocimiento de las nuevas tierras en Terrallende es tan vital como el filo de vuestras hachas. No dejéis que el enemigo os sorprenda sin preparación."
            </p>
            <div className="flex gap-4">
               <a href="https://www.wowhead.com/tbc" target="_blank" className="wow-button text-white px-6 py-2 rounded text-[10px] font-bold uppercase tracking-widest border border-[#7a633a]">Ver Base de Datos TBC</a>
            </div>
         </div>
      </div>
    </div>
  );
};

export default NewsSection;
