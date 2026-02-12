
import React, { useState, useEffect } from 'react';
import { ChevronDown, CheckCircle2, MessageSquare, Send } from 'lucide-react';
import { GlobalHeader } from './GlobalHeader';
import { Button } from './Button';

interface SuggestionsScreenProps {
  userRole: string;
  onBack: () => void;
  onSuccess: () => void;
}

export const SuggestionsScreen: React.FC<SuggestionsScreenProps> = ({ userRole, onBack, onSuccess }) => {
  const [formData, setFormData] = useState({
    type: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isSent]);

  const handleSubmit = async () => {
    if (!formData.type || !formData.message) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    setIsSubmitting(true);
    
    // Simulando persistência (feedback_app)
    const suggestionData = {
      user_id: 'user-123',
      user_role: userRole,
      mensagem: formData.message,
      tipo: formData.type,
      timestamp: Date.now()
    };
    
    console.log("Salvando feedback_app:", suggestionData);

    // Delay visual
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  if (isSent) {
    return (
      <div className="w-full min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 animate-in zoom-in-95 duration-500">
        <div className="w-20 h-20 bg-green-50 rounded-[32px] flex items-center justify-center text-green-500 mb-6 shadow-sm">
          <CheckCircle2 size={40} strokeWidth={2.5} />
        </div>
        <h2 className="text-[22px] font-bold text-slate-900 text-center uppercase tracking-tight">Obrigado pelo Feedback!</h2>
        <p className="text-[14px] text-slate-500 text-center mt-3 leading-relaxed max-w-[280px]">
          Sua sugestão foi recebida e será analisada pelo nosso time de tecnologia.
        </p>
        <div className="w-full max-w-[240px] mt-10">
          <Button variant="primary" onClick={onSuccess}>Voltar para Início</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] flex flex-col animate-in fade-in slide-in-from-right-4 duration-500 overflow-x-hidden">
      <GlobalHeader 
        type="secondary" 
        title="Sugerir Melhoria" 
        onBack={onBack} 
      />

      <main className="flex-1 px-6 pt-[calc(90px+env(safe-area-inset-top,24px))] pb-10">
        <div className="w-16 h-16 bg-[#7C3AED]/10 rounded-[24px] flex items-center justify-center mb-6 border border-slate-50 mx-auto">
          <MessageSquare className="text-primary w-8 h-8" strokeWidth={2} />
        </div>

        <h2 className="text-[20px] font-bold text-[#0f172a] tracking-tight text-center uppercase mb-8">
          Sua opinião importa
        </h2>

        <div className="w-full bg-white rounded-[24px] p-6 shadow-soft border border-slate-50">
          <div className="space-y-6">
            
            {/* TIPO DE SUGESTÃO */}
            <div className="relative group w-full">
              <label className="block text-[10px] font-medium text-slate-400 uppercase tracking-[0.2em] mb-1.5 pl-1">
                Tipo de Feedback
              </label>
              <div className="relative">
                <select 
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full h-[52px] bg-white border border-slate-200 rounded-[16px] px-4 text-slate-800 font-normal focus:border-primary focus:ring-[3px] focus:ring-primary/5 outline-none appearance-none cursor-pointer"
                >
                  <option value="" disabled>Selecione uma categoria</option>
                  <option value="Bug / Erro">Bug / Erro</option>
                  <option value="Sugestão de Funcionalidade">Nova Funcionalidade</option>
                  <option value="Melhoria de Interface">Melhoria de Interface</option>
                  <option value="Elogio">Elogio</option>
                  <option value="Outros">Outros</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <ChevronDown size={20} strokeWidth={2} />
                </div>
              </div>
            </div>

            {/* MENSAGEM */}
            <div className="w-full">
              <label className="block text-[10px] font-medium text-slate-400 uppercase tracking-[0.2em] mb-1.5 pl-1">
                Sua Mensagem
              </label>
              <textarea 
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Conte para nós como podemos melhorar sua experiência..."
                className="w-full min-h-[160px] bg-white border border-slate-200 rounded-[16px] p-4 text-slate-800 font-normal focus:border-primary focus:ring-[3px] focus:ring-primary/5 outline-none transition-all resize-none placeholder:text-slate-300"
              />
            </div>

            <p className="text-[11px] text-slate-400 text-center leading-relaxed">
              Este feedback é enviado diretamente para a equipe de desenvolvimento do aplicativo.
            </p>

            {/* ENVIAR */}
            <div className="pt-2">
              <Button 
                variant="primary" 
                onClick={handleSubmit}
                className="w-full !rounded-[16px] !h-[48px]"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <div className="flex items-center gap-2">
                    <span>ENVIAR SUGESTÃO</span>
                    <Send size={16} />
                  </div>
                )}
              </Button>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-4 mb-8 flex flex-col items-center opacity-40">
         <p className="text-[10px] font-medium text-slate-300 uppercase tracking-[0.2em]">
          App Improvement • IA&CO
        </p>
      </footer>
    </div>
  );
};
