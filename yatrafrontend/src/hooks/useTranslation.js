import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations/translations';

// Custom hook for easy translation usage
export const useTranslation = () => {
  const { language } = useLanguage();
  
  const t = (key) => {
    return getTranslation(key, language);
  };
  
  return { t, language };
};
