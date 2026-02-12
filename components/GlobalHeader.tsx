
import React from 'react';
import { QrCode, Bell, ArrowLeft } from 'lucide-react';

interface GlobalHeaderProps {
  type?: 'main' | 'secondary';
  title?: string;
  onBack?: () => void;
  onOpenQR?: () => void;
  onOpenNotifications?: () => void;
}

export const GlobalHeader: React.FC<GlobalHeaderProps> = ({ 
  type = 'main', 
  title = "Splendido",
  onBack,
  onOpenQR,
  onOpenNotifications
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] z-50 pt-[env(safe-area-inset-top,24px)]">
      <div className="h-[72px] px-6 flex items-center justify-between">
        {/* LADO ESQUERDO */}
        <div className="flex items-center gap-3">
          {type === 'secondary' ? (
            <button
              onClick={onBack}
              className="w-10 h-10 bg-slate-100 rounded-[12px] flex items-center justify-center text-slate-500 active:scale-95 transition-all"
            >
              <ArrowLeft size={20} strokeWidth={2.5} />
            </button>
          ) : (
            <div className="w-8 h-8 bg-white rounded-lg shadow-sm border border-slate-50 flex items-center justify-center">
               <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
               </div>
            </div>
          )}
          <span className="text-[16px] font-semibold text-slate-900 tracking-tight">
            {title}
          </span>
        </div>

        {/* LADO DIREITO */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onOpenQR}
            className="w-10 h-10 bg-slate-100 rounded-[12px] flex items-center justify-center text-slate-500 hover:text-primary active:scale-95 transition-all"
          >
            <QrCode size={20} strokeWidth={2} />
          </button>
          <button 
            onClick={onOpenNotifications}
            className="w-10 h-10 bg-slate-100 rounded-[12px] flex items-center justify-center text-slate-500 hover:text-primary active:scale-95 transition-all"
          >
            <Bell size={20} strokeWidth={2} />
          </button>
        </div>
      </div>
    </header>
  );
};
