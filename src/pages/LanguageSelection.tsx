
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' }
];

export function LanguageSelection() {
  const navigate = useNavigate();
  
  const selectLanguage = (code: string) => {
    // Here you would typically store the language preference
    localStorage.setItem('preferredLanguage', code);
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-nutritrack-teal to-blue-600 flex flex-col p-6">
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-md w-full">
          <h1 className="text-2xl font-bold text-white mb-8 text-center">
            Choose your language
          </h1>
          
          <div className="space-y-3">
            {languages.map(lang => (
              <Button
                key={lang.code}
                variant="outline"
                className="w-full bg-white hover:bg-white/90 text-left h-auto py-4"
                onClick={() => selectLanguage(lang.code)}
              >
                <span className="flex-1">{lang.name}</span>
                <span className="text-gray-500">{lang.nativeName}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LanguageSelection;
