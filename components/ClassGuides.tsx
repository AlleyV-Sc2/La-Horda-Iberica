
import React, { useState } from 'react';
import { GraduationCap, ExternalLink, Flame, Shield, Sword, Heart, ArrowRight, Wand2 } from 'lucide-react';
import { CLASSES, CLASS_ICONS, CLASS_COLORS } from '../constants';
import { CharacterClass } from '../types';

type Spec = {
  name: string;
  slug: string;
  icon: string;
};

const CLASS_SPECS: Record<string, Spec[]> = {
  'Guerrero': [
    { name: 'Protección (Tank)', slug: 'tank', icon: 'ability_warrior_defensivestance' },
    { name: 'Furia/Armas (DPS)', slug: 'dps', icon: 'ability_warrior_innervage' }
  ],
  'Paladín': [
    { name: 'Sagrado (Healer)', slug: 'healer', icon: 'spell_holy_holybolt' },
    { name: 'Protección (Tank)', slug: 'tank', icon: 'spell_holy_devotionaura' },
    { name: 'Reprensión (DPS)', slug: 'dps', icon: 'spell_holy_auraoflight' }
  ],
  'Cazador': [
    { name: 'Bestias/Puntería', slug: 'dps', icon: 'ability_hunter_beasttaming' }
  ],
  'Pícaro': [
    { name: 'Combate/Asesinato', slug: 'dps', icon: 'ability_rogue_eviscerate' }
  ],
  'Sacerdote': [
    { name: 'Sagrado/Disciplina', slug: 'healer', icon: 'spell_holy_guardianspirit' },
    { name: 'Sombras (DPS)', slug: 'dps', icon: 'spell_shadow_shadowwordpain' }
  ],
  'Chamán': [
    { name: 'Restauración', slug: 'healer', icon: 'spell_nature_magicimmunity' },
    { name: 'Elemental (DPS)', slug: 'elemental-dps', icon: 'spell_nature_lightning' },
    { name: 'Mejora (DPS)', slug: 'enhancement-dps', icon: 'spell_nature_lightningshield' }
  ],
  'Mago': [
    { name: 'Arcano/Fuego/Escarcha', slug: 'dps', icon: 'spell_fire_firebolt02' }
  ],
  'Brujo': [
    { name: 'Aflicción/Destro/Demo', slug: 'dps', icon: 'spell_shadow_metamorphosis' }
  ],
  'Druida': [
    { name: 'Restauración', slug: 'healer', icon: 'spell_nature_healingtouch' },
    { name: 'Feral (Tank/DPS)', slug: 'feral-dps', icon: 'ability_druid_catform' },
    { name: 'Equilibrio (DPS)', slug: 'balance-dps', icon: 'spell_nature_starfall' }
  ]
};

const ClassGuides: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState<CharacterClass | null>(null);
  const [selectedSpec, setSelectedSpec] = useState<Spec | null>(null);

  const getWowheadUrl = (cls: CharacterClass, spec: Spec, type: 'main' | 'leveling' | 'talents' | 'prebis') => {
    const classMapping: Record<string, string> = {
      'Guerrero': 'warrior',
      'Paladín': 'paladin',
      'Cazador': 'hunter',
      'Pícaro': 'rogue',
      'Sacerdote': 'priest',
      'Chamán': 'shaman',
      'Mago': 'mage',
      'Brujo': 'warlock',
      'Druida': 'druid'
    };

    const clsSlug = classMapping[cls];
    const specSlug = spec.slug;

    if (type === 'leveling') {
      return `https://www.wowhead.com/tbc/guides/${clsSlug}-leveling-guide-burning-crusade-classic`;
    }

    // WoWhead TBC URL Pattern: {class}-{spec}-pve-{type}-burning-crusade-classic
    const base = `https://www.wowhead.com/tbc/guides/${clsSlug}-${specSlug}-pve`;
    
    switch (type) {
      case 'talents': return `${base}-talents-builds-burning-crusade-classic`;
      case 'prebis': return `${base}-pre-raid-bis-gear-burning-crusade-classic`;
      default: return `${base}-burning-crusade-classic`;
    }
  };

  const handleClassSelect = (cls: CharacterClass) => {
    setSelectedClass(cls);
    const specs = CLASS_SPECS[cls] || [];
    setSelectedSpec(specs.length > 0 ? specs[0] : null);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-stone-800 pb-6">
        <div className="flex items-center gap-4">
           <div className="bg-red-950 p-3 rounded border border-red-900 shadow-lg guild-banner-glow">
              <GraduationCap className="text-red-500" size={32} />
           </div>
           <div>
              <h2 className="text-4xl font-bold text-red-700 horde-font uppercase tracking-widest">Maestría de Clase</h2>
              <p className="text-stone-400 italic text-sm">Guías específicas de WoWHead TBC para La Horda Ibérica</p>
           </div>
        </div>
      </div>

      {!selectedClass ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {CLASSES.map((cls) => (
            <button
              key={cls}
              onClick={() => handleClassSelect(cls)}
              className="group bg-stone-950 border-2 border-stone-800 rounded-xl p-6 hover:border-red-900 transition-all metallic-border shadow-xl flex flex-col items-center gap-4 hover:bg-red-900/5"
            >
              <div className="relative">
                <img 
                  src={CLASS_ICONS[cls]} 
                  alt={cls} 
                  className="w-16 h-16 rounded border border-stone-700 group-hover:scale-110 transition-transform duration-300" 
                />
                <div className="absolute inset-0 bg-red-900/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <span className={`horde-font text-lg uppercase tracking-widest ${CLASS_COLORS[cls]}`}>
                {cls}
              </span>
              <ArrowRight size={16} className="text-stone-700 group-hover:text-red-500 transition-colors" />
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-6 animate-slide-up">
          <button 
            onClick={() => {
              setSelectedClass(null);
              setSelectedSpec(null);
            }}
            className="text-stone-500 hover:text-red-500 flex items-center gap-2 uppercase font-bold text-xs tracking-widest transition-colors"
          >
            <ArrowRight size={14} className="rotate-180" /> Volver al Cónclave
          </button>

          <div className="bg-stone-950 border-2 border-stone-800 rounded-2xl overflow-hidden metallic-border shadow-2xl">
            <div className="bg-stone-900/80 p-8 flex flex-col md:flex-row items-center gap-8 border-b border-stone-800">
               <img src={CLASS_ICONS[selectedClass]} className="w-24 h-24 rounded border-2 border-red-900 shadow-2xl" alt={selectedClass} />
               <div className="flex-1 text-center md:text-left">
                  <h3 className={`horde-font text-5xl uppercase tracking-tighter ${CLASS_COLORS[selectedClass]}`}>
                    {selectedClass}
                  </h3>
                  <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-3">
                    {CLASS_SPECS[selectedClass]?.map((spec) => (
                      <button
                        key={spec.slug}
                        onClick={() => setSelectedSpec(spec)}
                        className={`flex items-center gap-2 px-4 py-2 rounded border-2 transition-all font-bold uppercase text-xs tracking-widest ${
                          selectedSpec?.slug === spec.slug 
                          ? 'bg-red-900 border-red-500 text-white shadow-lg' 
                          : 'bg-stone-950 border-stone-800 text-stone-500 hover:border-stone-600'
                        }`}
                      >
                        <img src={`https://wow.zamimg.com/images/wow/icons/small/${spec.icon}.jpg`} className="w-4 h-4 rounded-sm" alt="" />
                        {spec.name}
                      </button>
                    ))}
                  </div>
               </div>
            </div>

            {selectedSpec && (
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <GuideLink 
                    title="Guía General" 
                    desc={`Visión general de ${selectedClass} ${selectedSpec.name} en TBC.`}
                    url={getWowheadUrl(selectedClass, selectedSpec, 'main')}
                    icon={<Shield className="text-blue-500" />}
                />
                <GuideLink 
                    title="Guía de Leveo" 
                    desc={`Cómo subir tu ${selectedClass} al nivel 70 de forma eficiente.`}
                    url={getWowheadUrl(selectedClass, selectedSpec, 'leveling')}
                    icon={<Flame className="text-orange-500" />}
                />
                <GuideLink 
                    title="Talentos y Builds" 
                    desc="Mejores configuraciones de talentos para PVE."
                    url={getWowheadUrl(selectedClass, selectedSpec, 'talents')}
                    icon={<Sword className="text-red-500" />}
                />
                <GuideLink 
                    title="Equipo Pre-BIS" 
                    desc="Tu lista de equipo antes de entrar a bandas."
                    url={getWowheadUrl(selectedClass, selectedSpec, 'prebis')}
                    icon={<Heart className="text-green-500" />}
                />
              </div>
            )}
          </div>
        </div>
      )}

      <div className="bg-red-950/20 border-2 border-red-900/30 p-8 rounded-xl flex gap-8 items-center metallic-border">
         <div className="bg-stone-900 p-4 rounded shadow-2xl border border-stone-800">
            <img src="https://wow.zamimg.com/images/wow/icons/large/inv_misc_book_09.jpg" className="w-16 h-16 opacity-50" alt="lore" />
         </div>
         <div className="space-y-2">
            <h4 className="horde-font text-xl text-red-700 uppercase tracking-widest">Consejo del Warchief</h4>
            <p className="text-sm text-stone-400 leading-relaxed italic">
               "Hermanos, la sabiduría es el arma más afilada. Seleccionad vuestra especialización y seguid las sendas trazadas en WoWHead. No marchéis a la batalla sin conocer vuestros talentos. ¡Lok'tar Ogar!"
            </p>
         </div>
      </div>
    </div>
  );
};

const GuideLink: React.FC<{title: string, desc: string, url: string, icon: React.ReactNode}> = ({ title, desc, url, icon }) => (
  <a 
    href={url} 
    target="_blank" 
    rel="noopener noreferrer"
    className="bg-stone-900/50 border border-stone-800 p-6 rounded-xl hover:border-red-900 transition-all group flex items-start gap-4"
  >
    <div className="bg-stone-950 p-3 rounded border border-stone-800 group-hover:border-red-900/50 transition-colors">
      {icon}
    </div>
    <div className="flex-1">
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-stone-200 uppercase tracking-widest text-sm group-hover:text-red-500 transition-colors">{title}</h4>
        <ExternalLink size={14} className="text-stone-700 group-hover:text-red-500" />
      </div>
      <p className="text-xs text-stone-500 mt-2 leading-relaxed italic">"{desc}"</p>
    </div>
  </a>
);

export default ClassGuides;
