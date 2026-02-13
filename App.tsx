
import React, { useState, useEffect } from 'react';
import { Shield, Users, Database, Calendar as CalendarIcon, MessageSquare, BookOpen, Menu, X, UserPlus, Flame, LogOut, Newspaper, ExternalLink, GraduationCap } from 'lucide-react';
import GuildManagement from './components/GuildManagement';
import DKPManagement from './components/DKPManagement';
import CalendarSection from './components/CalendarSection';
import DiscordSection from './components/DiscordSection';
import ForumSection from './components/ForumSection';
import NewsSection from './components/NewsSection';
import ClassGuides from './components/ClassGuides';
import { Character, CharacterClass, Profession } from './types';
import { CLASSES, PROFESSIONS } from './constants';

type Tab = 'home' | 'guild' | 'dkp' | 'calendar' | 'discord' | 'forum' | 'news' | 'guides';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [registeredUser, setRegisteredUser] = useState<Character | null>(null);
  
  const [regName, setRegName] = useState('');
  const [regClass, setRegClass] = useState<CharacterClass>('Guerrero');
  const [regLevel, setRegLevel] = useState(70);
  const [regProfs, setRegProfs] = useState<Profession[]>([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('horde_guild_user');
    if (savedUser) {
      setRegisteredUser(JSON.parse(savedUser));
    }
  }, []);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName) return;
    
    const newUser: Character = {
      id: 'main-' + Date.now(),
      name: regName,
      class: regClass,
      level: regLevel,
      professions: regProfs
    };
    
    setRegisteredUser(newUser);
    localStorage.setItem('horde_guild_user', JSON.stringify(newUser));
  };

  const logout = () => {
    localStorage.removeItem('horde_guild_user');
    setRegisteredUser(null);
    setActiveTab('home');
  };

  const navigation = [
    { id: 'home', label: 'Inicio', icon: Shield },
    { id: 'news', label: 'Noticias', icon: Newspaper },
    { id: 'guides', label: 'Guías de Clase', icon: GraduationCap },
    { id: 'guild', label: 'Hermandad', icon: Users },
    { id: 'dkp', label: 'DKP System', icon: Database },
    { id: 'calendar', label: 'Calendario', icon: CalendarIcon },
    { id: 'forum', label: 'Foro de Guerra', icon: BookOpen },
    { id: 'discord', label: 'Discord', icon: MessageSquare },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'news': return <NewsSection />;
      case 'guides': return <ClassGuides />;
      case 'guild': return <GuildManagement currentUser={registeredUser} />;
      case 'dkp': return <DKPManagement />;
      case 'calendar': return <CalendarSection />;
      case 'discord': return <DiscordSection />;
      case 'forum': return <ForumSection currentUser={registeredUser} />;
      default: return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-10 animate-fade-in relative">
          <div className="relative group">
            <div className="absolute inset-0 bg-red-900/20 blur-3xl rounded-full scale-150 animate-pulse"></div>
            <img 
              src="https://i.imgur.com/HxnX4qr.png" 
              alt="Horde Guild Logo" 
              className="w-72 h-72 md:w-96 md:h-96 object-contain guild-banner-glow group-hover:scale-110 transition-transform duration-700 relative z-10"
            />
          </div>
          <div className="space-y-4 relative z-10">
            <h1 className="text-6xl md:text-8xl horde-font text-red-700 tracking-tighter uppercase drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]">
              La Horda Ibérica
            </h1>
            <p className="text-2xl text-stone-400 max-w-2xl mx-auto italic font-medium">
               "Honor y Gloria para {registeredUser?.name} y todos sus hermanos de armas."
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 w-full max-w-lg relative z-10">
            <button 
              onClick={() => setActiveTab('guild')}
              className="group px-8 py-5 wow-button text-red-100 rounded-lg flex items-center justify-center gap-4 metallic-border border-2 border-[#7a633a]"
            >
              <Users size={28} className="group-hover:scale-125 transition-transform" /> 
              <span className="horde-font text-xl uppercase tracking-widest">Roster del Clan</span>
            </button>
            <button 
              onClick={() => setActiveTab('forum')}
              className="group px-8 py-5 bg-stone-900/80 border-2 border-stone-800 text-stone-200 hover:bg-stone-800 transition-all metallic-border rounded-lg flex items-center justify-center gap-4"
            >
              <BookOpen size={28} className="group-hover:scale-125 transition-transform" /> 
              <span className="horde-font text-xl uppercase tracking-widest">Tablón de Guerra</span>
            </button>
          </div>
        </div>
      );
    }
  };

  if (!registeredUser) {
    return (
      <div className="min-h-screen horde-gradient flex items-center justify-center p-4">
        <div className="max-w-xl w-full bg-stone-950 border-2 border-stone-800 rounded-xl p-8 metallic-border shadow-2xl animate-fade-in relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 opacity-10 pointer-events-none">
             <img src="https://wow.zamimg.com/images/wow/icons/large/inv_banner_03.jpg" alt="" className="w-full h-full object-contain" />
          </div>
          
          <div className="flex flex-col items-center mb-8 relative">
             <img 
              src="https://i.imgur.com/HxnX4qr.png" 
              alt="Guild Shield" 
              className="w-48 h-48 object-contain mb-4 guild-banner-glow animate-subtle-pulse"
            />
            <h1 className="text-4xl horde-font text-red-700 uppercase tracking-widest text-center">Registro de Guerrero</h1>
            <p className="text-stone-500 italic mt-2 text-center text-sm">"Inscribe tu nombre en los anales del Jefe de Guerra"</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-[0.2em] mb-2">Nombre del Personaje</label>
                <input 
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  className="w-full bg-stone-900/80 border-2 border-stone-800 rounded-md p-4 text-stone-100 focus:outline-none focus:border-red-700 transition-all placeholder:text-stone-700 font-bold" 
                  placeholder="Introduce tu nombre..." 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-[0.2em] mb-2">Clase TBC</label>
                  <select 
                    value={regClass}
                    onChange={(e) => setRegClass(e.target.value as CharacterClass)}
                    className="w-full bg-stone-900 border-2 border-stone-800 rounded-md p-4 text-stone-200 focus:outline-none focus:border-red-700 font-bold appearance-none cursor-pointer"
                  >
                    {CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-[0.2em] mb-2">Nivel</label>
                  <input 
                    type="number"
                    value={regLevel}
                    onChange={(e) => setRegLevel(parseInt(e.target.value))}
                    min="1" max="70"
                    className="w-full bg-stone-900 border-2 border-stone-800 rounded-md p-4 text-stone-200 focus:outline-none focus:border-red-700 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-[0.2em] mb-3">Profesiones Primarias (Máx 2)</label>
                <div className="flex flex-wrap gap-2">
                  {PROFESSIONS.map(p => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => {
                        if (regProfs.includes(p)) {
                          setRegProfs(regProfs.filter(sp => sp !== p));
                        } else if (regProfs.length < 2) {
                          setRegProfs([...regProfs, p]);
                        }
                      }}
                      className={`px-3 py-2 rounded text-[9px] font-bold transition-all border uppercase tracking-tighter ${
                        regProfs.includes(p) 
                          ? 'bg-red-900 border-red-500 text-white shadow-lg' 
                          : 'bg-stone-900 border-stone-800 text-stone-600 hover:text-stone-400'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full wow-button text-white py-5 rounded-lg font-bold uppercase tracking-[0.3em] transition-all shadow-2xl group relative overflow-hidden border-2 border-[#7a633a]"
            >
              <span className="relative z-10 flex items-center justify-center gap-3 text-lg">
                <Flame size={24} className="group-hover:animate-bounce" /> ¡LOK'TAR OGAR!
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
          </form>
          
          <div className="mt-8 text-center border-t border-stone-800/50 pt-4 flex justify-between items-center px-2">
            <span className="text-[9px] text-stone-700 uppercase font-bold tracking-widest">Outland Region - TBC v2.4.3</span>
            <div className="flex gap-2">
               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
               <span className="text-[9px] text-stone-700 uppercase font-bold tracking-widest">Servidor Online</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen horde-gradient text-stone-200">
      <aside className="fixed left-0 top-0 h-full w-20 lg:w-64 bg-stone-950 border-r-2 border-stone-800 hidden md:flex flex-col z-50">
        <div className="p-6 flex items-center gap-4 border-b border-stone-900">
          <img src="https://wow.zamimg.com/images/wow/icons/large/inv_banner_03.jpg" className="w-10 h-10 rounded border border-[#7a633a] shadow-lg guild-banner-glow" alt="Horde Banner" />
          <span className="horde-font text-xl text-red-700 hidden lg:block uppercase tracking-widest">Warchief</span>
        </div>
        <nav className="flex-1 px-3 py-10 space-y-6">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as Tab)}
              className={`w-full flex items-center gap-4 p-4 rounded-lg transition-all duration-300 group ${
                activeTab === item.id 
                  ? 'bg-red-950/40 border-l-4 border-red-700 text-red-500 shadow-[inset_0_0_15px_rgba(139,0,0,0.2)]' 
                  : 'hover:bg-stone-900 text-stone-500 hover:text-red-400'
              }`}
            >
              <item.icon size={26} className={`${activeTab === item.id ? 'animate-pulse' : ''}`} />
              <span className="hidden lg:block font-bold uppercase text-xs tracking-[0.1em]">{item.label}</span>
            </button>
          ))}
        </nav>
        
        <div className="p-4 border-t border-stone-900 bg-stone-950">
          <div className="bg-stone-900/80 p-4 rounded-lg flex items-center gap-4 border border-stone-800 group hover:border-red-900 transition-all shadow-xl">
            <div className="w-10 h-10 rounded bg-red-950 flex items-center justify-center text-red-500 font-bold border-2 border-red-900 shadow-lg">
              {registeredUser.name[0]}
            </div>
            <div className="hidden lg:block overflow-hidden flex-1">
              <p className="text-sm font-bold text-stone-100 truncate uppercase tracking-tighter">{registeredUser.name}</p>
              <button 
                onClick={logout} 
                className="flex items-center gap-1 text-[9px] text-stone-600 hover:text-red-500 font-bold uppercase tracking-widest transition-colors mt-1"
              >
                <LogOut size={10} /> Abandonar
              </button>
            </div>
          </div>
        </div>
      </aside>

      <nav className="md:hidden sticky top-0 bg-stone-950 p-4 border-b border-stone-800 flex justify-between items-center z-50 shadow-2xl">
        <div className="flex items-center gap-3">
          <img src="https://wow.zamimg.com/images/wow/icons/large/inv_banner_03.jpg" className="w-8 h-8 rounded guild-banner-glow" alt="Horde Banner" />
          <span className="horde-font text-xl text-red-700 uppercase">Warchief</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
          {isMobileMenuOpen ? <X className="text-red-500" size={32} /> : <Menu className="text-red-500" size={32} />}
        </button>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-stone-950 z-40 pt-24 px-8 space-y-8 md:hidden overflow-y-auto">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id as Tab);
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left text-3xl horde-font text-red-700 flex items-center gap-6 py-6 border-b border-stone-900 group"
            >
              <item.icon size={32} />
              {item.label}
            </button>
          ))}
          <button onClick={logout} className="w-full text-left text-stone-600 uppercase font-bold text-xl py-8">Desconectar</button>
        </div>
      )}

      <main className="md:pl-20 lg:pl-64 pt-6 md:pt-0 min-h-screen">
        <div className="max-w-7xl mx-auto p-4 md:p-12">
          {renderContent()}
        </div>
      </main>

      <footer className="md:pl-20 lg:pl-64 py-12 text-center text-stone-700 text-[10px] border-t border-stone-900 mt-20 uppercase font-bold tracking-[0.4em]">
         Lok'tar Ogar - La Horda Ibérica Guild Manager - 2024
      </footer>
    </div>
  );
};

export default App;
