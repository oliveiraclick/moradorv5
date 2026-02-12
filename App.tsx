
import React, { useState, useEffect } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { UserTypeSelection } from './components/UserTypeSelection';
import { CreateAccountScreen } from './components/CreateAccountScreen';
import { ProfessionalAccountScreen } from './components/ProfessionalAccountScreen';
import { HomeScreen } from './components/HomeScreen';
import { ServiceRegisterScreen } from './components/ServiceRegisterScreen';
import { ProductRegisterScreen } from './components/ProductRegisterScreen';
import { SuggestionsScreen } from './components/SuggestionsScreen';

type Screen = 'login' | 'selection' | 'create-account' | 'professional-account' | 'home' | 'service-register' | 'product-register' | 'suggestions';
type UserRole = 'Morador' | 'Profissional';

export interface ActiveProfessional {
  id: string;
  name: string;
  profession: string;
  photoURL: string;
  timestamp: number;
}

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [userRole, setUserRole] = useState<UserRole>('Morador');
  const [activeProfessionals, setActiveProfessionals] = useState<ActiveProfessional[]>([]);

  // Desativar scroll restoration automático
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [currentScreen]);

  const handleLogout = () => {
    setCurrentScreen('login');
    setUserRole('Morador');
  };

  const toggleProfessionalPresence = (professional: ActiveProfessional, isActive: boolean) => {
    if (isActive) {
      setActiveProfessionals(prev => {
        const exists = prev.find(p => p.id === professional.id);
        if (exists) return prev;
        return [...prev, professional].sort((a, b) => b.timestamp - a.timestamp);
      });
    } else {
      setActiveProfessionals(prev => prev.filter(p => p.id !== professional.id));
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <LoginScreen onLoginSuccess={() => setCurrentScreen('home')} onCreateAccount={() => setCurrentScreen('selection')} />;
      case 'selection':
        return (
          <UserTypeSelection 
            onBack={() => setCurrentScreen('login')} 
            onLogout={handleLogout}
            onSelectResident={() => { setUserRole('Morador'); setCurrentScreen('create-account'); }}
            onSelectProfessional={() => { setUserRole('Profissional'); setCurrentScreen('professional-account'); }}
          />
        );
      case 'create-account':
        return <CreateAccountScreen onClose={() => setCurrentScreen('selection')} onContinue={() => setCurrentScreen('home')} />;
      case 'professional-account':
        return <ProfessionalAccountScreen onBack={() => setCurrentScreen('selection')} onContinue={() => setCurrentScreen('home')} />;
      case 'home':
        return (
          <HomeScreen 
            onLogout={handleLogout} 
            userRole={userRole} 
            activeProfessionals={activeProfessionals}
            onTogglePresence={toggleProfessionalPresence}
            onNavigateToServiceRegister={() => setCurrentScreen('service-register')}
            onNavigateToProductRegister={() => setCurrentScreen('product-register')}
            onNavigateToSuggestions={() => setCurrentScreen('suggestions')}
          />
        );
      case 'service-register':
        return (
          <ServiceRegisterScreen 
            onBack={() => setCurrentScreen('home')}
            onSave={() => setCurrentScreen('home')}
          />
        );
      case 'product-register':
        return (
          <ProductRegisterScreen 
            onBack={() => setCurrentScreen('home')}
            onSave={() => setCurrentScreen('home')}
          />
        );
      case 'suggestions':
        return (
          <SuggestionsScreen 
            userRole={userRole}
            onBack={() => setCurrentScreen('home')}
            onSuccess={() => setCurrentScreen('home')}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full bg-[#F8FAFC] min-h-screen">
      {renderScreen()}
    </div>
  );
};

export default App;
