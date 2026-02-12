
import React, { useState, useEffect } from 'react';
import { 
  Camera, 
  Star, 
  Briefcase, 
  Building2, 
  Clock, 
  CheckCircle2, 
  LogOut,
  Mail,
  Phone,
  ShieldCheck
} from 'lucide-react';
import { Button } from './Button';

interface ProfessionalProfileTabProps {
  user: {
    name: string;
    photoURL: string;
    category: string;
    verified: boolean;
  };
  onLogout: () => void;
  onEditProfile: () => void;
}

export const ProfessionalProfileTab: React.FC<ProfessionalProfileTabProps> = ({ user, onLogout, onEditProfile }) => {
  const [showProfile, setShowProfile] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const professionalInfo = {
    phone: "(11) 98765-4321",
    email: "contato@prestador.com.br",
    specialty: "Manutenção de Ar Condicionado e Refrigeração",
    description: "Especialista com mais de 10 anos de mercado, focado em soluções residenciais e comerciais de alta eficiência.",
    experience: "12 anos",
    condos: "Splendido, Vivere, Bellevue",
    rating: 4.8,
    reviews: 24
  };

  return (
    <div className="w-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      
      {/* CARD PERFIL SUPERIOR */}
      <div className="px-6 mt-6">
        <div className="bg-white rounded-[24px] p-6 shadow-soft border border-slate-50 flex flex-col items-center">
          <div className="relative">
            <div className="w-[88px] h-[88px] bg-slate-100 rounded-[24px] overflow-hidden border-4 border-white shadow-sm">
              <img 
                src={user.photoURL} 
                alt={user.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary text-white rounded-[12px] flex items-center justify-center shadow-lg active:scale-90 transition-all border-2 border-white">
              <Camera size={14} strokeWidth={2.5} />
            </button>
          </div>

          <div className="text-center mt-4">
            <h3 className="text-[18px] font-bold text-slate-900 leading-tight uppercase tracking-tight">
              {user.name}
            </h3>
            <p className="text-[13px] font-normal text-slate-500 mt-1">
              {user.category}
            </p>
          </div>

          <div className="w-full space-y-3 mt-6">
            <div className="flex items-center gap-3 text-slate-600">
              <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400">
                <Phone size={14} />
              </div>
              <span className="text-[14px] font-medium text-slate-800">{professionalInfo.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-600">
              <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400">
                <Mail size={14} />
              </div>
              <span className="text-[13px] font-normal text-slate-500">{professionalInfo.email}</span>
            </div>
          </div>

          <button 
            onClick={onEditProfile}
            className="w-full mt-6 h-[48px] rounded-[16px] border-2 border-primary text-primary text-[13px] font-bold uppercase tracking-wider hover:bg-primary/5 active:scale-[0.98] transition-all"
          >
            EDITAR PERFIL
          </button>
        </div>
      </div>

      {/* SEÇÃO INFORMAÇÕES PROFISSIONAIS */}
      <div className="px-6 mt-6">
        <div className="bg-white rounded-[24px] p-6 shadow-soft border border-slate-50 space-y-6">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Especialidade principal</label>
            <p className="text-[14px] font-medium text-slate-800">{professionalInfo.specialty}</p>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Descrição profissional</label>
            <p className="text-[13px] text-slate-500 leading-relaxed italic">"{professionalInfo.description}"</p>
          </div>

          <div className="grid grid-cols-2 gap-6 pt-2">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Experiência</label>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-primary" />
                <span className="text-[14px] font-bold text-slate-800">{professionalInfo.experience}</span>
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Avaliação</label>
              <div className="flex items-center gap-1.5">
                <Star size={14} className="text-yellow-400 fill-yellow-400" />
                <span className="text-[14px] font-bold text-slate-800">{professionalInfo.rating}</span>
                <span className="text-[11px] text-slate-400 font-medium">({professionalInfo.reviews})</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Condomínios atendidos</label>
            <div className="flex flex-wrap gap-2">
              {professionalInfo.condos.split(', ').map((condo, i) => (
                <div key={i} className="bg-primary/5 px-3 py-1 rounded-full flex items-center gap-1.5 border border-primary/10">
                  <Building2 size={10} className="text-primary" />
                  <span className="text-[11px] font-bold text-primary uppercase">{condo}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SEÇÃO STATUS / VISIBILIDADE */}
      <div className="px-6 mt-6">
        <div className="bg-white rounded-[24px] p-6 shadow-soft border border-slate-50">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-[14px] font-bold text-slate-900 uppercase tracking-tight">Status de Visibilidade</h4>
            <button 
              onClick={() => setShowProfile(!showProfile)}
              className={`w-12 h-6 rounded-full relative transition-all duration-300 ${
                showProfile ? 'bg-primary/20' : 'bg-slate-200'
              }`}
            >
              <div className={`absolute top-1 w-4 h-4 rounded-full transition-all duration-300 ${
                showProfile ? 'left-7 bg-primary shadow-sm' : 'left-1 bg-slate-400'
              }`} />
            </button>
          </div>
          <p className="text-[12px] text-slate-500 leading-normal">
            Quando ativado, moradores poderão visualizar seu perfil e entrar em contato.
          </p>
        </div>
      </div>

      {/* VERIFICAÇÃO */}
      {user.verified && (
        <div className="px-6 mt-6">
          <div className="bg-yellow-400 rounded-[24px] p-5 flex items-center gap-4 shadow-primary-lg">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-white">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h5 className="text-[14px] font-bold text-slate-900 uppercase tracking-tight">Prestador Verificado</h5>
              <p className="text-[11px] font-medium text-slate-900/60 uppercase">Sua documentação está em dia.</p>
            </div>
            <CheckCircle2 size={20} className="ml-auto text-slate-900" />
          </div>
        </div>
      )}

      {/* SAIR DA CONTA */}
      <div className="px-6 mt-12 mb-4 flex flex-col items-center">
        <button
          onClick={onLogout}
          className="flex items-center gap-2.5 text-slate-400 font-bold text-[13px] uppercase tracking-[0.2em] py-4 hover:text-red-500 transition-all active:scale-95"
        >
          <LogOut size={18} strokeWidth={2.5} />
          Sair da conta
        </button>
        
        <p className="text-[10px] font-medium text-slate-200 uppercase tracking-[0.2em] mt-4">
          Splendido Profissional • v2.4.0
        </p>
      </div>
    </div>
  );
};
