
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, MapPin, Clock, Info } from 'lucide-react';
import { GuildEvent } from '../types';

const CalendarSection: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<GuildEvent[]>([
    { id: '1', title: 'Raid: Karazhan', date: '2024-05-20', time: '21:00', description: 'Atila, Curas y DPS ready.', type: 'Raid' },
    { id: '2', title: 'Reunión de Oficiales', date: '2024-05-18', time: '19:00', description: 'Discusión de DKP.', type: 'Reunión' },
  ]);
  const [showAddEvent, setShowAddEvent] = useState(false);
  
  // New Event Form
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('21:00');
  const [newType, setNewType] = useState<GuildEvent['type']>('Raid');

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const addEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDate) return;
    const ev: GuildEvent = {
      id: Date.now().toString(),
      title: newTitle,
      date: newDate,
      time: newTime,
      type: newType,
      description: 'Evento creado manualmente'
    };
    setEvents([...events, ev]);
    setNewTitle('');
    setShowAddEvent(false);
  };

  const renderCalendar = () => {
    const days = [];
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const totalDays = daysInMonth(year, month);
    const startDay = firstDayOfMonth(year, month);

    // Empty spaces for start day
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 md:h-32 bg-stone-900/20 border border-stone-800/30" />);
    }

    // Days with events
    for (let d = 1; d <= totalDays; d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const dayEvents = events.filter(e => e.date === dateStr);
      const isToday = new Date().toISOString().split('T')[0] === dateStr;

      days.push(
        <div key={d} className={`h-24 md:h-32 border border-stone-800 p-2 relative group overflow-hidden ${isToday ? 'bg-red-950/10' : 'bg-stone-950/40'}`}>
          <span className={`text-sm font-bold ${isToday ? 'text-red-500 bg-red-900/20 px-1.5 rounded' : 'text-stone-600'}`}>
            {d}
          </span>
          <div className="mt-1 space-y-1 overflow-y-auto h-[calc(100%-1.5rem)]">
            {dayEvents.map(ev => (
              <div 
                key={ev.id} 
                className={`text-[9px] md:text-[10px] p-1 rounded truncate border ${
                  ev.type === 'Raid' ? 'bg-red-900/40 border-red-700 text-red-100' : 
                  ev.type === 'PVP' ? 'bg-blue-900/40 border-blue-700 text-blue-100' :
                  'bg-stone-800 border-stone-600 text-stone-300'
                }`}
              >
                <span className="font-bold">{ev.time}</span> {ev.title}
              </div>
            ))}
          </div>
          <button 
            onClick={() => {
              setNewDate(dateStr);
              setShowAddEvent(true);
            }}
            className="absolute bottom-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-stone-800 p-1 rounded text-stone-400 hover:text-red-500"
          >
            <Plus size={14} />
          </button>
        </div>
      );
    }
    return days;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-stone-800 pb-6">
        <div>
          <h2 className="text-3xl font-bold text-red-700 horde-font uppercase">Calendario de Guerra</h2>
          <p className="text-stone-400 italic">Planifica tus incursiones y eventos sociales</p>
        </div>
        <div className="flex items-center gap-4 bg-stone-900 p-1 rounded-lg metallic-border">
          <button onClick={prevMonth} className="p-2 hover:bg-stone-800 rounded text-stone-400 transition-colors"><ChevronLeft /></button>
          <span className="horde-font text-lg text-red-600 min-w-[120px] text-center uppercase tracking-widest">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
          <button onClick={nextMonth} className="p-2 hover:bg-stone-800 rounded text-stone-400 transition-colors"><ChevronRight /></button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-0 metallic-border rounded-lg overflow-hidden">
        {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map(day => (
          <div key={day} className="bg-stone-900 p-2 text-center text-xs font-bold text-stone-500 uppercase tracking-widest border-b border-stone-800">{day}</div>
        ))}
        {renderCalendar()}
      </div>

      {showAddEvent && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-stone-900 border-2 border-stone-800 w-full max-w-md rounded-xl p-6 shadow-2xl animate-scale-in">
            <h3 className="text-2xl horde-font text-red-700 uppercase mb-6 flex items-center gap-2">
              <Plus className="text-red-600" /> Crear Evento
            </h3>
            <form onSubmit={addEvent} className="space-y-4">
              <div>
                <label className="block text-xs text-stone-500 uppercase font-bold mb-1">Título</label>
                <input 
                  autoFocus
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 p-2 rounded text-stone-200"
                  placeholder="Ej: Raid a Gruul"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-stone-500 uppercase font-bold mb-1">Fecha</label>
                  <input 
                    type="date"
                    value={newDate}
                    onChange={e => setNewDate(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 p-2 rounded text-stone-200"
                  />
                </div>
                <div>
                  <label className="block text-xs text-stone-500 uppercase font-bold mb-1">Hora</label>
                  <input 
                    type="time"
                    value={newTime}
                    onChange={e => setNewTime(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 p-2 rounded text-stone-200"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-stone-500 uppercase font-bold mb-1">Tipo</label>
                <div className="flex gap-2">
                  {['Raid', 'PVP', 'Reunión', 'Otro'].map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setNewType(t as any)}
                      className={`flex-1 py-1.5 rounded text-xs border ${
                        newType === t ? 'bg-red-900 border-red-500 text-white' : 'bg-stone-950 border-stone-800 text-stone-500'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setShowAddEvent(false)} className="flex-1 text-stone-500 hover:text-stone-300">Cerrar</button>
                <button type="submit" className="flex-[2] bg-red-900 hover:bg-red-800 py-3 rounded text-white font-bold uppercase shadow-lg shadow-red-950/50">Invocar Evento</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-stone-950 border border-stone-800 p-6 rounded-lg">
        <h4 className="horde-font text-xl text-red-600 uppercase mb-4">Próximos Eventos</h4>
        <div className="space-y-3">
          {events.filter(e => new Date(e.date) >= new Date()).slice(0, 3).map(ev => (
            <div key={ev.id} className="flex items-center gap-4 p-4 bg-stone-900/50 rounded border border-stone-800/50 group hover:border-red-900 transition-colors">
              <div className={`w-12 h-12 rounded flex items-center justify-center shrink-0 border ${
                ev.type === 'Raid' ? 'bg-red-900/20 border-red-900 text-red-500' : 'bg-stone-800 border-stone-700 text-stone-500'
              }`}>
                {ev.type === 'Raid' ? <Clock size={24} /> : <MapPin size={24} />}
              </div>
              <div className="flex-1">
                <div className="font-bold text-stone-200">{ev.title}</div>
                <div className="text-xs text-stone-500">{ev.date} a las {ev.time}</div>
              </div>
              <button className="text-stone-600 group-hover:text-red-600 transition-colors px-4 py-1 border border-transparent group-hover:border-red-900/40 rounded text-xs uppercase font-bold">
                Participar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarSection;
