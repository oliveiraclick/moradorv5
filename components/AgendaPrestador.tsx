
import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Building2, 
  User as UserIcon, 
  X,
  Calendar as CalendarIcon,
  Trash2,
  Edit2
} from 'lucide-react';
import { Button } from './Button';

interface AgendaEvent {
  id: string;
  prestador_id: string;
  condominio_id?: string;
  condoName?: string;
  tipo: 'Condomínio' | 'Particular';
  titulo: string;
  data: string; // YYYY-MM-DD
  hora_inicio: string;
  hora_fim: string;
  cliente?: string;
  observacoes?: string;
}

const MOCK_EVENTS: AgendaEvent[] = [
  {
    id: 'ev-1',
    prestador_id: 'user-123',
    condominio_id: 'splendido',
    condoName: 'Splendido Residence',
    tipo: 'Condomínio',
    titulo: 'Manutenção AC Central',
    data: new Date().toISOString().split('T')[0],
    hora_inicio: '09:00',
    hora_fim: '11:30',
    cliente: 'Administração',
    observacoes: 'Verificar ruído no condensador'
  },
  {
    id: 'ev-2',
    prestador_id: 'user-123',
    tipo: 'Particular',
    titulo: 'Atendimento Particular',
    data: new Date().toISOString().split('T')[0],
    hora_inicio: '14:00',
    hora_fim: '15:00',
    cliente: 'Sr. Marcos (Unidade 102)',
    observacoes: 'Instalação de split no quarto'
  }
];

export const AgendaPrestador: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState<AgendaEvent[]>(MOCK_EVENTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<AgendaEvent>>({
    tipo: 'Condomínio',
    data: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getWeekDays = (date: Date) => {
    const days = [];
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    
    for (let i = 0; i < 7; i++) {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      days.push(d);
    }
    return days;
  };

  const weekDays = getWeekDays(selectedDate);
  const selectedDateStr = selectedDate.toISOString().split('T')[0];
  const dayEvents = events.filter(e => e.data === selectedDateStr);

  const handleAddEvent = () => {
    if (!newEvent.titulo || !newEvent.hora_inicio) return;
    
    const eventToAdd: AgendaEvent = {
      id: `ev-${Date.now()}`,
      prestador_id: 'user-123',
      titulo: newEvent.titulo || '',
      hora_inicio: newEvent.hora_inicio || '',
      hora_fim: newEvent.hora_fim || '',
      data: newEvent.data || selectedDateStr,
      tipo: (newEvent.tipo as 'Condomínio' | 'Particular') || 'Particular',
      cliente: newEvent.cliente,
      observacoes: newEvent.observacoes,
      condoName: newEvent.tipo === 'Condomínio' ? 'Splendido Residence' : undefined
    };

    setEvents(prev => [...prev, eventToAdd].sort((a, b) => a.hora_inicio.localeCompare(b.hora_inicio)));
    setIsModalOpen(false);
    setNewEvent({ tipo: 'Condomínio', data: new Date().toISOString().split('T')[0] });
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  return (
    <div className="w-full flex flex-col animate-in fade-in duration-500 pb-20 relative min-h-[calc(100vh-180px)]">
      
      {/* HEADER TÍTULO */}
      <div className="px-6 mt-4 mb-6">
        <h2 className="text-[16px] font-semibold text-slate-900 leading-tight">Minha Agenda</h2>
        <p className="text-[13px] font-normal text-slate-500 mt-0.5">Organize seus atendimentos e compromissos.</p>
      </div>

      {/* SELETOR SEMANAL */}
      <div className="px-6 mb-8">
        <div className="bg-white rounded-[24px] p-4 shadow-soft border border-slate-50">
          <div className="flex items-center justify-between mb-4 px-2">
            <button 
              onClick={() => {
                const d = new Date(selectedDate);
                d.setDate(d.getDate() - 7);
                setSelectedDate(d);
              }}
              className="p-1 text-slate-400 hover:text-primary transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="text-[14px] font-semibold text-slate-700 capitalize">
              {selectedDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
            </span>
            <button 
              onClick={() => {
                const d = new Date(selectedDate);
                d.setDate(d.getDate() + 7);
                setSelectedDate(d);
              }}
              className="p-1 text-slate-400 hover:text-primary transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="flex justify-between items-center">
            {weekDays.map((day, idx) => {
              const isSelected = day.toDateString() === selectedDate.toDateString();
              const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedDate(day)}
                  className={`flex flex-col items-center gap-2 py-2 px-1.5 rounded-[16px] transition-all duration-200 min-w-[40px] ${
                    isSelected ? 'bg-primary text-white shadow-primary-lg' : 'text-slate-400'
                  }`}
                >
                  <span className="text-[10px] font-medium uppercase tracking-wider">{dayNames[day.getDay()]}</span>
                  <span className="text-[14px] font-bold">{day.getDate()}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* LISTA DE COMPROMISSOS */}
      <div className="px-6 flex-1">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[14px] font-semibold text-slate-900 uppercase tracking-tight">Compromissos do Dia</h3>
        </div>

        {dayEvents.length > 0 ? (
          <div className="space-y-4">
            {dayEvents.map(event => (
              <div 
                key={event.id}
                className="bg-white rounded-[24px] p-4 shadow-soft border border-slate-50 flex flex-col group animate-in slide-in-from-bottom-2 duration-300"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-[12px] font-medium text-primary mb-1">
                      <Clock size={12} />
                      <span>{event.hora_inicio} {event.hora_fim ? `- ${event.hora_fim}` : ''}</span>
                    </div>
                    <h4 className="text-[15px] font-semibold text-slate-900 leading-tight">{event.titulo}</h4>
                    <p className="text-[13px] font-normal text-slate-500 mt-1">
                      {event.condoName || 'Atendimento particular'}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      event.tipo === 'Condomínio' ? 'bg-primary/10 text-primary' : 'bg-green-100 text-green-600'
                    }`}>
                      {event.tipo}
                    </span>
                    <button 
                      onClick={() => deleteEvent(event.id)}
                      className="p-1.5 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                {event.cliente && (
                   <div className="mt-3 pt-3 border-t border-slate-50 flex items-center gap-2 text-[12px] text-slate-600">
                     <UserIcon size={12} className="text-slate-400" />
                     <span className="font-medium">{event.cliente}</span>
                   </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[24px] p-12 shadow-soft border border-slate-50 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-4">
              <CalendarIcon size={32} />
            </div>
            <p className="text-[14px] font-medium text-slate-500">Nenhum compromisso agendado.</p>
          </div>
        )}
      </div>

      {/* FAB - BOTÃO FLUTUANTE */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-[100px] right-6 w-[56px] h-[56px] bg-primary text-white rounded-full flex items-center justify-center shadow-primary-lg active:scale-95 transition-all z-40"
      >
        <Plus size={28} />
      </button>

      {/* MODAL NOVO COMPROMISSO */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative w-full max-w-[360px] bg-white rounded-[32px] p-6 shadow-2xl animate-in slide-in-from-bottom-4 duration-300 overflow-y-auto max-h-[90vh] no-scrollbar">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[18px] font-bold text-slate-900 uppercase">Novo Compromisso</h2>
              <button onClick={() => setIsModalOpen(false)} className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-medium text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Título</label>
                <input 
                  type="text" 
                  value={newEvent.titulo || ''}
                  onChange={e => setNewEvent({...newEvent, titulo: e.target.value})}
                  className="w-full h-[48px] px-4 rounded-[16px] bg-slate-50 border border-slate-200 text-slate-800 text-[14px] focus:border-primary outline-none"
                  placeholder="Ex: Visita Técnica"
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-[10px] font-medium text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Início</label>
                  <input 
                    type="time" 
                    value={newEvent.hora_inicio || ''}
                    onChange={e => setNewEvent({...newEvent, hora_inicio: e.target.value})}
                    className="w-full h-[48px] px-4 rounded-[16px] bg-slate-50 border border-slate-200 text-slate-800 text-[14px] focus:border-primary outline-none"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-[10px] font-medium text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Fim</label>
                  <input 
                    type="time" 
                    value={newEvent.hora_fim || ''}
                    onChange={e => setNewEvent({...newEvent, hora_fim: e.target.value})}
                    className="w-full h-[48px] px-4 rounded-[16px] bg-slate-50 border border-slate-200 text-slate-800 text-[14px] focus:border-primary outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-medium text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Tipo</label>
                <div className="flex bg-slate-100 p-1 rounded-[16px]">
                  <button 
                    onClick={() => setNewEvent({...newEvent, tipo: 'Condomínio'})}
                    className={`flex-1 py-2 text-[11px] font-bold uppercase rounded-[14px] transition-all ${newEvent.tipo === 'Condomínio' ? 'bg-white text-primary shadow-sm' : 'text-slate-400'}`}
                  >Condomínio</button>
                  <button 
                    onClick={() => setNewEvent({...newEvent, tipo: 'Particular'})}
                    className={`flex-1 py-2 text-[11px] font-bold uppercase rounded-[14px] transition-all ${newEvent.tipo === 'Particular' ? 'bg-white text-primary shadow-sm' : 'text-slate-400'}`}
                  >Particular</button>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-medium text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Cliente (Opcional)</label>
                <input 
                  type="text" 
                  value={newEvent.cliente || ''}
                  onChange={e => setNewEvent({...newEvent, cliente: e.target.value})}
                  className="w-full h-[48px] px-4 rounded-[16px] bg-slate-50 border border-slate-200 text-slate-800 text-[14px] focus:border-primary outline-none"
                  placeholder="Nome do cliente ou apto"
                />
              </div>

              <div>
                <label className="block text-[10px] font-medium text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Observações</label>
                <textarea 
                  value={newEvent.observacoes || ''}
                  onChange={e => setNewEvent({...newEvent, observacoes: e.target.value})}
                  className="w-full h-[100px] p-4 rounded-[20px] bg-slate-50 border border-slate-200 text-slate-800 text-[14px] focus:border-primary outline-none resize-none"
                  placeholder="Detalhes adicionais..."
                />
              </div>

              <div className="pt-4">
                <Button variant="primary" onClick={handleAddEvent} className="w-full">Salvar Compromisso</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
