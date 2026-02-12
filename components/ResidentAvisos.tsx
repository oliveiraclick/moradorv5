
import React from 'react';
import { 
  Bell, 
  Package, 
  AlertTriangle, 
  Info, 
  CheckCircle2, 
  ChevronRight,
  Clock,
  Megaphone
} from 'lucide-react';

interface Notificacao {
  id: string;
  tipo: 'comunicado' | 'encomenda' | 'manutencao' | 'seguranca';
  titulo: string;
  descricao: string;
  data: string;
  lida: boolean;
}

const MOCK_AVISOS: Notificacao[] = [
  {
    id: '1',
    tipo: 'encomenda',
    titulo: 'Encomenda Disponível',
    descricao: 'Uma encomenda da Amazon chegou na portaria para você.',
    data: 'Há 10 min',
    lida: false
  },
  {
    id: '2',
    tipo: 'manutencao',
    titulo: 'Manutenção de Elevadores',
    descricao: 'O elevador de serviço do Bloco B passará por manutenção amanhã.',
    data: 'Há 2 horas',
    lida: false
  },
  {
    id: '3',
    tipo: 'comunicado',
    titulo: 'Reunião de Condomínio',
    descricao: 'Ata da última reunião disponível para leitura no portal.',
    data: 'Hoje, 09:45',
    lida: true
  },
  {
    id: '4',
    tipo: 'seguranca',
    titulo: 'Simulado de Incêndio',
    descricao: 'Teremos um simulado de evacuação no próximo sábado às 10h.',
    data: 'Ontem',
    lida: true
  }
];

export const ResidentAvisos: React.FC = () => {
  const getIcon = (tipo: string) => {
    switch (tipo) {
      case 'encomenda': return <Package size={20} className="text-orange-500" />;
      case 'manutencao': return <AlertTriangle size={20} className="text-blue-500" />;
      case 'seguranca': return <Info size={20} className="text-red-500" />;
      default: return <Megaphone size={20} className="text-primary" />;
    }
  };

  const getBgColor = (tipo: string) => {
    switch (tipo) {
      case 'encomenda': return 'bg-orange-50';
      case 'manutencao': return 'bg-blue-50';
      case 'seguranca': return 'bg-red-50';
      default: return 'bg-primary/5';
    }
  };

  return (
    <div className="w-full flex flex-col animate-in fade-in duration-500 pb-20">
      <div className="px-6 mt-4 mb-6">
        <h2 className="text-[16px] font-semibold text-slate-900 leading-tight">Avisos e Notificações</h2>
        <p className="text-[13px] font-normal text-slate-500 mt-0.5">Fique por dentro do que acontece no Splendido.</p>
      </div>

      <div className="px-6 space-y-4">
        {MOCK_AVISOS.map((aviso) => (
          <button 
            key={aviso.id}
            onClick={() => alert(`Abrindo detalhe do aviso: ${aviso.titulo}`)}
            className={`w-full bg-white rounded-[24px] p-5 shadow-soft border border-slate-50 flex items-start gap-4 text-left active:scale-[0.98] transition-all relative ${!aviso.lida ? 'ring-1 ring-primary/20' : ''}`}
          >
            {!aviso.lida && (
              <div className="absolute top-5 right-5 w-2 h-2 bg-primary rounded-full animate-pulse" />
            )}

            <div className={`w-12 h-12 rounded-[18px] flex items-center justify-center shrink-0 ${getBgColor(aviso.tipo)}`}>
              {getIcon(aviso.tipo)}
            </div>

            <div className="flex-1 pr-4">
              <div className="flex items-center gap-2">
                <h4 className={`text-[14px] leading-tight ${aviso.lida ? 'font-semibold text-slate-600' : 'font-bold text-slate-900'}`}>
                  {aviso.titulo}
                </h4>
              </div>
              <p className="text-[12px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                {aviso.descricao}
              </p>
              <div className="flex items-center gap-1.5 mt-3 text-slate-400">
                <Clock size={12} />
                <span className="text-[11px] font-medium uppercase tracking-wider">{aviso.data}</span>
              </div>
            </div>

            <div className="self-center text-slate-300">
              <ChevronRight size={18} />
            </div>
          </button>
        ))}
      </div>

      <div className="px-6 mt-10">
        <div className="bg-slate-100/50 rounded-[24px] p-6 border border-slate-200/50 flex flex-col items-center text-center">
          <CheckCircle2 size={32} className="text-slate-300 mb-3" />
          <p className="text-[12px] font-medium text-slate-400 uppercase tracking-widest">
            Você está em dia com todos os avisos importantes.
          </p>
        </div>
      </div>
    </div>
  );
};
