
import React from 'react';
import { Home, Calendar, Plus, Bell, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'agenda', icon: Calendar, label: 'Agenda' },
    { id: 'plus', icon: Plus, label: '', isSpecial: true },
    { id: 'avisos', icon: Bell, label: 'Avisos' },
    { id: 'perfil', icon: User, label: 'Perfil' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 pb-10 pt-3 flex items-center justify-between z-50 shadow-[0_-4px_16px_rgba(0,0,0,0.03)]">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        if (tab.isSpecial) {
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="w-14 h-14 bg-primary rounded-full flex items-center justify-center text-white shadow-[0_8px_16px_rgba(124,58,237,0.3)] -translate-y-6 border-4 border-white active:scale-[0.96] transition-all"
            >
              <Plus size={28} strokeWidth={2.5} />
            </button>
          );
        }

        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center space-y-1 transition-all ${
              isActive ? 'text-primary' : 'text-slate-400'
            }`}
          >
            <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
            <span className={`text-[10px] font-medium tracking-tight ${isActive ? 'text-primary' : 'text-slate-500'}`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
