
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface CustomInputProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  Icon?: LucideIcon;
  rightElement?: React.ReactNode;
}

export const CustomInput: React.FC<CustomInputProps> = ({ label, type, value, onChange, placeholder, Icon, rightElement }) => {
  return (
    <div className="w-full">
      <label className="block text-[10px] font-medium text-slate-400 uppercase tracking-[0.2em] mb-1.5 pl-1">
        {label}
      </label>
      <div className="relative group">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
            <Icon size={18} strokeWidth={2} />
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full h-[52px] bg-white border border-slate-200 rounded-[16px] px-4 text-slate-800 font-normal focus:border-primary focus:ring-[3px] focus:ring-primary/5 outline-none transition-all duration-200 placeholder:text-slate-300 ${
            Icon ? 'pl-12' : ''
          } ${rightElement ? 'pr-12' : ''}`}
        />
        {rightElement && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );
};
