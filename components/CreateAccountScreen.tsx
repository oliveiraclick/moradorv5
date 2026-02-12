
import React, { useState } from 'react';
import { User } from 'lucide-react';
import { CustomInput } from './CustomInput';
import { Button } from './Button';
import { GlobalHeader } from './GlobalHeader';
import { QRCodeModal } from './QRCodeModal';

interface CreateAccountScreenProps {
  onClose: () => void;
  onContinue: () => void;
}

export const CreateAccountScreen: React.FC<CreateAccountScreenProps> = ({ onClose, onContinue }) => {
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    phone: ''
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="w-full max-w-[400px] min-h-screen flex flex-col items-center animate-in fade-in slide-in-from-right-4 duration-500 bg-[#F8FAFC]">
      <GlobalHeader 
        type="secondary" 
        title="Criar Conta" 
        onBack={onClose}
        onOpenQR={() => setIsQRModalOpen(true)}
      />

      <div className="w-full px-6 flex-1 flex flex-col items-center pt-[calc(90px+env(safe-area-inset-top,24px))] pb-10">
        <div className="w-16 h-16 bg-[#7C3AED]/10 rounded-[20px] flex items-center justify-center mb-6 border border-slate-50">
          <User className="text-primary w-8 h-8" strokeWidth={2} />
        </div>

        <h2 className="text-[20px] font-bold text-[#0f172a] tracking-tight text-center uppercase">
          Morador
        </h2>
        <p className="text-[13px] font-normal text-slate-500 tracking-normal mt-2 mb-8 text-center">
          Dados básicos de identificação
        </p>

        {/* Progress Bar Clean */}
        <div className="w-full flex gap-3 mb-8">
          <div className="h-1.5 flex-1 bg-primary rounded-full" />
          <div className="h-1.5 flex-1 bg-slate-200 rounded-full" />
          <div className="h-1.5 flex-1 bg-slate-200 rounded-full" />
        </div>

        <div className="w-full space-y-4">
          <CustomInput
            label="NOME COMPLETO"
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />

          <CustomInput
            label="CELULAR"
            type="text"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
          />

          <CustomInput
            label="CPF"
            type="text"
            value={formData.cpf}
            onChange={(e) => handleChange('cpf', e.target.value)}
          />

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
