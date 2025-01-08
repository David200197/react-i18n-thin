import { Translator } from "./translator";

export interface I18n {
  language: string;
  changeLanguage: (lang: string) => void;
  t: Translator;
}
