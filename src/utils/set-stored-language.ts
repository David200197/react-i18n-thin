import { LANGUAGE_KEY } from "../const/language-key";

export const setStoredLanguage = (language: string) =>
  localStorage.setItem(LANGUAGE_KEY, language);
