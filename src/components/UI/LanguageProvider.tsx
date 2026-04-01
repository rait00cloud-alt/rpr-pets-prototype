import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../languages/index';

interface LanguageContextType {
  language: 'pt-br' | 'en-us' | 'ja';
  changeLanguage: (lang: 'pt-br' | 'en-us' | 'ja') => void;
  isChanging: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within I18nProvider');
  }
  return context;
};

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const [language, setLanguage] = useState<'pt-br' | 'en-us'>('pt-br');

  const getInitialLanguage = (): 'pt-br' | 'en-us' => {
    if (typeof window === 'undefined') return 'pt-br'; // fallback for SSR

    const storedLang = localStorage.getItem('language') as 'pt-br' | 'en-us' | null;
    if (storedLang && ['pt-br', 'en-us'].includes(storedLang)) return storedLang;

    const urlLang = new URLSearchParams(window.location.search).get('lang') as 'pt-br' | 'en-us' | null;
    if (urlLang && ['pt-br', 'en-us'].includes(urlLang)) return urlLang;

    const browserLang = navigator.language.toLowerCase();
    if (browserLang.includes('pt')) return 'pt-br';
    if (browserLang.includes('en')) return 'en-us';

    return 'pt-br';
  };

  // Initialize language state and i18n
  useEffect(() => {
    const initialLanguage = getInitialLanguage();
    setLanguage(initialLanguage);
    
    const initI18n = async () => {
      try {
        await i18n.init();
        await i18n.changeLanguage(initialLanguage);
        setIsReady(true);
      } catch (error) {
        console.error('Error initializing i18n:', error);
        setIsReady(true); // Continue even if there's an error
      }
    };

    initI18n();
  }, []);

  // Handle language changes
  useEffect(() => {
    if (!isReady) return;

    const changeLang = async () => {
      if (i18n.language !== language) {
        setIsChanging(true);
        try {
          await i18n.changeLanguage(language);
          localStorage.setItem('language', language);

          const url = new URL(window.location.href);
          url.searchParams.set('lang', language);
          window.history.replaceState({}, '', url.toString());

          document.documentElement.lang = language;
        } catch (error) {
          console.error('Error changing language:', error);
        } finally {
          setIsChanging(false);
        }
      }
    };

    changeLang();
  }, [language, isReady]);

  // Listen for external language changes
  useEffect(() => {
    const handleLangChange = (lng: string) => {
      if (lng !== language && (lng === 'pt-br' || lng === 'en-us')) {
        setLanguage(lng as 'pt-br' | 'en-us');
      }
    };

    i18n.on('languageChanged', handleLangChange);
    return () => {
      i18n.off('languageChanged', handleLangChange);
    };
  }, [language]);

  const changeLanguage = (lang: 'pt-br' | 'en-us') => {
    if (!isChanging && lang !== language) {
      setLanguage(lang);
    }
  };

  const contextValue = useMemo(
    () => ({ language, changeLanguage, isChanging }),
    [language, isChanging]
  );

  if (!isReady) return null; // or a loading spinner

  return (
    <LanguageContext.Provider value={contextValue}>
      <I18nextProvider i18n={i18n}>
        <div lang={language}>{children}</div>
      </I18nextProvider>
    </LanguageContext.Provider>
  );
}