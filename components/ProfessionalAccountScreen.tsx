
import React, { useState } from 'react';
import { Briefcase, ChevronDown } from 'lucide-react';
import { CustomInput } from './CustomInput';
import { Button } from './Button';
import { GlobalHeader } from './GlobalHeader';
import { QRCodeModal } from './QRCodeModal';

interface ProfessionalAccountScreenProps {
  onBack: () => void;
  onContinue: () => void;
}

export const ProfessionalAccountScreen: React.FC<ProfessionalAccountScreenProps> = ({ onBack, onContinue }) => {
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [personType, setPersonType] = useState<'individual' | 'company'>('individual');
  const [category, setCategory] = useState('Outros');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    id: ''
  });

  return (
    <div className="w-full max-w-[400px] min-h-screen flex flex-col items-center animate-in fade-in slide-in-from-right-4 duration-500 bg-[#F8FAFC]">
      <GlobalHeader 
        type="secondary" 
        title="Profissional" 
        onBack={onBack}
        onOpenQR={() => setIsQRModalOpen(true)}
      />

      <div className="w-full px-6 flex-1 flex flex-col items-center pt-[calc(90px+env(safe-area-inset-top,24px))] pb-10">
        <div className="w-16 h-16 bg-[#7C3AED]/10 rounded-[20px] flex items-center justify-center mb-6 border border-slate-50">
          <Briefcase className="text-primary w-8 h-8" strokeWidth={2} />
        </div>

        <h2 className="text-[20px] font-bold text-[#0f172a] tracking-tight text-center uppercase">
          Sou Profissional
        </h2>
        <p className="text-[13px] font-normal text-slate-500 mt-2 mb-8 text-center">
          Informações para prestação de serviços
        </p>

        <div className="w-full space-y-4">
          <CustomInput
            label="NOME PROFISSIONAL"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />

          <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            <button
              onClick={() => setPersonType('individual')}
              className={`flex-1 py-3 text-[10px] font-semibold uppercase tracking-wider rounded-xl transition-all ${
                personType === 'individual' 
                  ? 'bg-white text-primary shadow-sm' 
                  : 'text-slate-400'
              }`}
            >
              Pessoa Física
            </button>
            <button
              onClick={() => setPersonType('company')}
              className={`flex-1 py-3 text-[10px] font-semibold uppercase tracking-wider rounded-xl transition-all ${
                personType === 'company' 
                  ? 'bg-white text-primary shadow-sm' 
                  : 'text-slate-400'
              }`}
            >
              Empresa (CNPJ)
            </button>
          </div>

          <CustomInput
            label={personType === 'individual' ? 'CPF' : 'CNPJ'}
            type="text"
            value={formData.id}
            onChange={(e) => setFormData({...formData, id: e.target.value})}
          />

          <div className="relative group w-full">
            <label className="absolute left-4 top-3 text-[10px] font-medium text-slate-400 uppercase tracking-widest z-10">
              CATEGORIA
            </label>
            <div className="relative">
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-[64px] bg-white border border-slate-200 rounded-2xl px-4 pt-6 text-slate-800 font-normal focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none appearance-none cursor-pointer"
              >
                <option value="Outros">Outros</option>
                <option value="Limpeza">Limpeza</option>
                <option value="Manutenção">Manutenção</option>
                <option value="Informática">Informática</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 mt-2">
                <ChevronDown size={20} strokeWidth={2} />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button variant="primary" onClick={onContinue} showArrow>
              Continuar
            </Button>
          </div>
        </div>
      </div>

      <QRCodeModal 
        isOpen={isQRModalOpen} 
        onClose={() => setIsQRModalOpen(false)} 
      />
    </div>
  );
};
