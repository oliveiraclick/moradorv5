
import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  MoreVertical, 
  X,
  Calendar as CalendarIcon,
  Building2,
  User as UserIcon,
  AlertCircle,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { Button } from './Button';

interface Lancamento {
  id: string;
  prestador_id: string;
  condominio_id?: string;
  condoName?: string;
  tipo: 'receita' | 'despesa';
  titulo: string;
  valor: number;
  data_vencimento: string;
  origem: 'Condomínio' | 'Particular';
  status: 'Pendente' | 'Pago' | 'Atrasado';
  observacao?: string;
}

const MOCK_LANCAMENTOS: Lancamento[] = [
  {
    id: 'l-1',
    prestador_id: 'user-123',
    condominio_id: 'splendido',
    condoName: 'Splendido Residence',
    tipo: 'receita',
    titulo: 'Manutenção AC Central',
    valor: 450.00,
    data_vencimento: '2024-05-20',
    origem: 'Condomínio',
    status: 'Pago'
  },
  {
    id: 'l-2',
    prestador_id: 'user-123',
    tipo: 'receita',
    titulo: 'Instalação Split',
    valor: 350.00,
    data_vencimento: '2024-05-25',
    origem: 'Particular',
    status: 'Pendente'
  },
  {
    id: 'l-3',
    prestador_id: 'user-123',
    tipo: 'despesa',
    titulo: 'Compra de Gás R410',
    valor: 180.00,
    data_vencimento: '2024-05-18',
    origem: 'Particular',
    status: 'Atrasado'
  },
  {
    id: 'l-4',
    prestador_id: 'user-123',
    tipo: 'despesa',
    titulo: 'Taxa de Condomínio',
    valor: 50.00,
    data_vencimento: '2024-05-30',
    origem: 'Condomínio',
    status: 'Pendente'
  }
];

export const FinanceiroPrestador: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'receber' | 'pagar'>('receber');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lancamentos, setLancamentos] = useState<Lancamento[]>(MOCK_LANCAMENTOS);
  const [newLancamento, setNewLancamento] = useState<Partial<Lancamento>>({
    tipo: 'receita',
    origem: 'Particular',
    status: 'Pendente',
    data_vencimento: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const totalReceber = lancamentos
    .filter(l => l.tipo === 'receita')
    .reduce((acc, curr) => acc + curr.valor, 0);

  const totalPagar = lancamentos
    .filter(l => l.tipo === 'despesa')
    .reduce((acc, curr) => acc + curr.valor, 0);

  const saldo = totalReceber - totalPagar;

  const filteredLancamentos = lancamentos.filter(l => 
    activeTab === 'receber' ? l.tipo === 'receita' : l.tipo === 'despesa'
  );

  const handleAddLancamento = () => {
    if (!newLancamento.titulo || !newLancamento.valor) return;

    const entry: Lancamento = {
      id: `l-${Date.now()}`,
      prestador_id: 'user-123',
      titulo: newLancamento.titulo || '',
      valor: Number(newLancamento.valor),
      data_vencimento: newLancamento.data_vencimento || new Date().toISOString().split('T')[0],
      tipo: newLancamento.tipo as 'receita' | 'despesa',
      origem: newLancamento.origem as 'Condomínio' | 'Particular',
      status: 'Pendente',
      condoName: newLancamento.origem === 'Condomínio' ? 'Splendido Residence' : undefined,
      observacao: newLancamento.observacao
    };

    setLancamentos(prev => [...prev, entry]);
    setIsModalOpen(false);
    setNewLancamento({
      tipo: 'receita',
      origem: 'Particular',
      status: 'Pendente',
      data_vencimento: new Date().toISOString().split('T')[0]
    });
  };

  const formatCurrency = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pago': return 'bg-green-100 text-green-600';
      case 'Atrasado': return 'bg-red-100 text-red-600';
      default: return 'bg-yellow-100 text-yellow-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pago': return <CheckCircle2 size={12} />;
      case 'Atrasado': return <AlertCircle size={12} />;
      default: return <Clock size={12} />;
    }
  };

  return (
    <div className="w-full flex flex-col animate-in fade-in duration-500 pb-20 relative">
      
      {/* HEADER */}
      <div className="px-6 mt-4 mb-6">
        <h2 className="text-[16px] font-semibold text-slate-900 leading-tight">Financeiro</h2>
        <p className="text-[13px] font-normal text-slate-500 mt-0.5">Controle suas receitas e despesas.</p>
      </div>

      {/* RESUMO CARDS */}
      <div className="px-6 grid grid-cols-3 gap-3 mb-8">
        <div className="bg-white rounded-[24px] p-4 shadow-soft border border-slate-50 flex flex-col">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-2">A Receber</span>
          <span className="text-[13px] font-bold text-green-600 leading-tight">{formatCurrency(totalReceber)}</span>
        </div>
        <div className="bg-white rounded-[24px] p-4 shadow-soft border border-slate-50 flex flex-col">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-2">A Pagar</span>
          <span className="text-[13px] font-bold text-red-600 leading-tight">{formatCurrency(totalPagar)}</span>
        </div>
        <div className="bg-white rounded-[24px] p-4 shadow-soft border border-slate-50 flex flex-col">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-2">Saldo</span>
          <span className={`text-[13px] font-bold leading-tight ${saldo >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {formatCurrency(saldo)}
          </span>
        </div>
      </div>

      {/* ABAS */}
      <div className="px-6 mb-6">
        <div className="flex bg-slate-100 p-1 rounded-[18px] border border-slate-200/50">
          <button 
            onClick={() => setActiveTab('receber')}
            className={`flex-1 py-2.5 text-[12px] font-bold uppercase tracking-wider rounded-[15px] transition-all ${
              activeTab === 'receber' ? 'bg-white text-primary shadow-sm' : 'text-slate-400'
            }`}
          >
            A Receber
          </button>
          <button 
            onClick={() => setActiveTab('pagar')}
            className={`flex-1 py-2.5 text-[12px] font-bold uppercase tracking-wider rounded-[15px] transition-all ${
              activeTab === 'pagar' ? 'bg-white text-primary shadow-sm' : 'text-slate-400'
            }`}
          >
            A Pagar
          </button>
        </div>
      </div>

      {/* LISTA DE LANÇAMENTOS */}
      <div className="px-6 space-y-4">
        {filteredLancamentos.length > 0 ? filteredLancamentos.map(item => (
          <div 
            key={item.id}
            className="bg-white rounded-[24px] p-5 shadow-soft border border-slate-50 animate-in slide-in-from-bottom-2 duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-[14px] flex items-center justify-center ${
                  item.tipo === 'receita' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                }`}>
                  {item.tipo === 'receita' ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                </div>
                <div>
                  <h4 className="text-[15px] font-semibold text-slate-900 leading-tight">{item.titulo}</h4>
                  <div className="flex items-center gap-1.5 text-[12px] text-slate-400 mt-1">
                    {item.origem === 'Condomínio' ? <Building2 size={12} /> : <UserIcon size={12} />}
                    <span>{item.condoName || 'Particular'}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-[16px] font-bold ${item.tipo === 'receita' ? 'text-green-600' : 'text-red-600'}`}>
                  {item.tipo === 'receita' ? '+' : '-'} {formatCurrency(item.valor)}
                </span>
                <div className="text-[10px] text-slate-400 mt-1 uppercase font-medium">Venc. {new Date(item.data_vencimento).toLocaleDateString('pt-BR')}</div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(item.status)}`}>
                {getStatusIcon(item.status)}
                {item.status}
              </div>
              <button className="p-1 text-slate-300 hover:text-slate-500">
                <MoreVertical size={16} />
              </button>
            </div>
          </div>
        )) : (
          <div className="py-20 flex flex-col items-center opacity-20 text-center">
            <DollarSign size={48} className="mb-2" />
            <p className="text-[13px] font-medium uppercase tracking-widest">Nenhum lançamento encontrado</p>
          </div>
        )}
      </div>

      {/* FAB */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-[100px] right-6 w-[56px] h-[56px] bg-primary text-white rounded-full flex items-center justify-center shadow-primary-lg active:scale-95 transition-all z-40"
      >
        <Plus size={28} />
      </button>

      {/* MODAL NOVO LANÇAMENTO */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative w-full max-w-[360px] bg-white rounded-[32px] p-6 shadow-2xl animate-in slide-in-from-bottom-4 duration-300 overflow-y-auto max-h-[90vh] no-scrollbar">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[18px] font-bold text-slate-900 uppercase">Novo Lançamento</h2>
              <button onClick={() => setIsModalOpen(false)} className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-medium text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Tipo</label>
                <div className="flex bg-slate-100 p-1 rounded-[16px]">
                  <button 
                    onClick={() => setNewLancamento({...newLancamento, tipo: 'receita'})}
                    className={`flex-1 py-2 text-[11px] font-bold uppercase rounded-[14px] transition-all ${newLancamento.tipo === 'receita' ? 'bg-green-500 text-white shadow-sm' : 'text-slate-400'}`}
                  >Receita</button>
                  <button 
                    onClick={() => setNewLancamento({...newLancamento, tipo: 'despesa'})}
                    className={`flex-1 py-2 text-[11px] font-bold uppercase rounded-[14px] transition-all ${newLancamento.tipo === 'despesa' ? 'bg-red-500 text-white shadow-sm' : 'text-slate-400'}`}
                  >Despesa</button>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-medium text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Título</label>
                <input 
                  type="text" 
                  value={newLancamento.titulo || ''}
                  onChange={e => setNewLancamento({...newLancamento, titulo: e.target.value})}
                  className="w-full h-[48px] px-4 rounded-[16px] bg-slate-50 border border-slate-200 text-slate-800 text-[14px] focus:border-primary outline-none"
                  placeholder="Ex: Pagamento Serviço"
                />
              </div>

              <div>
                <label className="block text-[10px] font-medium text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Valor (R$)</label>
                <input 
                  type="number" 
                  value={newLancamento.valor || ''}
                  onChange={e => setNewLancamento({...newLancamento, valor: Number(e.target.value)})}
                  className="w-full h-[48px] px-4 rounded-[16px] bg-slate-50 border border-slate-200 text-slate-800 text-[14px] focus:border-primary outline-none"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-[10px] font-medium text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Vencimento</label>
                <input 
                  type="date" 
                  value={newLancamento.data_vencimento || ''}
                  onChange={e => setNewLancamento({...newLancamento, data_vencimento: e.target.value})}
                  className="w-full h-[48px] px-4 rounded-[16px] bg-slate-50 border border-slate-200 text-slate-800 text-[14px] focus:border-primary outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-medium text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Origem</label>
                <div className="flex bg-slate-100 p-1 rounded-[16px]">
                  <button 
                    onClick={() => setNewLancamento({...newLancamento, origem: 'Condomínio'})}
                    className={`flex-1 py-2 text-[11px] font-bold uppercase rounded-[14px] transition-all ${newLancamento.origem === 'Condomínio' ? 'bg-white text-primary shadow-sm' : 'text-slate-400'}`}
                  >Condomínio</button>
                  <button 
                    onClick={() => setNewLancamento({...newLancamento, origem: 'Particular'})}
                    className={`flex-1 py-2 text-[11px] font-bold uppercase rounded-[14px] transition-all ${newLancamento.origem === 'Particular' ? 'bg-white text-primary shadow-sm' : 'text-slate-400'}`}
                  >Particular</button>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-medium text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Observação</label>
                <textarea 
                  value={newLancamento.observacao || ''}
                  onChange={e => setNewLancamento({...newLancamento, observacao: e.target.value})}
                  className="w-full h-[80px] p-4 rounded-[20px] bg-slate-50 border border-slate-200 text-slate-800 text-[14px] focus:border-primary outline-none resize-none"
                  placeholder="Detalhes..."
                />
              </div>

              <div className="pt-4">
                <Button variant="primary" onClick={handleAddLancamento} className="w-full">Salvar</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
