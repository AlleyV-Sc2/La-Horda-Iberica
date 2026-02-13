
import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Plus, 
  ArrowLeft, 
  User, 
  ChevronRight, 
  Search, 
  Flame, 
  Sword, 
  Skull, 
  Ghost 
} from 'lucide-react';
import { ForumCategory, ForumThread, ForumPost, Character } from '../types';

interface Props {
  currentUser?: Character;
}

const ForumSection: React.FC<Props> = ({ currentUser }) => {
  const CATEGORIES: ForumCategory[] = [
    { id: 'cat1', name: 'Estrategias de Raid', description: 'Tácticas para Karazhan, Gruul y más.', icon: 'https://wow.zamimg.com/images/wow/icons/large/inv_helmet_06.jpg' },
    { id: 'cat2', name: 'Campo de Batalla (PVP)', description: 'Honor, arenas y coordinación de guerra.', icon: 'https://wow.zamimg.com/images/wow/icons/large/inv_banner_03.jpg' },
    { id: 'cat3', name: 'Taberna General', description: 'Social, humor y charlas del mundo.', icon: 'https://wow.zamimg.com/images/wow/icons/large/inv_misc_bowl_01.jpg' },
    { id: 'cat4', name: 'Reclutamiento', description: 'Nuevos aspirantes a la horda.', icon: 'https://wow.zamimg.com/images/wow/icons/large/inv_scroll_03.jpg' },
  ];

  // Lista de avatares verificados de WoW (JPG es el estándar más común en Zamimg)
  const AVATARS = [
    'https://wow.zamimg.com/images/wow/icons/large/achievement_character_orc_male.jpg',
    'https://wow.zamimg.com/images/wow/icons/large/achievement_character_undead_female.jpg',
    'https://wow.zamimg.com/images/wow/icons/large/achievement_character_troll_male.jpg',
    'https://wow.zamimg.com/images/wow/icons/large/achievement_character_tauren_male.jpg',
    'https://wow.zamimg.com/images/wow/icons/large/inv_misc_head_bloodelf_01.jpg',
    'https://wow.zamimg.com/images/wow/icons/large/inv_misc_head_orc_01.jpg',
    'https://wow.zamimg.com/images/wow/icons/large/inv_helmet_08.jpg',
    'https://wow.zamimg.com/images/wow/icons/large/inv_helmet_10.jpg',
    'https://wow.zamimg.com/images/wow/icons/large/inv_misc_head_naga_01.jpg',
    'https://wow.zamimg.com/images/wow/icons/large/classicon_warrior.jpg',
    'https://wow.zamimg.com/images/wow/icons/large/classicon_shaman.jpg',
    'https://wow.zamimg.com/images/wow/icons/large/classicon_warlock.jpg',
    'https://wow.zamimg.com/images/wow/icons/large/classicon_priest.jpg',
    'https://wow.zamimg.com/images/wow/icons/large/classicon_hunter.jpg',
    'https://wow.zamimg.com/images/wow/icons/large/classicon_mage.jpg',
    'https://wow.zamimg.com/images/wow/icons/large/classicon_rogue.jpg',
    'https://wow.zamimg.com/images/wow/icons/large/classicon_druid.jpg',
    'https://wow.zamimg.com/images/wow/icons/large/classicon_paladin.jpg',
    'https://wow.zamimg.com/images/wow/icons/large/spell_nature_bloodlust.jpg',
    'https://wow.zamimg.com/images/wow/icons/large/spell_fire_fireball02.jpg',
    'https://wow.zamimg.com/images/wow/icons/large/spell_holy_powerwordshield.jpg',
    'https://wow.zamimg.com/images/wow/icons/large/spell_shadow_shadowwordpain.jpg',
    'https://wow.zamimg.com/images/wow/icons/large/ability_warrior_decisivestrike.jpg',
    'https://wow.zamimg.com/images/wow/icons/large/ability_rogue_eviscerate.jpg',
    'https://wow.zamimg.com/images/wow/icons/large/spell_nature_lightning.jpg',
    'https://wow.zamimg.com/images/wow/icons/large/inv_helmet_01.jpg',
    'https://wow.zamimg.com/images/wow/icons/large/inv_helmet_02.jpg',
    'https://wow.zamimg.com/images/wow/icons/large/inv_helmet_03.jpg',
    'https://wow.zamimg.com/images/wow/icons/large/inv_helmet_04.jpg',
    'https://wow.zamimg.com/images/wow/icons/large/inv_helmet_05.jpg',
    'https://wow.zamimg.com/images/wow/icons/large/inv_helmet_24.jpg',
    'https://wow.zamimg.com/images/wow/icons/large/inv_helmet_31.jpg',
    'https://wow.zamimg.com/images/wow/icons/large/inv_helmet_46.jpg',
    'https://wow.zamimg.com/images/wow/icons/large/inv_helmet_52.jpg',
    'https://wow.zamimg.com/images/wow/icons/large/inv_helmet_71.jpg',
    'https://wow.zamimg.com/images/wow/icons/large/inv_helmet_74.jpg',
    'https://wow.zamimg.com/images/wow/icons/large/inv_helmet_95.jpg',
    'https://wow.zamimg.com/images/wow/icons/large/inv_helmet_145.jpg',
    'https://wow.zamimg.com/images/wow/icons/large/inv_misc_head_dragon_01.jpg',
    'https://wow.zamimg.com/images/wow/icons/large/inv_banner_03.jpg',
    'https://wow.zamimg.com/images/wow/icons/large/inv_sword_39.jpg',
    'https://wow.zamimg.com/images/wow/icons/large/inv_axe_04.jpg',
    'https://wow.zamimg.com/images/wow/icons/large/inv_mace_02.jpg',
    'https://wow.zamimg.com/images/wow/icons/large/inv_staff_13.jpg',
    'https://wow.zamimg.com/images/wow/icons/large/inv_shield_04.jpg',
    'https://wow.zamimg.com/images/wow/icons/large/inv_misc_gem_01.jpg',
    'https://wow.zamimg.com/images/wow/icons/large/spell_nature_earthbindtotem.jpg',
    'https://wow.zamimg.com/images/wow/icons/large/spell_shadow_unholyfrenzy.jpg',
    'https://wow.zamimg.com/images/wow/icons/large/spell_fire_soulburn.jpg',
    'https://wow.zamimg.com/images/wow/icons/large/ability_creature_disease_05.jpg',
    'https://wow.zamimg.com/images/wow/icons/large/spell_shadow_deathanddecay.jpg',
    'https://wow.zamimg.com/images/wow/icons/large/inv_misc_head_troll_01.jpg',
    'https://wow.zamimg.com/images/wow/icons/large/inv_misc_head_tauren_01.jpg',
    'https://wow.zamimg.com/images/wow/icons/large/inv_misc_head_undead_01.jpg'
  ];

  const [userProfile, setUserProfile] = useState<{name: string, avatar: string}>({
    name: currentUser?.name || 'Invitado',
    avatar: AVATARS[0]
  });

  useEffect(() => {
    if (currentUser) {
        setUserProfile(prev => ({ ...prev, name: currentUser.name }));
    }
  }, [currentUser]);

  const [threads, setThreads] = useState<ForumThread[]>([
    {
      id: 't1',
      categoryId: 'cat1',
      title: 'Táctica para el Príncipe Malchezaar',
      authorName: 'Thrall',
      date: '18/05/2024, 14:00',
      posts: [
        { id: 'p1', authorName: 'Thrall', authorAvatar: 'https://wow.zamimg.com/images/wow/icons/large/inv_misc_head_orc_01.jpg', content: 'Necesitamos posicionar los infernales lejos de la puerta principal.', date: '18/05/2024, 14:00' },
        { id: 'p2', authorName: 'Garrosh', authorAvatar: 'https://wow.zamimg.com/images/wow/icons/large/inv_helmet_01.jpg', content: 'Yo tanquearé el segundo si es necesario.', date: '18/05/2024, 14:30' }
      ]
    },
    {
      id: 't2',
      categoryId: 'cat3',
      title: '¿Cuál es la mejor zona para farmear oro?',
      authorName: 'Sylvanas',
      date: '19/05/2024, 10:00',
      posts: [
        { id: 'p3', authorName: 'Sylvanas', authorAvatar: 'https://wow.zamimg.com/images/wow/icons/large/achievement_character_undead_female.jpg', content: 'Valle Sombraluna parece lo mejor ahora mismo.', date: '19/05/2024, 10:00' }
      ]
    }
  ]);

  const [view, setView] = useState<'categories' | 'threadList' | 'threadDetail'>('categories');
  const [selectedCategory, setSelectedCategory] = useState<ForumCategory | null>(null);
  const [selectedThread, setSelectedThread] = useState<ForumThread | null>(null);
  const [showNewThreadForm, setShowNewThreadForm] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const [newThreadTitle, setNewThreadTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');

  const openCategory = (cat: ForumCategory) => {
    setSelectedCategory(cat);
    setView('threadList');
  };

  const openThread = (thread: ForumThread) => {
    setSelectedThread(thread);
    setView('threadDetail');
  };

  const goBack = () => {
    if (view === 'threadDetail') setView('threadList');
    else if (view === 'threadList') setView('categories');
  };

  const createThread = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newThreadTitle || !selectedCategory) return;
    
    const newThread: ForumThread = {
      id: Date.now().toString(),
      categoryId: selectedCategory.id,
      title: newThreadTitle,
      authorName: userProfile.name,
      date: new Date().toLocaleString(),
      posts: [{
        id: 'p' + Date.now(),
        authorName: userProfile.name,
        authorAvatar: userProfile.avatar,
        content: newPostContent || 'Hilo iniciado.',
        date: new Date().toLocaleString()
      }]
    };

    setThreads([newThread, ...threads]);
    setNewThreadTitle('');
    setNewPostContent('');
    setShowNewThreadForm(false);
    openThread(newThread);
  };

  const addReply = () => {
    if (!newPostContent || !selectedThread) return;
    const updatedThreads = threads.map(t => {
      if (t.id === selectedThread.id) {
        const newPost: ForumPost = {
          id: 'p' + Date.now(),
          authorName: userProfile.name,
          authorAvatar: userProfile.avatar,
          content: newPostContent,
          date: new Date().toLocaleString()
        };
        return { ...t, posts: [...t.posts, newPost] };
      }
      return t;
    });
    setThreads(updatedThreads);
    setSelectedThread({
      ...selectedThread,
      posts: [...selectedThread.posts, {
        id: 'p' + Date.now(),
        authorName: userProfile.name,
        authorAvatar: userProfile.avatar,
        content: newPostContent,
        date: new Date().toLocaleString()
      }]
    });
    setNewPostContent('');
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // Fallback simple si falla la carga de un icono
    e.currentTarget.src = 'https://wow.zamimg.com/images/wow/icons/large/inv_misc_questionmark.jpg';
  };

  return (
    <div className="space-y-6 animate-fade-in relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-stone-800 pb-6">
        <div className="flex items-center gap-4">
          {(view !== 'categories') && (
            <button onClick={goBack} className="p-2 bg-stone-900 rounded-full text-red-600 hover:bg-stone-800 transition-colors border border-stone-800">
              <ArrowLeft size={20} />
            </button>
          )}
          <div>
            <h2 className="text-3xl font-bold text-red-700 horde-font uppercase tracking-widest">Foro de Guerra</h2>
            <p className="text-stone-400 italic">Comunicación oficial entre hermanos</p>
          </div>
        </div>
        <button 
          onClick={() => setShowProfileModal(true)}
          className="flex items-center gap-3 bg-stone-900 px-4 py-2 rounded-lg border border-stone-800 hover:border-red-900 transition-all group metallic-border"
        >
          <div className="relative">
            <img 
                src={userProfile.avatar} 
                onError={handleImageError}
                className="w-10 h-10 rounded-sm border border-red-900 shadow-[0_0_8px_rgba(255,0,0,0.3)]" alt="Avatar" 
            />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-stone-900 shadow-sm" />
          </div>
          <div className="text-left">
            <p className="text-[10px] text-stone-500 font-bold uppercase tracking-widest">Identidad</p>
            <p className="text-sm font-bold text-stone-200 group-hover:text-red-500 transition-colors uppercase tracking-tighter">{userProfile.name}</p>
          </div>
        </button>
      </div>

      {view !== 'categories' && (
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-600">
          <button onClick={() => setView('categories')} className="hover:text-red-700">ÍNDICE</button>
          <ChevronRight size={14} />
          <button onClick={() => setView('threadList')} className={`${view === 'threadList' ? 'text-red-600' : 'hover:text-red-700'}`}>
            {selectedCategory?.name}
          </button>
          {view === 'threadDetail' && (
            <>
              <ChevronRight size={14} />
              <span className="text-stone-400">{selectedThread?.title}</span>
            </>
          )}
        </div>
      )}

      {view === 'categories' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => openCategory(cat)}
              className="bg-stone-950 border-2 border-stone-800 rounded-xl p-6 flex gap-6 text-left hover:border-red-900 hover:bg-red-900/5 transition-all group metallic-border overflow-hidden"
            >
              <div className="bg-stone-900 p-1 rounded-sm border border-stone-700 group-hover:border-red-900 group-hover:scale-105 transition-all h-fit">
                <img src={cat.icon} className="w-16 h-16 rounded-sm shadow-xl" alt={cat.name} />
              </div>
              <div className="flex-1">
                <h3 className="horde-font text-xl text-stone-200 group-hover:text-red-600 transition-colors uppercase tracking-tighter">{cat.name}</h3>
                <p className="text-stone-500 text-sm mt-1">{cat.description}</p>
                <div className="flex gap-4 mt-4">
                  <span className="text-[10px] font-bold text-stone-700 uppercase">{threads.filter(t => t.categoryId === cat.id).length} Hilos</span>
                  <span className="text-[10px] font-bold text-red-900 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity font-mono">Entrar >>></span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {view === 'threadList' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-stone-900/40 p-4 rounded-lg border border-stone-800 metallic-border">
             <div className="flex items-center gap-4">
                <img src={selectedCategory?.icon} className="w-10 h-10 border border-stone-700 rounded-sm" alt="icon" />
                <h3 className="horde-font text-xl text-red-600 uppercase tracking-widest">{selectedCategory?.name}</h3>
             </div>
             <button onClick={() => setShowNewThreadForm(true)} className="wow-button text-white px-5 py-2 rounded flex items-center gap-2 text-sm font-bold uppercase">
                <Plus size={16} /> Crear Hilo
             </button>
          </div>

          <div className="bg-stone-950 rounded-lg overflow-hidden border border-stone-800 shadow-2xl">
            <table className="w-full text-left">
              <thead className="bg-stone-900 border-b border-stone-800">
                <tr>
                  <th className="p-4 text-[10px] font-bold text-stone-500 uppercase tracking-widest">Tema de Guerra</th>
                  <th className="p-4 text-[10px] font-bold text-stone-500 uppercase tracking-widest hidden md:table-cell">Autor</th>
                  <th className="p-4 text-[10px] font-bold text-stone-500 uppercase tracking-widest text-right">Msg</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-900">
                {threads.filter(t => t.categoryId === selectedCategory?.id).map(thread => (
                  <tr key={thread.id} onClick={() => openThread(thread)} className="hover:bg-red-900/5 cursor-pointer group">
                    <td className="p-4">
                      <div className="text-stone-200 font-bold group-hover:text-red-500 transition-colors text-sm uppercase tracking-tight">{thread.title}</div>
                      <div className="text-[10px] text-stone-600 mt-1 uppercase">Fecha: {thread.date}</div>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <span className="text-stone-400 font-bold text-xs uppercase tracking-tighter">{thread.authorName}</span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="bg-stone-900 px-3 py-1 rounded-sm text-xs text-stone-500 inline-block font-mono border border-stone-800">
                        {thread.posts.length - 1}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {view === 'threadDetail' && selectedThread && (
        <div className="space-y-6">
          <div className="bg-stone-900/50 p-6 rounded-t-xl border-x border-t border-stone-800 border-b-2 border-red-900 metallic-border">
            <h3 className="horde-font text-2xl text-stone-100 uppercase tracking-widest">{selectedThread.title}</h3>
            <p className="text-stone-500 text-[10px] mt-2 uppercase tracking-[0.3em]">Destacamento: {selectedCategory?.name}</p>
          </div>

          <div className="space-y-4">
            {selectedThread.posts.map((post, idx) => (
              <div key={post.id} className="flex flex-col md:flex-row gap-4 bg-stone-950 border border-stone-800 rounded-lg overflow-hidden group shadow-lg">
                <div className="w-full md:w-48 bg-stone-900/50 p-4 flex flex-row md:flex-col items-center gap-4 border-b md:border-b-0 md:border-r border-stone-800">
                  <div className="relative">
                    <img 
                        src={post.authorAvatar} 
                        onError={handleImageError}
                        className="w-16 h-16 rounded-sm border border-stone-700 shadow-xl" alt="Avatar" 
                    />
                    <div className="absolute -top-1 -right-1 bg-red-800 text-[8px] px-1.5 py-0.5 font-bold rounded-sm border border-red-500 uppercase">LV 70</div>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-red-600 group-hover:text-red-500 text-sm uppercase tracking-tight">{post.authorName}</p>
                    <p className="text-[8px] text-stone-600 font-bold uppercase tracking-widest mt-1">Soldado de la Horda</p>
                  </div>
                </div>
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div className="text-stone-300 leading-relaxed whitespace-pre-wrap text-sm italic">
                    {post.content}
                  </div>
                  <div className="mt-8 pt-4 border-t border-stone-900 flex justify-between items-center text-[9px] text-stone-700 font-bold uppercase tracking-[0.2em]">
                    <span>Fecha: {post.date}</span>
                    <span className="bg-stone-900 px-2 py-0.5 rounded">MSG #{idx + 1}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-stone-900/30 p-6 rounded-lg border border-stone-800 metallic-border shadow-2xl">
            <h4 className="horde-font text-lg text-stone-400 mb-4 uppercase tracking-widest">Enviar Mensaje</h4>
            <textarea 
              rows={4}
              value={newPostContent}
              onChange={e => setNewPostContent(e.target.value)}
              className="w-full bg-stone-950 border border-stone-800 p-4 rounded text-stone-200 focus:outline-none focus:border-red-900 transition-colors italic text-sm"
              placeholder="Escribe tu mensaje por la horda..."
            />
            <div className="flex justify-end mt-4">
              <button 
                onClick={addReply}
                disabled={!newPostContent}
                className="wow-button disabled:opacity-50 text-white px-10 py-3 rounded font-bold uppercase transition-all shadow-lg tracking-widest"
              >
                Enviar Respuesta
              </button>
            </div>
          </div>
        </div>
      )}

      {showProfileModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-4">
           <div className="bg-stone-950 border-2 border-stone-800 w-full max-w-2xl rounded-2xl p-8 metallic-border shadow-2xl animate-scale-in flex flex-col max-h-[90vh]">
              <h3 className="horde-font text-2xl text-red-700 uppercase mb-8 text-center tracking-widest shrink-0">Ajustes del Guerrero</h3>
              
              <div className="flex-1 overflow-y-auto pr-4 space-y-8 custom-scrollbar">
                <div className="text-center p-4 bg-stone-900/50 rounded border border-stone-800 shrink-0">
                    <p className="text-xs font-bold text-stone-500 uppercase tracking-widest block mb-1">Nombre Registrado</p>
                    <p className="text-2xl font-bold text-stone-100 uppercase tracking-tighter">{userProfile.name}</p>
                </div>

                <div className="space-y-4">
                   <label className="text-xs font-bold text-stone-500 uppercase tracking-widest block text-center">Colección de Emblemas de Guerra</label>
                   <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
                      {AVATARS.map((av, i) => (
                        <button
                          key={i}
                          onClick={() => setUserProfile({ ...userProfile, avatar: av })}
                          className={`relative group p-0.5 rounded-sm border-2 transition-all hover:scale-110 active:scale-95 ${
                            userProfile.avatar === av 
                            ? 'border-red-600 shadow-[0_0_15px_rgba(255,0,0,0.5)] z-10' 
                            : 'border-stone-800 grayscale opacity-40 hover:opacity-100 hover:grayscale-0'
                          }`}
                        >
                          <img 
                            src={av} 
                            onError={handleImageError}
                            className="w-full h-auto rounded-sm" alt={`Avatar ${i}`} 
                          />
                          {userProfile.avatar === av && (
                            <div className="absolute -top-1 -right-1 bg-red-600 w-2 h-2 rounded-full border border-stone-950 animate-pulse" />
                          )}
                        </button>
                      ))}
                   </div>
                </div>
              </div>

              <div className="mt-8 flex justify-center shrink-0 border-t border-stone-800 pt-6">
                <button 
                  onClick={() => setShowProfileModal(false)}
                  className="wow-button text-white px-16 py-4 rounded-full font-bold uppercase transition-all tracking-widest shadow-2xl shadow-red-950/60 border-2 border-[#7a633a]"
                >
                  Guardar Perfil
                </button>
              </div>
           </div>
        </div>
      )}

      {showNewThreadForm && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-stone-900 border-2 border-stone-800 w-full max-w-xl rounded-xl p-8 metallic-border shadow-2xl animate-scale-in">
             <h3 className="horde-font text-2xl text-red-700 uppercase mb-8 flex items-center gap-2 tracking-widest">
                <Plus className="text-red-600" /> Nuevo Tema de Guerra
             </h3>
             <form onSubmit={createThread} className="space-y-6">
                <div>
                   <label className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-2 block">Título del Hilo</label>
                   <input 
                     autoFocus
                     value={newThreadTitle}
                     onChange={e => setNewThreadTitle(e.target.value)}
                     className="w-full bg-stone-950 border border-stone-800 p-3 rounded text-stone-100 focus:outline-none focus:border-red-900 text-sm font-bold uppercase tracking-tight"
                     placeholder="EJ: ASALTO A LA GUARIDA DE GRUUL"
                   />
                </div>
                <div>
                   <label className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-2 block">Cuerpo del Mensaje</label>
                   <textarea 
                     rows={6}
                     value={newPostContent}
                     onChange={e => setNewPostContent(e.target.value)}
                     className="w-full bg-stone-950 border border-stone-800 p-4 rounded text-stone-200 focus:outline-none focus:border-red-900 text-sm italic"
                     placeholder="Escribe las directrices o motivos del tema..."
                   />
                </div>
                <div className="flex gap-4 pt-4">
                   <button type="button" onClick={() => setShowNewThreadForm(false)} className="flex-1 py-3 text-stone-600 font-bold uppercase hover:text-stone-300 transition-colors tracking-widest">Cancelar</button>
                   <button type="submit" disabled={!newThreadTitle} className="flex-[2] wow-button text-white py-3 rounded font-bold uppercase shadow-lg tracking-widest transition-all">Publicar Tema</button>
                </div>
             </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForumSection;
