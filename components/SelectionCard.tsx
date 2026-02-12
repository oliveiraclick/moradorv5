
import React from 'react';
import { ChevronRight, LucideIcon } from 'lucide-react';

interface SelectionCardProps {
  title: string;
  description: string;
  Icon: LucideIcon;
  onClick: () => void;
}

export const SelectionCard: React.FC<SelectionCardProps> = ({ title, description, Icon, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full bg-white rounded-[24px] p-6 flex items-center space-x-4 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_20px_-4px_rgba(0,0,0,0.08)] transition-all duration-300 group border border-slate-50 active:scale-[0.98]"
    >
      <div className="w-11 h-11 bg-[#7C3AED]/10 rounded-[14px] flex items-center justify-center shrink-0">
        <Icon className="text-primary w-5 h-5" strokeWidth={2} />
      </div>
      <div className="flex-1 text-left">
        <h3 className="text-[#0f172a] font-semibold text-[16px] leading-tight group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-slate-500 text-[13px] font-normal leading-relaxed mt-1">
          {description}
        </p>
      </div>
      <ChevronRight className="text-slate-300 w-5 h-5 group-hover:text-primary transition-colors" />
    </button>
  );
};
