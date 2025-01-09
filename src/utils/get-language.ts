import { LANGUAGE_KEY } from "../const/language-key";
import { Translation } from "../interfaces/translation";

const getStoredLanguage = () => localStorage.getItem(LANGUAGE_KEY);

const getBrowserLanguage = () => navigator.language.split("-")[0];

export const getLanguage = (
  translations: Translation,
  defaultLanguage: string
) => {
  if (!translations[defaultLanguage])
    throw new Error(`Default language not found: ${defaultLanguage}`);
  const storedLang = getStoredLanguage();
  const browserLang = getBrowserLanguage();

  if (storedLang && translations[storedLang]) return storedLang;

  if (translations[browserLang]) return browserLang;
  if (translations[defaultLanguage]) return defaultLanguage;
  return defaultLanguage;
};
