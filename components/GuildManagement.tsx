
import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Search, UserPlus, SlidersHorizontal, ShieldCheck } from 'lucide-react';
import { Character, CharacterClass, Profession } from '../types';
import { CLASSES, PROFESSIONS, CLASS_COLORS, CLASS_ICONS, PROFESSION_ICONS } from '../constants';

interface Props {
  currentUser?: Character;
}

const GuildManagement: React.FC<Props> = ({ currentUser }) => {
  const [members, setMembers] = useState<Character[]>([
    { id: '1', name: 'Thrall', class: 'Chamán', level: 70, professions: ['Alquimia', 'Herboristería'] },
    { id: '2', name: 'Garrosh', class: 'Guerrero', level: 70, professions: ['Herrería', 'Minería'] },
  ]);

  useEffect(() => {
    if (currentUser && !members.find(m => m.id === currentUser.id)) {
      setMembers(prev => [currentUser, ...prev]);
    }
  }, [currentUser]);

  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [name, setName] = useState('');
  const [charClass, setCharClass] = useState<CharacterClass>('Guerrero');
  const [level, setLevel] = useState(70);
  const [selectedProfs, setSelectedProfs] = useState<Profession[]>([]);

  const addMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    const newMember: Character = {
      id: Date.now().toString(),
      name,
      class: charClass,
      level,
      professions: selectedProfs
    };
    setMembers([...members, newMember]);
    setName('');
    setSelectedProfs([]);
    setShowForm(false);
  };

  const removeMember = (id: string) => {
    if (currentUser && id === currentUser.id) {
        alert("No puedes expulsarte a ti mismo del roster.");
        return;
    }
    setMembers(members.filter(m => m.id !== id));
  };

  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-stone-800 pb-6">
        <div>
          <h2 className="text-3xl font-bold text-red-700 horde-font uppercase tracking-widest">Roster de Hermandad</h2>
          <p className="text-stone-400 italic">Administra los guerreros de tu facción</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="wow-button text-white px-6 py-3 rounded-md flex items-center gap-2 transition-all shadow-lg"
        >
          {showForm ? 'Cerrar' : <><UserPlus size={18} /> Reclutar Guerrero</>}
        </button>
      </div>

      {showForm && (
        <div className="bg-stone-900/50 p-6 rounded-lg metallic-border animate-slide-down">
          <form onSubmit={addMember} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-stone-400 mb-2 uppercase tracking-tighter">Nombre del Personaje</label>
              <input 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded p-2 text-stone-200 focus:outline-none focus:border-red-700" 
                placeholder="Ej: Grommash" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-400 mb-2 uppercase tracking-tighter">Clase</label>
              <select 
                value={charClass}
                onChange={(e) => setCharClass(e.target.value as CharacterClass)}
                className="w-full bg-stone-950 border border-stone-800 rounded p-2 text-stone-200 focus:outline-none focus:border-red-700"
              >
                {CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-400 mb-2 uppercase tracking-tighter">Nivel</label>
              <input 
                type="number"
                value={level}
                onChange={(e) => setLevel(parseInt(e.target.value))}
                min="1" max="70"
                className="w-full bg-stone-950 border border-stone-800 rounded p-2 text-stone-200 focus:outline-none focus:border-red-700"
              />
            </div>
            <div className="flex items-end">
              <button type="submit" className="w-full wow-button text-white py-2 rounded font-bold uppercase transition-colors">
                Añadir al Clan
              </button>
            </div>
            <div className="md:col-span-4">
              <label className="block text-sm font-medium text-stone-400 mb-3 uppercase tracking-tighter">Profesiones (Máx 2)</label>
              <div className="flex flex-wrap gap-2">
                {PROFESSIONS.map(p => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => {
                      if (selectedProfs.includes(p)) {
                        setSelectedProfs(selectedProfs.filter(sp => sp !== p));
                      } else if (selectedProfs.length < 2) {
                        setSelectedProfs([...selectedProfs, p]);
                      }
                    }}
                    className={`px-3 py-1.5 rounded text-[10px] flex items-center gap-2 font-bold transition-all border uppercase ${
                      selectedProfs.includes(p) 
                        ? 'bg-red-900 border-red-500 text-white shadow-lg' 
                        : 'bg-stone-950 border-stone-800 text-stone-500'
                    }`}
                  >
                    <img src={PROFESSION_ICONS[p]} className="w-4 h-4 rounded-sm" alt={p} />
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </form>
        </div>
      )}

      <div className="relative group max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500 group-focus-within:text-red-500 transition-colors" size={18} />
        <input 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar guerrero por nombre o clase..."
          className="w-full bg-stone-950 border-b-2 border-stone-800 py-3 pl-10 pr-4 text-stone-200 focus:outline-none focus:border-red-700 transition-all placeholder:text-stone-700"
        />
      </div>

      <div className="overflow-x-auto rounded-lg metallic-border">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-stone-900 border-b border-stone-800">
              <th className="p-4 text-stone-400 uppercase text-xs font-bold tracking-widest">Guerrero</th>
              <th className="p-4 text-stone-400 uppercase text-xs font-bold tracking-widest">Clase</th>
              <th className="p-4 text-stone-400 uppercase text-xs font-bold tracking-widest text-center">Nivel</th>
              <th className="p-4 text-stone-400 uppercase text-xs font-bold tracking-widest">Profesiones</th>
              <th className="p-4 text-stone-400 uppercase text-xs font-bold tracking-widest text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-800/50">
            {filteredMembers.map(member => (
              <tr key={member.id} className={`hover:bg-red-900/5 transition-colors group ${currentUser?.id === member.id ? 'bg-red-900/10' : ''}`}>
                <td className="p-4 font-bold text-stone-100 flex items-center gap-3">
                  <div className="relative">
                    <img src={CLASS_ICONS[member.class]} className="w-8 h-8 rounded border border-stone-700 shadow-md" alt={member.class} />
                    {currentUser?.id === member.id && (
                        <div className="absolute -top-1 -right-1 bg-yellow-600 w-3 h-3 rounded-full border border-stone-900 shadow-sm" />
                    )}
                  </div>
                  <span className="text-sm">{member.name}</span>
                </td>
                <td className={`p-4 font-bold text-xs ${CLASS_COLORS[member.class]} uppercase`}>{member.class}</td>
                <td className="p-4 text-center">
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${member.level === 70 ? 'bg-orange-900/40 text-orange-400 border border-orange-800' : 'bg-stone-800 text-stone-400'}`}>
                    {member.level}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    {member.professions.map(p => (
                      <div key={p} className="flex items-center gap-1.5 bg-stone-950 text-stone-400 px-2 py-0.5 rounded border border-stone-800 group-hover:border-stone-600 transition-colors">
                        <img src={PROFESSION_ICONS[p]} className="w-3.5 h-3.5 rounded-sm" alt={p} />
                        <span className="text-[9px] uppercase font-bold">{p}</span>
                      </div>
                    ))}
                  </div>
                </td>
                <td className="p-4 text-right">
                  <button 
                    onClick={() => removeMember(member.id)}
                    className={`text-stone-600 hover:text-red-600 transition-colors p-2 ${currentUser?.id === member.id ? 'opacity-20 cursor-not-allowed' : ''}`}
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GuildManagement;
