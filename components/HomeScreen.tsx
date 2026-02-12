
import React, { useState, useEffect } from 'react';
import { Search, LayoutGrid, Construction, Wallet, Calendar as CalendarIcon, Package, UserPlus, ShoppingBag } from 'lucide-react';
import { BottomNav } from './BottomNav';
import { ProfessionalBottomNav } from './ProfessionalBottomNav';
import { QRCodeModal } from './QRCodeModal';
import { GlobalHeader } from './GlobalHeader';
import { ProfileTab } from './ProfileTab';
import { ProfessionalProfileTab } from './ProfessionalProfileTab';
import { ProfessionalDashboard } from './ProfessionalDashboard';
import { AgendaPrestador } from './AgendaPrestador';
import { FinanceiroPrestador } from './FinanceiroPrestador';
import { ResidentAvisos } from './ResidentAvisos';
import { ActiveProfessionalCard } from './ActiveProfessionalCard';
import { ActiveProfessional } from '../App';

interface HomeScreenProps {
  onLogout?: () => void;
  userRole?: 'Morador' | 'Profissional';
  activeProfessionals?: ActiveProfessional[];
  onTogglePresence?: (prof: ActiveProfessional, isActive: boolean) => void;
  onNavigateToServiceRegister?: () => void;
  onNavigateToProductRegister?: () => void;
  onNavigateToSuggestions?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ 
  onLogout, 
  userRole = 'Morador', 
  activeProfessionals = [],
  onTogglePresence,
  onNavigateToServiceRegister,
  onNavigateToProductRegister,
  onNavigateToSuggestions
}) => {
  const [activeTab, setActiveTab] = useState('home');
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  const currentUser = {
    id: 'user-123',
    name: 'Denys Borges',
    photoURL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop',
    role: userRole,
    category: userRole === 'Profissional' ? 'Manutenção de Ar Condicionado' : '',
    unit: userRole === 'Morador' ? 'Rua 1, Casa 460' : 'Prestador Externo',
    verified: true,
    bioActive: false
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [activeTab]);

  const getHeaderTitle = () => {
    if (activeTab === 'perfil') return 'Meu Perfil';
    if (activeTab === 'agenda') return userRole === 'Profissional' ? 'Minha Agenda' : 'Agenda';
    if (activeTab === 'financeiro') return 'Financeiro';
    if (activeTab === 'avisos') return 'Notificações';
    if (activeTab === 'plus') return 'Serviços Rápidos';
    return userRole === 'Profissional' ? 'Dashboard' : 'Splendido';
  };

  const renderContent = () => {
    // ABA PERFIL / MENU
    if (activeTab === 'perfil') {
      if (userRole === 'Profissional') {
        return (
          <ProfessionalProfileTab 
            user={currentUser}
            onLogout={onLogout || (() => window.location.reload())}
            onEditProfile={() => alert('Edição de Perfil em breve!')}
          />
        );
      }
      return (
        <ProfileTab 
          user={currentUser} 
          onLogout={onLogout || (() => window.location.reload())}
          onEditProfile={() => alert('Edição de Perfil em breve!')}
          onNavigate={(route) => alert(`Navegando para: ${route}`)}
        />
      );
    }

    // ABA AGENDA
    if (activeTab === 'agenda') {
      if (userRole === 'Profissional') {
        return <AgendaPrestador />;
      }
      return (
        <div className="flex flex-col items-center justify-center py-20 px-6 text-center animate-in fade-in duration-500">
          <div className="w-20 h-20 bg-primary-soft rounded-[32px] flex items-center justify-center text-primary mb-6">
            <CalendarIcon size={40} />
          </div>
          <h2 className="text-[20px] font-bold text-slate-900 uppercase tracking-tight">Minha Agenda</h2>
          <p className="text-[14px] text-slate-500 mt-2 max-w-[240px]">Gerencie seus compromissos e horários agendados.</p>
        </div>
      );
    }

    // ABA CENTRAL PLUS (Atalhos Morador)
    if (activeTab === 'plus') {
      return (
        <div className="px-6 pt-10 pb-20 animate-in slide-in-from-bottom-8 duration-500">
          <h2 className="text-[20px] font-bold text-slate-900 uppercase tracking-tight mb-8 text-center">Ações Rápidas</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Encomendas', icon: Package, color: 'bg-orange-50 text-orange-500' },
              { label: 'Autorizar', icon: UserPlus, color: 'bg-green-50 text-green-500' },
              { label: 'E-Shop', icon: ShoppingBag, color: 'bg-orange-50 text-orange-500' },
              { label: 'Avisos', icon: LayoutGrid, color: 'bg-purple-50 text-purple-500' },
            ].map((item, i) => (
              <button key={i} onClick={() => alert(`${item.label} em breve!`)} className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-soft flex flex-col items-center gap-3 active:scale-95 transition-all">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${item.color}`}>
                  <item.icon size={24} />
                </div>
                <span className="text-[13px] font-bold text-slate-700 uppercase">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      );
    }

    // ABA AVISOS (Morador)
    if (activeTab === 'avisos') {
      return <ResidentAvisos />;
    }

    // ABA FINANCEIRO
    if (activeTab === 'financeiro') {
      if (userRole === 'Profissional') {
        return <FinanceiroPrestador />;
      }
      return (
        <div className="flex flex-col items-center justify-center py-20 px-6 text-center animate-in fade-in duration-500">
          <div className="w-20 h-20 bg-primary-soft rounded-[32px] flex items-center justify-center text-primary mb-6">
            <Wallet size={40} />
          </div>
          <h2 className="text-[20px] font-bold text-slate-900 uppercase tracking-tight">Financeiro</h2>
          <p className="text-[14px] text-slate-500 mt-2 max-w-[240px]">Acompanhe seus ganhos, extratos e solicitações de saque.</p>
        </div>
      );
    }

    // DASHBOARD PROFISSIONAL
    if (currentUser.role === 'Profissional' && activeTab === 'home') {
      return (
        <ProfessionalDashboard 
          user={currentUser} 
          onTogglePresence={onTogglePresence}
          onNavigateToServiceRegister={onNavigateToServiceRegister}
          onNavigateToProductRegister={onNavigateToProductRegister}
          onNavigateToSuggestions={onNavigateToSuggestions}
        />
      );
    }

    // DASHBOARD RESIDENTE (Default Home)
    const newsMessages = [
      "Manutenção no Bloco B amanhã às 08h",
      "Nova funcionalidade de Autorizar Vizinho liberada",
      "Reunião de condomínio agendada para sexta-feira às 19:30h",
      "Promoção no E-Shop: 20% de desconto em bebidas"
    ].join("   •   ");

    return (
      <>
        {/* SEÇÃO DINÂMICA: PROFISSIONAIS NO CONDOMÍNIO */}
        {activeProfessionals.length > 0 && (
          <div className="px-6 mt-6">
            <h3 className="text-[14px] font-semibold text-slate-900 uppercase tracking-tight mb-3">
              Tem profissional no condomínio agora
            </h3>
            <div className="space-y-3">
              {activeProfessionals.map((prof) => (
                <ActiveProfessionalCard 
                  key={prof.id}
                  name={prof.name}
                  profession={prof.profession}
                  photoURL={prof.photoURL}
                />
              ))}
            </div>
          </div>
        )}

        {/* SAUDAÇÃO */}
        <div className="px-6 mt-8">
          <p className="text-slate-500 text-[14px] font-medium">Olá, {currentUser.name.split(' ')[0]}</p>
          <h1 className="text-slate-900 text-[20px] font-bold mt-1 uppercase tracking-tight">O que você precisa hoje?</h1>
        </div>

        {/* BARRA DE BUSCA */}
        <div className="px-6 mt-6">
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <Search size={18} strokeWidth={2} />
            </div>
            <input
              type="text"
              placeholder="Buscar serviços ou produtos..."
              className="w-full h-[48px] bg-white rounded-[16px] pl-11 pr-4 text-slate-800 border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* BREAKING NEWS BANNER */}
        <div className="mx-6 mt-6 flex h-[44px] rounded-[22px] overflow-hidden shadow-sm">
          <div className="bg-primary px-4 flex items-center justify-center shrink-0">
            <span className="text-[12px] font-semibold text-white uppercase tracking-[0.1em]">BREAKING</span>
          </div>
          <div className="flex-1 bg-[#FFD700] overflow-hidden flex items-center">
            <div className="marquee w-full h-full">
              <div className="marquee-content text-[13px] font-medium text-slate-900">{newsMessages}</div>
            </div>
          </div>
        </div>

        {/* E-SHOP PREVIEW */}
        <div className="mt-8 px-6">
           <div className="w-full bg-white rounded-[24px] p-6 shadow-soft border border-slate-50 flex items-center justify-between">
              <div>
                <h4 className="text-[15px] font-semibold text-slate-900">E-Shop Splendido</h4>
                <p className="text-[12px] text-slate-500 mt-1">Sua conveniência digital.</p>
              </div>
              <button onClick={() => alert('Abrindo E-Shop...')} className="text-primary text-[12px] font-bold uppercase tracking-wider">Acessar</button>
           </div>
        </div>

        <footer className="mt-12 mb-8 flex flex-col items-center">
           <p className="text-[10px] font-medium text-slate-300 uppercase tracking-[0.2em]">
            Produzido por <span className="text-slate-400 font-semibold">IA&CO TECNOLOGIA</span>
          </p>
        </footer>
      </>
    );
  };

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] flex flex-col overflow-x-hidden">
      <GlobalHeader 
        type="main" 
        title={getHeaderTitle()} 
        onOpenQR={() => setIsQRModalOpen(true)} 
        onOpenNotifications={() => setActiveTab('avisos')}
      />
      
      <main className="flex-1 pb-24 pt-[calc(72px+env(safe-area-inset-top,24px))]">
        {renderContent()}
      </main>

      {userRole === 'Profissional' ? (
        <ProfessionalBottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      ) : (
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      )}

      <QRCodeModal 
        isOpen={isQRModalOpen} 
        onClose={() => setIsQRModalOpen(false)} 
        userName={currentUser.name}
        address={currentUser.unit}
        avatarUrl={currentUser.photoURL}
        userRole={currentUser.role as 'Morador' | 'Profissional'}
        category={currentUser.category}
      />
    </div>
  );
};
