
import React from 'react';
import { Home, Calendar, Wallet, Menu } from 'lucide-react';

interface ProfessionalBottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const ProfessionalBottomNav: React.FC<ProfessionalBottomNavProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Início' },
    { id: 'agenda', icon: Calendar, label: 'Agenda' },
    { id: 'financeiro', icon: Wallet, label: 'Financeiro' },
    { id: 'perfil', icon: Menu, label: 'Menu' },
  ];

  const handleTabClick = (tabId: string) => {
    onTabChange(tabId);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-4 pb-[env(safe-area-inset-bottom,24px)] pt-3 flex items-center justify-between z-50 shadow-[0_-4px_16px_rgba(0,0,0,0.03)] h-[calc(72px+env(safe-area-inset-bottom,24px))]">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`flex flex-col items-center justify-center gap-1 py-2 px-3 rounded-[16px] transition-all duration-200 active:scale-95 min-w-[72px] ${
              isActive ? 'bg-primary-soft text-primary' : 'text-slate-400'
            }`}
          >
            <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
            <span className={`text-[11px] font-medium uppercase tracking-[0.05em] leading-none ${
              isActive ? 'text-primary' : 'text-slate-400'
            }`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
