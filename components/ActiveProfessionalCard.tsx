
import React from 'react';
import { Button } from './Button';

interface ActiveProfessionalCardProps {
  name: string;
  profession: string;
  photoURL: string;
}

export const ActiveProfessionalCard: React.FC<ActiveProfessionalCardProps> = ({ name, profession, photoURL }) => {
  return (
    <div className="w-full bg-white rounded-[24px] p-4 shadow-soft border border-slate-50 flex items-center justify-between animate-in slide-in-from-top-4 duration-300 active:scale-[0.98] transition-all">
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="w-[56px] h-[56px] rounded-full overflow-hidden border-2 border-slate-50 shadow-sm">
          <img src={photoURL} alt={name} className="w-full h-full object-cover" />
        </div>
        
        <div className="flex flex-col">
          <div className="inline-flex items-center mb-1">
            <div className="bg-[#16A34A] px-2 py-0.5 rounded-md">
              <span className="text-[9px] font-bold text-white uppercase tracking-wider">
                NO CONDOMÍNIO AGORA
              </span>
            </div>
          </div>
          <h3 className="text-[15px] font-semibold text-slate-900 leading-tight">
            {name} <span className="text-slate-300 mx-1">•</span> <span className="text-slate-500 font-normal text-[13px]">{profession}</span>
          </h3>
        </div>
      </div>

      <button onClick={() => alert(`Abrindo chat com ${name}...`)} className="h-9 px-4 bg-primary text-white text-[12px] font-bold rounded-xl uppercase tracking-wider active:scale-95 transition-all shadow-sm">
        Chamar
      </button>
    </div>
  );
};
