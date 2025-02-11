import React, { createContext, useContext, useState, useEffect } from 'react';

interface RulesContextType {
  mainRules: string;
  jobRules: string;
  robberyRules: string;
  gangRules: string;
  updateRules: (type: 'main' | 'job' | 'robbery' | 'gang', content: string) => void;
  saveRules: (type: 'main' | 'job' | 'robbery' | 'gang') => void;
  isDirty: Record<string, boolean>;
}

const RulesContext = createContext<RulesContextType | null>(null);

export const RulesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mainRules, setMainRules] = useState(() => localStorage.getItem('mainRules') || '');
  const [jobRules, setJobRules] = useState(() => localStorage.getItem('jobRules') || '');
  const [robberyRules, setRobberyRules] = useState(() => localStorage.getItem('robberyRules') || '');
  const [gangRules, setGangRules] = useState(() => localStorage.getItem('gangRules') || '');
  const [isDirty, setIsDirty] = useState<Record<string, boolean>>({
    main: false,
    job: false,
    robbery: false,
    gang: false
  });

  const updateRules = (type: 'main' | 'job' | 'robbery' | 'gang', content: string) => {
    setIsDirty(prev => ({ ...prev, [type]: true }));
    switch (type) {
      case 'main':
        setMainRules(content);
        break;
      case 'job':
        setJobRules(content);
        break;
      case 'robbery':
        setRobberyRules(content);
        break;
      case 'gang':
        setGangRules(content);
        break;
    }
  };

  const saveRules = (type: 'main' | 'job' | 'robbery' | 'gang') => {
    switch (type) {
      case 'main':
        localStorage.setItem('mainRules', mainRules);
        break;
      case 'job':
        localStorage.setItem('jobRules', jobRules);
        break;
      case 'robbery':
        localStorage.setItem('robberyRules', robberyRules);
        break;
      case 'gang':
        localStorage.setItem('gangRules', gangRules);
        break;
    }
    setIsDirty(prev => ({ ...prev, [type]: false }));
  };

  return (
    <RulesContext.Provider value={{ 
      mainRules, 
      jobRules, 
      robberyRules, 
      gangRules, 
      updateRules,
      saveRules,
      isDirty
    }}>
      {children}
    </RulesContext.Provider>
  );
};

export const useRules = () => {
  const context = useContext(RulesContext);
  if (!context) {
    throw new Error('useRules must be used within a RulesProvider');
  }
  return context;
};
