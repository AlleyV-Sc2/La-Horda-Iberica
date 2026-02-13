
import React, { useState } from 'react';
import { Upload, FileText, Calendar, Trash2, Info, Download, Database, Coins } from 'lucide-react';
import { DKPTable, DKPRecord } from '../types';

const DKPManagement: React.FC = () => {
  const [tables, setTables] = useState<DKPTable[]>([
    {
      id: 'mock1',
      name: 'Raid Karazhan - Semana 3',
      date: '2024-05-15',
      records: [
        { characterName: 'Grommash', dkp: 1250 },
        { characterName: 'Thrall', dkp: 1100 },
        { characterName: 'Sylvanas', dkp: 980 }
      ]
    }
  ]);
  const [showImport, setShowImport] = useState(false);
  const [clmText, setClmText] = useState('');
  const [tableName, setTableName] = useState('');
  const [tableDate, setTableDate] = useState(new Date().toISOString().split('T')[0]);

  const importCLMData = () => {
    if (!clmText || !tableName) return;

    try {
      const lines = clmText.split('\n');
      const records: DKPRecord[] = [];

      lines.forEach(line => {
        const parts = line.split(/[,\t;]/);
        if (parts.length >= 2) {
          const name = parts[0].trim();
          const value = parseInt(parts[1].trim());
          if (name && !isNaN(value)) {
            records.push({ characterName: name, dkp: value });
          }
        }
      });

      if (records.length > 0) {
        const newTable: DKPTable = {
          id: Date.now().toString(),
          name: tableName,
          date: tableDate,
          records: records.sort((a, b) => b.dkp - a.dkp)
        };
        setTables([newTable, ...tables]);
        setClmText('');
        setTableName('');
        setShowImport(false);
      } else {
        alert("Formato no válido. Asegúrate de copiar los datos de CLM correctamente.");
      }
    } catch (e) {
      alert("Error al procesar el texto.");
    }
  };

  const deleteTable = (id: string) => {
    setTables(tables.filter(t => t.id !== id));
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b-2 border-stone-800 pb-8">
        <div className="flex items-center gap-4">
           <div className="bg-red-950 p-3 rounded border border-red-900 shadow-lg">
              <Database className="text-red-500" size={32} />
           </div>
           <div>
              <h2 className="text-4xl font-bold text-red-700 horde-font uppercase tracking-widest">Registros de Botín</h2>
              <p className="text-stone-400 italic text-sm">Sincronización oficial con Core Loot Manager (CLM)</p>
           </div>
        </div>
        <button 
          onClick={() => setShowImport(!showImport)}
          className="wow-button text-white px-8 py-3 rounded flex items-center gap-3 transition-all border-2 border-[#7a633a] shadow-xl font-bold uppercase text-sm"
        >
          <Upload size={20} /> Importar Datos CLM
        </button>
      </div>

      {showImport && (
        <div className="bg-stone-900/60 p-8 rounded-lg metallic-border space-y-6 animate-slide-down relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-red-900"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">Nombre de Sesión</label>
              <input 
                value={tableName}
                onChange={e => setTableName(e.target.value)}
                className="w-full bg-stone-950 border-2 border-stone-800 rounded p-4 text-stone-200 focus:border-red-700"
                placeholder="Ej: Karazhan - Gruul..."
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">Fecha de Raid</label>
              <input 
                type="date"
                value={tableDate}
                onChange={e => setTableDate(e.target.value)}
                className="w-full bg-stone-950 border-2 border-stone-800 rounded p-4 text-stone-200 focus:border-red-700"
              />
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">Pega aquí el export de CLM</label>
            <textarea 
              rows={6}
              value={clmText}
              onChange={e => setClmText(e.target.value)}
              className="w-full bg-stone-950 border-2 border-stone-800 rounded p-4 text-stone-200 font-mono text-sm"
              placeholder='Nombre	DKP&#10;Grommash	1250&#10;Thrall	1100'
            />
          </div>
          <div className="flex justify-end gap-4">
            <button onClick={() => setShowImport(false)} className="px-6 py-2 text-stone-500 hover:text-stone-300 font-bold uppercase text-xs">Descartar</button>
            <button onClick={importCLMData} className="wow-button text-white px-10 py-3 rounded border-2 border-[#7a633a] font-bold uppercase shadow-xl">Confirmar Importación</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {tables.length === 0 ? (
          <div className="col-span-full bg-stone-950/40 border-2 border-dashed border-stone-800 p-24 text-center rounded-xl metallic-border opacity-50">
            <Coins size={64} className="mx-auto text-stone-800 mb-6" />
            <p className="text-stone-600 italic uppercase tracking-widest font-bold">No se han detectado tesoros ni puntos de botín.</p>
          </div>
        ) : (
          tables.map(table => (
            <div key={table.id} className="bg-stone-950 border-2 border-stone-800 rounded-lg overflow-hidden flex flex-col hover:border-red-950 transition-all shadow-2xl group">
              <div className="p-5 bg-stone-900/80 flex justify-between items-center border-b border-stone-800 group-hover:bg-red-950/10 transition-colors">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-stone-950 border border-stone-700 rounded p-1">
                      <img src="https://wow.zamimg.com/images/wow/icons/large/inv_misc_coin_01.jpg" className="w-full h-full object-contain rounded-sm" alt="dkp" />
                   </div>
                   <div>
                      <h3 className="font-bold text-red-600 uppercase tracking-tight text-lg">{table.name}</h3>
                      <div className="flex items-center gap-3 text-[10px] text-stone-500 font-bold uppercase mt-1">
                        <Calendar size={12} className="text-stone-700" /> {table.date} 
                        <span className="text-stone-800">|</span> 
                        <span className="text-red-900">{table.records.length} Guerreros</span>
                      </div>
                   </div>
                </div>
                <button 
                  onClick={() => deleteTable(table.id)}
                  className="text-stone-700 hover:text-red-600 transition-colors p-2"
                >
                  <Trash2 size={22} />
                </button>
              </div>
              <div className="flex-1 max-h-[400px] overflow-y-auto">
                <table className="w-full text-sm border-separate border-spacing-0">
                  <thead className="sticky top-0 bg-stone-950 border-b border-stone-800 z-10">
                    <tr>
                      <th className="px-6 py-3 text-left text-[10px] text-stone-600 font-bold uppercase tracking-widest">Guerrero</th>
                      <th className="px-6 py-3 text-right text-[10px] text-stone-600 font-bold uppercase tracking-widest">Puntos DKP</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-900/50">
                    {table.records.map((r, i) => (
                      <tr key={i} className="hover:bg-red-900/5 transition-colors group/row">
                        <td className="px-6 py-3 text-stone-300 font-bold tracking-tight">{r.characterName}</td>
                        <td className="px-6 py-3 text-right">
                           <span className="font-mono text-orange-500 font-bold text-lg drop-shadow-[0_0_8px_rgba(249,115,22,0.3)]">{r.dkp}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 bg-stone-900/40 flex justify-end border-t border-stone-800">
                <button className="flex items-center gap-2 text-[10px] text-stone-600 hover:text-stone-300 font-bold uppercase tracking-widest transition-colors">
                  <Download size={14} /> Descargar Informe
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="bg-red-950/20 border-2 border-red-900/30 p-6 rounded-lg flex gap-6 items-start metallic-border">
        <div className="bg-red-900/40 p-2 rounded shadow-lg border border-red-800">
           <Info className="text-red-500" size={24} />
        </div>
        <div className="space-y-2">
          <p className="font-bold text-red-600 uppercase tracking-widest text-sm">Protocolo de Importación CLM</p>
          <p className="text-xs text-stone-400 leading-relaxed italic">
            "Este sistema está diseñado para procesar el String de Exportación generado por el addon Core Loot Manager en el juego. Copia el texto desde el menú de Exportación del addon y pégalo aquí para actualizar los saldos del clan."
          </p>
        </div>
      </div>
    </div>
  );
};

export default DKPManagement;
