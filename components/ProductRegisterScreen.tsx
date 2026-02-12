
import React, { useState, useEffect, useRef } from 'react';
/* Added Plus to the lucide-react imports */
import { Camera, ChevronDown, Trash2, LayoutGrid, Eye, Plus } from 'lucide-react';
import { GlobalHeader } from './GlobalHeader';
import { CustomInput } from './CustomInput';
import { Button } from './Button';

interface ProductRegisterScreenProps {
  onBack: () => void;
  onSave: () => void;
}

export const ProductRegisterScreen: React.FC<ProductRegisterScreenProps> = ({ onBack, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    category: '',
    description: ''
  });

  const [images, setImages] = useState<string[]>([]);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isPreviewMode]);

  const formatCurrency = (value: string) => {
    const cleanValue = value.replace(/\D/g, "");
    if (!cleanValue) return "";
    const intValue = parseInt(cleanValue, 10);
    return (intValue / 100).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
    });
  };

  const handlePriceChange = (value: string) => {
    const formatted = formatCurrency(value);
    setFormData({ ...formData, price: formatted });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // Simulando preview de imagem local
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    // Validação básica simplificada para o UX
    if (!formData.name || !formData.price || !formData.stock || !formData.category) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    onSave();
  };

  if (isPreviewMode) {
    return (
      <div className="w-full min-h-screen bg-[#F8FAFC] flex flex-col animate-in fade-in duration-300 overflow-x-hidden">
        <GlobalHeader type="secondary" title="Preview do Produto" onBack={() => setIsPreviewMode(false)} />
        <main className="flex-1 px-6 pt-[calc(90px+env(safe-area-inset-top,24px))] pb-10">
          <div className="w-full bg-white rounded-[32px] overflow-hidden shadow-soft border border-slate-50">
            {images.length > 0 ? (
              <img src={images[0]} className="w-full h-[240px] object-cover" alt="Capa" />
            ) : (
              <div className="w-full h-[240px] bg-slate-100 flex items-center justify-center text-slate-300">
                <LayoutGrid size={48} strokeWidth={1} />
              </div>
            )}
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <span className="text-[11px] font-bold text-primary uppercase tracking-widest">{formData.category || 'Categoria'}</span>
                  <h2 className="text-[20px] font-bold text-slate-900 mt-1 uppercase tracking-tight">{formData.name || 'Nome do Produto'}</h2>
                </div>
                <div className="text-right">
                  <span className="text-[20px] font-bold text-slate-900">R$ {formData.price || '0,00'}</span>
                  <p className="text-[11px] text-slate-400 mt-1 uppercase tracking-tight">{formData.stock} unidades em estoque</p>
                </div>
              </div>
              <p className="text-[14px] text-slate-600 mt-4 leading-relaxed whitespace-pre-wrap">
                {formData.description || 'Nenhuma descrição informada.'}
              </p>
            </div>
          </div>
          <div className="mt-8">
            <Button variant="primary" onClick={handleSave}>Confirmar e Salvar</Button>
            <Button variant="text" onClick={() => setIsPreviewMode(false)} className="w-full mt-2">Voltar para Edição</Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] flex flex-col animate-in fade-in slide-in-from-right-4 duration-500 overflow-x-hidden">
      <GlobalHeader 
        type="secondary" 
        title="Novo Produto" 
        onBack={onBack} 
      />

      <main className="flex-1 px-6 pt-[calc(90px+env(safe-area-inset-top,24px))] pb-10">
        
        {/* SEÇÃO DE IMAGEM */}
        <div className="w-full h-[160px] bg-gradient-to-br from-[#F5F3FF] to-[#EDE9FE] rounded-[24px] relative overflow-hidden border-2 border-dashed border-primary/20 flex flex-col items-center justify-center group mb-6">
          {images.length > 0 ? (
            <div className="w-full h-full flex overflow-x-auto no-scrollbar gap-2 p-2">
              {images.map((img, idx) => (
                <div key={idx} className="relative h-full aspect-square shrink-0">
                  <img src={img} className="w-full h-full object-cover rounded-[16px]" alt={`Upload ${idx}`} />
                  <button 
                    onClick={() => removeImage(idx)}
                    className="absolute top-1.5 right-1.5 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-md active:scale-90 transition-all"
                  >
                    <Trash2 size={12} strokeWidth={2.5} />
                  </button>
                  {idx === 0 && (
                    <div className="absolute bottom-1.5 left-1.5 bg-primary/90 text-white px-2 py-0.5 rounded-md text-[8px] font-bold uppercase tracking-wider">Capa</div>
                  )}
                </div>
              ))}
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="h-full aspect-square shrink-0 bg-white/50 rounded-[16px] flex flex-col items-center justify-center border border-dashed border-primary/30 active:scale-95 transition-all text-primary"
              >
                <Plus size={20} />
              </button>
            </div>
          ) : (
            <>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                className="hidden" 
                multiple 
                accept="image/*" 
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center justify-center space-y-2 group active:scale-95 transition-all"
              >
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-sm border border-primary/10">
                  <Camera size={24} strokeWidth={2} />
                </div>
                <span className="text-[12px] font-bold text-primary uppercase tracking-widest">Selecionar Imagem</span>
              </button>
            </>
          )}
        </div>

        {/* DADOS COMERCIAIS */}
        <div className="w-full bg-white rounded-[24px] p-6 shadow-soft border border-slate-50">
          <div className="space-y-6">
            
            <CustomInput 
              label="Nome do Produto"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ex: Hambúrguer Artesanal"
            />

            <div className="flex gap-4">
              <div className="flex-[2]">
                <label className="block text-[10px] font-medium text-slate-400 uppercase tracking-[0.2em] mb-1.5 pl-1">
                  Preço (R$)
                </label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[14px] text-slate-400 font-medium">R$</span>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => handlePriceChange(e.target.value)}
                    placeholder="0,00"
                    className="w-full h-[52px] bg-white border border-slate-200 rounded-[16px] pl-10 pr-4 text-slate-800 font-normal focus:border-primary focus:ring-[3px] focus:ring-primary/5 outline-none transition-all"
                  />
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-[10px] font-medium text-slate-400 uppercase tracking-[0.2em] mb-1.5 pl-1">
                  Estoque
                </label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  placeholder="0"
                  className="w-full h-[52px] bg-white border border-slate-200 rounded-[16px] px-4 text-slate-800 font-normal focus:border-primary focus:ring-[3px] focus:ring-primary/5 outline-none transition-all"
                />
              </div>
            </div>

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
                  <option value="Alimentação">Alimentação</option>
                  <option value="Serviços rápidos">Serviços rápidos</option>
                  <option value="Moda">Moda</option>
                  <option value="Casa">Casa</option>
                  <option value="Outros">Outros</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <ChevronDown size={20} strokeWidth={2} />
                </div>
              </div>
            </div>

            <div className="w-full">
              <label className="block text-[10px] font-medium text-slate-400 uppercase tracking-[0.2em] mb-1.5 pl-1">
                Descrição
              </label>
              <textarea 
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Descreva o produto..."
                className="w-full min-h-[120px] bg-white border border-slate-200 rounded-[16px] p-4 text-slate-800 font-normal focus:border-primary focus:ring-[3px] focus:ring-primary/5 outline-none transition-all resize-none placeholder:text-slate-300"
              />
            </div>

            <div className="pt-2 flex flex-col gap-3">
              <Button 
                variant="primary" 
                onClick={() => setIsPreviewMode(true)}
                className="w-full !rounded-[16px] !h-[48px]"
              >
                SALVAR NO E-SHOP
              </Button>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-4 mb-8 flex flex-col items-center opacity-40">
         <p className="text-[10px] font-medium text-slate-300 uppercase tracking-[0.2em]">
          Loja do Prestador • IA&CO
        </p>
      </footer>
    </div>
  );
};
