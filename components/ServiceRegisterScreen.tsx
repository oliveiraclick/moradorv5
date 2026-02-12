
import React, { useState, useEffect } from 'react';
import { ChevronDown, Briefcase } from 'lucide-react';
import { GlobalHeader } from './GlobalHeader';
import { CustomInput } from './CustomInput';
import { Button } from './Button';

interface ServiceRegisterScreenProps {
  onBack: () => void;
  onSave: () => void;
}

export const ServiceRegisterScreen: React.FC<ServiceRegisterScreenProps> = ({ onBack, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    minPrice: '',
    maxPrice: '',
    category: '',
    description: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const formatCurrency = (value: string) => {
    const cleanValue = value.replace(/\D/g, "");
    if (!cleanValue) return "";
    const intValue = parseInt(cleanValue, 10);
    return (intValue / 100).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
    });
  };

  const handlePriceChange = (field: 'minPrice' | 'maxPrice', value: string) => {
    const formatted = formatCurrency(value);
    setFormData({ ...formData, [field]: formatted });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name) newErrors.name = "Obrigatório";
    if (!formData.minPrice) newErrors.minPrice = "Obrigatório";
    if (!formData.maxPrice) newErrors.maxPrice = "Obrigatório";
    if (!formData.category) newErrors.category = "Obrigatório";
    if (!formData.description) newErrors.description = "Obrigatório";

    const min = parseFloat(formData.minPrice.replace(/\./g, "").replace(",", "."));
    const max = parseFloat(formData.maxPrice.replace(/\./g, "").replace(",", "."));

    if (min > max) {
      newErrors.priceRange = "Valor mínimo não pode ser maior que o máximo";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      onSave();
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] flex flex-col animate-in fade-in slide-in-from-right-4 duration-500 overflow-x-hidden">
      <GlobalHeader 
        type="secondary" 
        title="Novo Serviço" 
        onBack={onBack} 
      />

      <main className="flex-1 px-6 pt-[calc(90px+env(safe-area-inset-top,24px))] pb-10">
        <div className="w-full bg-white rounded-[24px] p-6 shadow-soft border border-slate-50">
          <div className="space-y-6">
            
            {/* NOME DO SERVIÇO */}
            <CustomInput 
              label="Nome do Serviço"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ex: Limpeza de Piscina"
            />

            {/* FAIXA DE PREÇO */}
            <div className="space-y-2">
              <label className="block text-[10px] font-medium text-slate-400 uppercase tracking-[0.2em] mb-1.5 pl-1">
                Faixa de Preço
              </label>
              <div className="flex gap-4">
                <div className="flex-1">
                   <div className="relative group">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[14px] text-slate-400 font-medium">R$</span>
                    <input
                      type="text"
                      value={formData.minPrice}
                      onChange={(e) => handlePriceChange('minPrice', e.target.value)}
                      placeholder="120,00"
                      className="w-full h-[52px] bg-white border border-slate-200 rounded-[16px] pl-10 pr-4 text-slate-800 font-normal focus:border-primary focus:ring-[3px] focus:ring-primary/5 outline-none transition-all duration-200"
                    />
                  </div>
                </div>
                <div className="flex-1">
                   <div className="relative group">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[14px] text-slate-400 font-medium">R$</span>
                    <input
                      type="text"
                      value={formData.maxPrice}
                      onChange={(e) => handlePriceChange('maxPrice', e.target.value)}
                      placeholder="180,00"
                      className="w-full h-[52px] bg-white border border-slate-200 rounded-[16px] pl-10 pr-4 text-slate-800 font-normal focus:border-primary focus:ring-[3px] focus:ring-primary/5 outline-none transition-all duration-200"
                    />
                  </div>
                </div>
              </div>
              {errors.priceRange && <p className="text-[11px] text-red-500 mt-1 pl-1">{errors.priceRange}</p>}
            </div>

            {/* CATEGORIA */}
            <div className="relative group w-full">
              <label className="block text-[10px] font-medium text-slate-400 uppercase tracking-[0.2em] mb-1.5 pl-1">
                Categoria
              </label>
              <div className="relative">
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full h-[52px] bg-white border border-slate-200 rounded-[16px] px-4 text-slate-800 font-normal focus:border-primary focus:ring-[3px] focus:ring-primary/5 outline-none appearance-none cursor-pointer"
                >
                  <option value="" disabled>Selecione uma categoria</option>
                  <option value="Limpeza">Limpeza</option>
                  <option value="Manutenção">Manutenção</option>
                  <option value="Elétrica">Elétrica</option>
                  <option value="Hidráulica">Hidráulica</option>
                  <option value="Outros">Outros</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <ChevronDown size={20} strokeWidth={2} />
                </div>
              </div>
            </div>

            {/* DESCRIÇÃO */}
            <div className="w-full">
              <label className="block text-[10px] font-medium text-slate-400 uppercase tracking-[0.2em] mb-1.5 pl-1">
                Descrição do Serviço
              </label>
              <textarea 
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Descreva o que está incluso no serviço..."
                className="w-full min-h-[120px] bg-white border border-slate-200 rounded-[16px] p-4 text-slate-800 font-normal focus:border-primary focus:ring-[3px] focus:ring-primary/5 outline-none transition-all duration-200 resize-none placeholder:text-slate-300"
              />
            </div>

            {/* SALVAR */}
            <div className="pt-2">
              <Button 
                variant="primary" 
                onClick={handleSave}
                className="w-full !rounded-[16px] !h-[48px]"
              >
                SALVAR SERVIÇO
              </Button>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-4 mb-8 flex flex-col items-center opacity-40">
         <p className="text-[10px] font-medium text-slate-300 uppercase tracking-[0.2em]">
          Ambiente de Edição • IA&CO
        </p>
      </footer>
    </div>
  );
};
