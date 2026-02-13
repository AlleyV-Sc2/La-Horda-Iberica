
import React from 'react';
import { ExternalLink, Hash, Users, ShieldAlert, MessageCircle, Mic } from 'lucide-react';
import { DiscordUser } from '../types';

const DiscordSection: React.FC = () => {
  const onlineUsers: DiscordUser[] = [
    { id: '1', username: 'GuildMaster_Zog', status: 'online', avatar: 'https://picsum.photos/seed/zog/50', activity: 'Jugando World of Warcraft' },
    { id: '2', username: 'Officer_Jane', status: 'dnd', avatar: 'https://picsum.photos/seed/jane/50', activity: 'En Karazhan' },
    { id: '3', username: 'HealerBot', status: 'idle', avatar: 'https://picsum.photos/seed/hb/50' },
    { id: '4', username: 'Warrior_01', status: 'online', avatar: 'https://picsum.photos/seed/w1/50' },
    { id: '5', username: 'Mage_Fire', status: 'online', avatar: 'https://picsum.photos/seed/m1/50', activity: 'Escuchando Spotify' },
  ];

  const guildLinks = [
    { name: 'Discord Oficial', url: 'https://discord.gg/example', color: 'bg-[#5865F2]' },
    { name: 'WoWHead TBC', url: 'https://tbc.wowhead.com', color: 'bg-[#ff9d00]' },
    { name: 'Warcraft Logs', url: 'https://warcraftlogs.com', color: 'bg-[#1a1a1a]' },
    { name: 'Reglas de Loot', url: '#', color: 'bg-red-900' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-stone-800 pb-6">
        <div>
          <h2 className="text-3xl font-bold text-red-700 horde-font uppercase">Comunicaciones</h2>
          <p className="text-stone-400 italic">Discord y enlaces estratégicos</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Discord Widget Simulation */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#313338] rounded-xl overflow-hidden border border-[#1e1f22] shadow-2xl">
            <div className="p-4 bg-[#2b2d31] flex items-center justify-between border-b border-[#1e1f22]">
              <div className="flex items-center gap-3">
                <div className="bg-red-700 p-2 rounded-lg">
                  <MessageCircle className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="text-white font-bold leading-none">Horde TBC Guild</h3>
                  <span className="text-[10px] text-green-400 font-bold uppercase tracking-wider">348 Miembros Online</span>
                </div>
              </div>
              <button className="bg-[#248046] hover:bg-[#1a6334] text-white px-4 py-1.5 rounded text-sm font-medium transition-colors">
                Unirse
              </button>
            </div>
            
            <div className="p-6 bg-[#313338] min-h-[400px]">
              <div className="mb-6">
                <div className="flex items-center gap-2 text-stone-400 text-xs font-bold uppercase tracking-widest mb-4">
                  <Users size={14} /> Conectados actualmente
                </div>
                <div className="space-y-4">
                  {onlineUsers.map(user => (
                    <div key={user.id} className="flex items-center gap-3 group cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-all">
                      <div className="relative">
                        <img src={user.avatar} className="w-10 h-10 rounded-full border-2 border-stone-800" alt={user.username} />
                        <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-[#313338] ${
                          user.status === 'online' ? 'bg-[#23a559]' :
                          user.status === 'dnd' ? 'bg-[#f23f42]' :
                          'bg-[#f0b232]'
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-white font-semibold truncate group-hover:text-red-400">{user.username}</div>
                        {user.activity && <div className="text-stone-400 text-xs truncate">{user.activity}</div>}
                      </div>
                      <div className="hidden group-hover:flex gap-2">
                         <MessageCircle size={16} className="text-stone-500" />
                         <Mic size={16} className="text-stone-500" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Links Sidebar */}
        <div className="space-y-6">
          <div className="bg-stone-900 border-2 border-stone-800 p-6 rounded-xl metallic-border">
            <h3 className="horde-font text-xl text-red-600 uppercase mb-6 flex items-center gap-2">
              <ShieldAlert size={20} /> Enlaces de Interés
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {guildLinks.map(link => (
                <a 
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${link.color} p-4 rounded-lg flex items-center justify-between group hover:scale-[1.02] transition-all border border-black/20 shadow-lg`}
                >
                  <span className="font-bold text-white uppercase tracking-tighter">{link.name}</span>
                  <ExternalLink size={18} className="text-white/50 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          <div className="bg-stone-950 border border-stone-800 p-6 rounded-xl">
             <div className="flex items-center gap-2 text-red-700 font-bold uppercase text-xs mb-4">
                <Hash size={14} /> Anuncios del Warchief
             </div>
             <div className="space-y-4">
                <div className="border-l-2 border-red-900 pl-4 py-1">
                   <p className="text-stone-300 text-sm italic">"La próxima raid de Karazhan se retrasa 30 minutos por mantenimiento del server."</p>
                   <span className="text-[10px] text-stone-600">Hace 2 horas</span>
                </div>
                <div className="border-l-2 border-stone-800 pl-4 py-1">
                   <p className="text-stone-300 text-sm italic">"Bienvenidos a los nuevos reclutas de la Horda."</p>
                   <span className="text-[10px] text-stone-600">Ayer</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscordSection;
