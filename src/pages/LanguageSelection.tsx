
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { ChevronLeft } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' }
];

export function LanguageSelection() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const selectLanguage = (code: string) => {
    // Here you would typically store the language preference
    localStorage.setItem('preferredLanguage', code);
    navigate('/auth');
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-nutritrack-teal to-blue-600 flex flex-col">
      {/* Header with back button */}
      <div className="p-4">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={goBack}
          className="text-white hover:bg-white/10"
        >
          <ChevronLeft size={24} />
        </Button>
      </div>
      
      <div className="flex-1 flex items-center justify-center px-6 py-4">
        <div className={isMobile ? "w-full" : "max-w-2xl w-full"}>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8 text-center">
              Choose your language
            </h1>
            
            {/* Responsive grid for tablet layout */}
            <div className={`grid gap-3 ${isMobile ? "" : "md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"}`}>
              {languages.map(lang => (
                <Button
                  key={lang.code}
                  variant="outline"
                  className="w-full bg-white hover:bg-white/90 text-left h-auto py-4 group transition-all"
                  onClick={() => selectLanguage(lang.code)}
                >
                  <div className="flex items-center w-full">
                    <span className="text-xl mr-3">{lang.flag}</span>
                    <div className="flex-1">
                      <div className="font-medium">{lang.name}</div>
                      <div className="text-sm text-gray-500">{lang.nativeName}</div>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LanguageSelection;
