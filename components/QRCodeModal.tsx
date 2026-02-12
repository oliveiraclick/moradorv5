
import React from 'react';
import { X, QrCode, ShieldCheck } from 'lucide-react';
import { Button } from './Button';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
  address?: string;
  avatarUrl?: string;
  userRole?: 'Morador' | 'Profissional';
  category?: string;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({ 
  isOpen, 
  onClose, 
  userName = "denys ultimo teste", 
  address = "RUA 1, 460",
  avatarUrl = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop",
  userRole = 'Morador',
  category
}) => {
  if (!isOpen) return null;

  const isProfessional = userRole === 'Profissional';

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 animate-in fade-in duration-200">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-[360px] bg-white rounded-[32px] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex flex-col items-center animate-in slide-in-from-bottom-4 duration-200">
        
        {/* Header */}
        <div className="w-full flex items-center justify-between mb-2">
          <h2 className="text-[16px] font-semibold text-slate-900">
            {isProfessional ? 'Identificação Profissional' : 'Id Individual'}
          </h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 bg-slate-100 rounded-[12px] flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-all active:scale-95"
          >
            <X size={18} strokeWidth={2.5} />
          </button>
        </div>

        {/* User Avatar */}
        <div className="relative mt-2 mb-4">
          <div className="w-[88px] h-[88px] bg-white rounded-[24px] shadow-[0_8px_20px_rgba(0,0,0,0.06)] p-1.5 flex items-center justify-center border border-slate-50 relative">
            <img 
              src={avatarUrl} 
              alt={userName}
              className="w-full h-full object-cover rounded-[20px]"
            />
            {isProfessional && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-slate-900 border-2 border-white shadow-sm">
                <ShieldCheck size={12} strokeWidth={3} />
              </div>
            )}
          </div>
        </div>

        {/* User Info */}
        <div className="text-center">
          <h3 className="text-[18px] font-bold text-slate-900 leading-tight uppercase">
            {userName}
          </h3>
          <p className="text-[13px] font-normal text-slate-500 mt-1 uppercase tracking-wide">
            {isProfessional ? (category || 'Prestador de Serviço') : address}
          </p>
        </div>

        {/* QR Code Container */}
        <div className="mt-6 mb-4 p-4 bg-white rounded-[24px] shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-slate-50">
          <div className="w-[160px] h-[160px] flex items-center justify-center bg-[#F8FAFC] rounded-xl overflow-hidden">
            <QrCode size={130} strokeWidth={1.5} className="text-slate-900" />
          </div>
        </div>

        {/* Instructions */}
        <p className="text-[12px] font-medium text-slate-500 text-center uppercase tracking-[0.1em] leading-relaxed mb-6 px-4">
          {isProfessional 
            ? "Apresente seu código na portaria para registrar sua entrada e saída no condomínio."
            : "Apresente este código na portaria para retirar suas encomendas com segurança."}
        </p>

        {/* Action Button */}
        <Button variant="primary" className="w-full !rounded-[16px] !h-[48px] !text-[15px] !font-semibold">
          {isProfessional ? 'Registrar Acesso' : 'Autorizar Vizinho'}
        </Button>
      </div>
    </div>
  );
};
