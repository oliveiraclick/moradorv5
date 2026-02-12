
import React from 'react';
import { 
  User, 
  CheckCircle2, 
  AlertCircle, 
  Settings, 
  ShoppingBag, 
  Calendar, 
  Megaphone, 
  LogOut,
  ChevronRight,
  ShieldCheck,
  Edit2
} from 'lucide-react';

interface UserData {
  name: string;
  photoURL: string;
  role: string;
  unit: string;
  verified: boolean;
  bioActive: boolean;
}

interface ProfileTabProps {
  user: UserData;
  onLogout: () => void;
  onEditProfile: () => void;
  onNavigate: (route: string) => void;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({ user, onLogout, onEditProfile, onNavigate }) => {
  
  const activities = [
    { id: 'anuncios', title: 'Meus Anúncios', icon: Megaphone, route: '/meus-anuncios' },
    { id: 'compras', title: 'Minhas Compras', icon: ShoppingBag, route: '/minhas-compras' },
    { id: 'agendamentos', title: 'Meus Agendamentos', icon: Calendar, route: '/meus-agendamentos' },
    { id: 'config', title: 'Configurações', icon: Settings, route: '/configuracoes' },
  ];

  return (
    <div className="w-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* SEÇÃO PRINCIPAL - PERFIL */}
      <div className="px-6 flex flex-col items-center mt-8">
        <div className="relative">
          <div className="w-24 h-24 rounded-[32px] overflow-hidden border-4 border-white shadow-soft">
            <img 
              src={user.photoURL || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop"} 
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </div>
          <button 
            onClick={onEditProfile}
            className="absolute -bottom-1 -right-1 w-9 h-9 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg active:scale-90 transition-all border-4 border-[#F8FAFC]"
          >
            <Edit2 size={16} strokeWidth={2.5} />
          </button>
        </div>

        <h2 className="text-[20px] font-bold text-slate-900 mt-4 leading-tight">{user.name}</h2>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[13px] font-medium text-slate-500 uppercase tracking-wider">{user.role}</span>
          <div className="w-1 h-1 rounded-full bg-slate-300" />
          <span className="text-[13px] font-medium text-slate-500 uppercase tracking-wider">{user.unit}</span>
        </div>
      </div>

      {/* STATUS DE VERIFICAÇÃO */}
      <div className="px-6 mt-8">
        <div className={`w-full h-[48px] rounded-[16px] flex items-center justify-between px-5 transition-all ${
          user.verified 
            ? 'bg-[#FFD700] border border-yellow-400/20' 
            : 'bg-slate-100 border border-slate-200'
        }`}>
          <div className="flex items-center gap-3">
            {user.verified ? (
              <ShieldCheck size={20} className="text-slate-900" strokeWidth={2.5} />
            ) : (
              <AlertCircle size={20} className="text-slate-400" strokeWidth={2.5} />
            )}
            <span className={`text-[13px] font-bold uppercase tracking-tight ${
              user.verified ? 'text-slate-900' : 'text-slate-500'
            }`}>
              {user.verified ? 'CONTA VERIFICADA' : 'Conta pendente de verificação'}
            </span>
          </div>
          {user.verified && <CheckCircle2 size={18} className="text-slate-900" />}
        </div>
      </div>

      {/* MINHAS ATIVIDADES */}
      <div className="px-6 mt-10">
        <h3 className="text-[16px] font-bold text-slate-900 mb-4 uppercase tracking-tight">Minhas Atividades</h3>
        <div className="grid grid-cols-2 gap-4">
          {activities.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.route)}
              className="bg-white p-5 rounded-[24px] border border-slate-100 shadow-soft flex flex-col items-start text-left active:scale-[0.96] transition-all group"
            >
              <div className="w-10 h-10 bg-primary/5 rounded-[12px] flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors mb-4">
                <item.icon size={20} strokeWidth={2.5} />
              </div>
              <span className="text-[14px] font-semibold text-slate-800 leading-tight">
                {item.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ATIVAR BIO */}
      <div className="px-6 mt-6">
        <button
          disabled={user.bioActive}
          className={`w-full h-[56px] rounded-[20px] flex items-center justify-center gap-3 font-bold text-[14px] uppercase tracking-wider transition-all border ${
            user.bioActive 
              ? 'bg-green-50 border-green-100 text-green-600 cursor-not-allowed opacity-80' 
              : 'bg-white border-slate-200 text-slate-800 hover:border-primary hover:text-primary active:scale-[0.98]'
          }`}
        >
          {user.bioActive ? (
            <>
              <CheckCircle2 size={18} />
              Bio Ativa
            </>
          ) : (
            <>
              <User size={18} />
              Ativar Biometria
            </>
          )}
        </button>
      </div>

      {/* SAIR DA CONTA */}
      <div className="px-6 mt-10 mb-8">
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-3 text-slate-400 font-bold text-[13px] uppercase tracking-[0.2em] py-4 hover:text-red-500 transition-all active:scale-95"
        >
          <LogOut size={18} strokeWidth={2.5} />
          Sair do App
        </button>
      </div>

      {/* FOOTER INFO */}
      <div className="flex flex-col items-center mb-12">
         <p className="text-[10px] font-medium text-slate-300 uppercase tracking-[0.2em]">
          Splendido App • v2.4.0
        </p>
      </div>
    </div>
  );
};
