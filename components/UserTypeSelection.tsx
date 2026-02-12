
import React, { useState } from 'react';
import { User, Briefcase, LogOut } from 'lucide-react';
import { SelectionCard } from './SelectionCard';
import { GlobalHeader } from './GlobalHeader';
import { QRCodeModal } from './QRCodeModal';

interface UserTypeSelectionProps {
  onBack: () => void;
  onLogout: () => void;
  onSelectResident: () => void;
  onSelectProfessional: () => void;
}

export const UserTypeSelection: React.FC<UserTypeSelectionProps> = ({ onBack, onLogout, onSelectResident, onSelectProfessional }) => {
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  return (
    <div className="w-full max-w-[400px] min-h-screen flex flex-col items-center animate-in fade-in slide-in-from-right-4 duration-500 bg-[#F8FAFC]">
      <GlobalHeader 
        type="secondary" 
        title="Tipo de Acesso" 
        onBack={onBack}
        onOpenQR={() => setIsQRModalOpen(true)}
      />

      <div className="w-full px-6 flex-1 flex flex-col items-center pt-[calc(100px+env(safe-area-inset-top,24px))]">
        {/* Title - Inter Bold (700) 20px */}
        <h2 className="text-[20px] font-bold text-[#0f172a] tracking-[-0.01em] mb-10 text-center">
          Como você quer entrar?
        </h2>

        {/* Options */}
        <div className="w-full space-y-4 mb-auto">
          <SelectionCard
            title="Sou Morador"
            description="Acesse avisos, serviços e o marketplace."
            Icon={User}
            onClick={onSelectResident}
          />
          <SelectionCard
            title="Sou Profissional"
            description="Gerencie seus serviços e clientes."
            Icon={Briefcase}
            onClick={onSelectProfessional}
          />
        </div>

        {/* Footer Logout - Text button Slate-500 Medium 13px */}
        <button
          onClick={onLogout}
          className="mt-12 flex items-center space-x-2 text-slate-500 font-medium text-[13px] tracking-[0.1em] uppercase hover:text-red-600 transition-all active:scale-[0.98] py-8"
        >
          <LogOut size={16} strokeWidth={2} />
          <span>Sair da conta</span>
        </button>
      </div>

      <QRCodeModal 
        isOpen={isQRModalOpen} 
        onClose={() => setIsQRModalOpen(false)} 
      />
    </div>
  );
};
