
import React, { useState } from 'react';
import { Building2, Eye, EyeOff } from 'lucide-react';
import { CustomInput } from './CustomInput';
import { Button } from './Button';

interface LoginScreenProps {
  onLoginSuccess: () => void;
  onCreateAccount: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess, onCreateAccount }) => {
  const [email, setEmail] = useState('denyscoborges@gmail.com');
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const handleLogin = () => {
    if (email && password) {
      onLoginSuccess();
    }
  };

  return (
    <div className="w-full max-w-[400px] flex flex-col items-center justify-center animate-in fade-in duration-700 px-6 py-12 min-h-screen">
      {/* Brand Header */}
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-white rounded-[20px] shadow-soft flex items-center justify-center mb-4 border border-slate-50">
          <Building2 className="text-primary w-8 h-8" strokeWidth={1.5} />
        </div>
        
        <h1 className="text-[20px] font-bold text-slate-900 tracking-tight mb-1 leading-tight uppercase">
          APP MORADOR
        </h1>
        <p className="text-[13px] font-normal text-slate-400">
          Conecte-se. Clicou, achou.
        </p>
      </div>

      {/* Login Card */}
      <div className="w-full bg-white rounded-[40px] shadow-soft p-8 mt-8 border border-slate-100">
        <div className="space-y-4">
          <CustomInput
            label="EMAIL"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <CustomInput
            label="SENHA"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            rightElement={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400 hover:text-primary transition-colors p-1"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            }
          />

          {/* Options */}
          <div className="flex items-center justify-between pt-2">
            <label className="flex items-center space-x-2 cursor-pointer group">
              <div 
                className={`w-4 h-4 rounded border transition-all flex items-center justify-center ${
                  remember ? 'bg-primary border-primary shadow-sm' : 'border-slate-200 group-hover:border-slate-300'
                }`}
                onClick={() => setRemember(!remember)}
              >
                {remember && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="text-[12px] font-medium text-slate-500 transition-colors">Lembrar</span>
            </label>
            <Button variant="text" onClick={() => alert('Em breve: Fluxo de recuperação de senha.')}>
              ESQUECEU?
            </Button>
          </div>

          {/* Actions */}
          <div className="space-y-4 pt-4">
            <Button 
              variant="primary" 
              onClick={handleLogin}
              className="mt-2"
            >
              ACESSAR CONTA
            </Button>
            <Button 
              variant="outline" 
              onClick={onCreateAccount}
            >
              CRIAR NOVA CONTA
            </Button>
          </div>
        </div>
      </div>
      
      {/* Footer Info */}
      <div className="mt-8 text-center">
        <p className="text-[10px] font-normal text-slate-300 uppercase tracking-widest leading-loose">
          Versão 2.4.0 • Produzido por <br/>
          <span className="font-semibold text-slate-400">IAGCO TECNOLOGIA</span>
        </p>
      </div>
    </div>
  );
};
