interface I18n {
  language: string;
  changeLanguage: (lang: string) => void;
  t: Translator;
}
