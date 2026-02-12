
export const theme = {
  colors: {
    primary: {
      light: '#A78BFA',
      main: '#7C3AED',
      dark: '#5B21B6',
      soft: 'rgba(124, 58, 237, 0.08)',
    },
    neutral: {
      bg: '#F8FAFC',
      surface: '#FFFFFF',
      textMain: '#0F172A',
      textSecondary: '#64748B',
      border: '#E2E8F0',
    },
  },
  radius: {
    card: '24px',
    button: '16px',
    input: '16px',
    icon: '14px',
    backBtn: '12px',
  },
  shadows: {
    soft: '0 4px 12px -2px rgba(0, 0, 0, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.03)',
    button: '0 8px 16px -4px rgba(124, 58, 237, 0.15)',
  }
};

export const styles = {
  // Ajustado para garantir que o flex não ignore o padding-top de segurança
  container: "min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6",
  label: "text-[10px] font-medium text-slate-400 uppercase tracking-[0.2em] mb-1.5 pl-1",
};