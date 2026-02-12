
import React, { useState, useEffect, useRef } from 'react';
import { 
  Star, 
  Briefcase, 
  ShoppingBag, 
  Lightbulb, 
  Plus,
  Clock,
  ArrowUpRight,
  Building2,
  MapPin,
  MessageCircle,
  Calculator,
  ChevronDown,
  Filter
} from 'lucide-react';
import { ActiveProfessional } from '../App';

interface ProfessionalDashboardProps {
  user: {
    id: string;
    name: string;
    category: string;
    photoURL: string;
    verified: boolean;
  };
  onTogglePresence?: (prof: ActiveProfessional, isActive: boolean) => void;
  onNavigateToServiceRegister?: () => void;
  onNavigateToProductRegister?: () => void;
  onNavigateToSuggestions?: () => void;
}

// Mock de Condomínios atendidos pelo prestador
const CONDOS = [
  { id: 'all', name: 'Todos os Condomínios' },
  { id: 'splendido', name: 'Splendido Residence', address: 'Rua X, 123' },
  { id: 'vivere', name: 'Vivere Park', address: 'Av. Principal, 500' },
  { id: 'bellevue', name: 'Bellevue Towers', address: 'Rua das Flores, 88' },
];

// Mock de Solicitações Multi-Condomínio
const MOCK_REQUESTS = [
  {
    id: 'req-1',
    type: 'Cotação',
    icon: Calculator,
    condoId: 'splendido',
    condoName: 'Splendido Residence',
    condoAddress: 'Rua X, 123',
    sender: 'João Silva',
    service: 'Limpeza de Piscina',
    message: 'Preciso para amanhã, se possível.',
    time: 'Há 5 min'
  },
  {
    id: 'req-2',
    type: 'Mensagem',
    icon: MessageCircle,
    condoId: 'vivere',
    condoName: 'Vivere Park',
    condoAddress: 'Av. Principal, 500',
    sender: 'Maria Oliveira',
    service: 'Manutenção de AC',
    message: 'Meu ar parou de gelar agora pouco.',
    time: 'Há 12 min'
  },
  {
    id: 'req-3',
    type: 'Chamado',
    icon: Briefcase,
    condoId: 'bellevue',
    condoName: 'Bellevue Towers',
    condoAddress: 'Rua das Flores, 88',
    sender: 'Carlos Ed.',
    service: 'Revisão Elétrica',
    message: 'Disjuntor desarmando constantemente.',
    time: 'Há 45 min'
  }
];

const PRESENCE_TIME = 45 * 60;

export const ProfessionalDashboard: React.FC<ProfessionalDashboardProps> = ({ 
  user, 
  onTogglePresence,
  onNavigateToServiceRegister,
  onNavigateToProductRegister,
  onNavigateToSuggestions
}) => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [timeLeft, setTimeLeft] = useState(PRESENCE_TIME);
  const [selectedCondo, setSelectedCondo] = useState('all');
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const performanceData = {
    profileViews: 124,
    profileViewsGrowth: '+12%',
    ratingAverage: 4.8,
    ratingCount: 23
  };

  useEffect(() => {
    if (isAvailable) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleToggle(false);
            return PRESENCE_TIME;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setTimeLeft(PRESENCE_TIME);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAvailable]);

  const handleToggle = (active: boolean) => {
    setIsAvailable(active);
    if (onTogglePresence) {
      onTogglePresence({
        id: user.id,
        name: user.name,
        profession: user.category,
        photoURL: user.photoURL,
        timestamp: Date.now()
      }, active);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const filteredRequests = selectedCondo === 'all' 
    ? MOCK_REQUESTS 
    : MOCK_REQUESTS.filter(r => r.condoId === selectedCondo);

  return (
    <div className="w-full flex flex-col animate-in fade-in duration-500 pb-6">
      
      {/* SELETOR DE CONDOMÍNIO (MULTI-SaaS) */}
      <div className="px-6 mt-4">
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary">
            <Filter size={16} />
          </div>
          <select 
            value={selectedCondo}
            onChange={(e) => setSelectedCondo(e.target.value)}
            className="w-full h-[48px] bg-white border border-slate-200 rounded-[16px] pl-11 pr-4 text-[14px] font-semibold text-slate-700 focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none appearance-none cursor-pointer transition-all shadow-sm"
          >
            {CONDOS.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
            <ChevronDown size={18} />
          </div>
        </div>
      </div>

      {/* STATUS DE PRESENÇA */}
      <div className="px-6 mt-6">
        <div className="w-full bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] rounded-[24px] p-6 shadow-primary-lg overflow-hidden relative">
          <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="inline-flex bg-white px-2.5 py-1 rounded-lg">
                <span className="text-[10px] font-semibold text-primary uppercase tracking-wider">
                  Sessão Ativa
                </span>
              </div>
              
              {isAvailable && (
                <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1 rounded-full backdrop-blur-md">
                  <Clock size={12} className="text-white/80" />
                  <span className="text-[11px] font-bold text-white tabular-nums">
                    {formatTime(timeLeft)}
                  </span>
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-[18px] font-bold text-white leading-tight">
                  {user.name}
                </h2>
                <p className="text-[13px] font-normal text-white/90 mt-0.5">
                  {user.category}
                </p>
              </div>

              <div className="flex flex-col items-end gap-2">
                <span className="text-[10px] font-medium text-white/80 uppercase tracking-widest">
                  {isAvailable ? 'No Condomínio' : 'Offline'}
                </span>
                <button 
                  onClick={() => handleToggle(!isAvailable)}
                  className={`w-12 h-6 rounded-full relative transition-all duration-300 ${
                    isAvailable ? 'bg-white/30' : 'bg-slate-400/30'
                  }`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${
                    isAvailable ? 'left-7 shadow-sm' : 'left-1'
                  }`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SOLICITAÇÕES RECENTES - FOCO MULTI-CONDOMÍNIO */}
      <div className="px-6 mt-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[14px] font-semibold text-slate-900 uppercase tracking-tight">
            Solicitações Ativas
          </h3>
          <span className="text-[11px] font-bold text-primary uppercase bg-primary/5 px-2 py-1 rounded-md">
            {filteredRequests.length} Novas
          </span>
        </div>

        <div className="space-y-4">
          {filteredRequests.length > 0 ? filteredRequests.map((req) => (
            <div 
              key={req.id} 
              className="w-full bg-white rounded-[24px] p-5 shadow-soft border border-slate-50 animate-in slide-in-from-bottom-2 duration-300 active:scale-[0.98] transition-all"
            >
              {/* BADGE OBRIGATÓRIA DO CONDOMÍNIO */}
              <div className="flex items-center justify-between mb-3">
                <div className="bg-primary/5 px-3 py-1.5 rounded-[12px] flex items-center gap-2">
                  <Building2 size={12} className="text-primary" />
                  <span className="text-[12px] font-medium text-primary">
                    {req.condoName}
                  </span>
                </div>
                <span className="text-[10px] font-medium text-slate-400">{req.time}</span>
              </div>

              {/* CONTEÚDO DA SOLICITAÇÃO */}
              <div className="flex items-start gap-3 mt-4">
                <div className="w-10 h-10 bg-slate-100 rounded-[14px] flex items-center justify-center text-slate-500 shrink-0">
                  <req.icon size={18} strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[14px] font-bold text-slate-900 leading-tight">
                      {req.sender}
                    </h4>
                    <div className="bg-slate-100 px-2 py-0.5 rounded-md">
                       <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">{req.type}</span>
                    </div>
                  </div>
                  <p className="text-[12px] font-semibold text-slate-500 mt-0.5">
                    {req.service}
                  </p>
                  <div className="mt-3 bg-slate-50/50 p-3 rounded-[12px] border border-slate-100/50">
                    <p className="text-[13px] text-slate-600 italic line-clamp-2 leading-relaxed">
                      "{req.message}"
                    </p>
                  </div>
                </div>
              </div>

              {/* AÇÕES RÁPIDAS */}
              <div className="flex gap-2 mt-5">
                <button onClick={() => alert(`Iniciando resposta para ${req.sender}...`)} className="flex-1 h-10 bg-primary text-white text-[12px] font-bold rounded-[14px] uppercase tracking-wider active:scale-95 transition-all shadow-sm">
                  Responder
                </button>
                <button onClick={() => alert(`Localização: ${req.condoAddress}`)} className="h-10 px-4 bg-slate-100 text-slate-500 text-[12px] font-bold rounded-[14px] uppercase tracking-wider active:scale-95 transition-all">
                  Ver Local
                </button>
              </div>
            </div>
          )) : (
            <div className="py-12 flex flex-col items-center opacity-20 text-center">
              <Building2 size={40} className="mb-2" />
              <p className="text-[13px] font-medium uppercase tracking-widest">Nenhuma solicitação encontrada</p>
            </div>
          )}
        </div>
      </div>

      {/* GERENCIAMENTO */}
      <div className="px-6 mt-10 grid grid-cols-2 gap-4">
        <button 
          onClick={onNavigateToServiceRegister}
          className="bg-white rounded-[24px] p-5 shadow-soft border border-slate-50 flex flex-col items-start text-left active:scale-[0.98] transition-all group"
        >
          <div className="w-11 h-11 bg-primary/5 rounded-[14px] flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all mb-4">
            <Briefcase size={20} strokeWidth={2} />
          </div>
          <h4 className="text-[15px] font-semibold text-slate-900 leading-tight">Meus Serviços</h4>
          <p className="text-[12px] font-normal text-slate-500 mt-1">Gerenciar catálogo</p>
        </button>

        <button 
          onClick={onNavigateToProductRegister}
          className="bg-white rounded-[24px] p-5 shadow-soft border border-slate-50 flex flex-col items-start text-left active:scale-[0.98] transition-all group"
        >
          <div className="w-11 h-11 bg-primary/5 rounded-[14px] flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all mb-4">
            <ShoppingBag size={20} strokeWidth={2} />
          </div>
          <h4 className="text-[15px] font-semibold text-slate-900 leading-tight">Minha Loja</h4>
          <p className="text-[12px] font-normal text-slate-500 mt-1">Produtos ativos</p>
        </button>
      </div>

      <div className="px-6 mt-8">
        <button 
          onClick={onNavigateToSuggestions}
          className="w-full bg-primary rounded-[24px] p-5 shadow-primary-lg flex items-center justify-between text-left active:scale-[0.98] transition-all group"
        >
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Lightbulb size={16} className="text-white/80" />
              <h4 className="text-[14px] font-semibold text-white uppercase tracking-tight">Dê sua sugestão</h4>
            </div>
            <p className="text-[12px] font-normal text-white/90">
              Melhoria do sistema multi-SaaS.
            </p>
          </div>
          <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center text-primary shadow-lg active:scale-90 transition-all ml-4 shrink-0">
            <Plus size={20} strokeWidth={3} />
          </div>
        </button>
      </div>

      <footer className="mt-6 mb-2 flex flex-col items-center opacity-40">
         <p className="text-[10px] font-medium text-slate-300 uppercase tracking-[0.2em]">
          Ambiente Multi-Condomínio • IA&CO
        </p>
      </footer>
    </div>
  );
};
