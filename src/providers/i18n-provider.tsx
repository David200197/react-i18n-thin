import React, { ReactNode, useCallback, useMemo, useState } from "react";
import { Translation } from "../interfaces/translation";
import { setStoredLanguage } from "../utils/set-stored-language";
import { I18nContext } from "../context/i18n-context";
import { getLanguage } from "../utils/get-language";
import { Translator } from "../interfaces/translator";

type Props = {
  defaultLanguage: string;
  translations: Translation;
  children: ReactNode;
};
export const I18nProvider = ({
  defaultLanguage,
  translations,
  children,
}: Props) => {
  const [language, setLanguage] = useState<string>(
    getLanguage(translations, defaultLanguage)
  );

  const changeLanguage = useCallback(
    (lang: string) => {
      if (!translations[lang])
        throw new Error(`You can't switch to an unconfigured language`);
      setLanguage(lang);
      setStoredLanguage(lang);
    },
    [translations]
  );

  const t: Translator = useCallback(
    (key, variables) => {
      const keys = key.toString().split(".");
      let value = translations[language];
      for (const currentKey of keys) {
        if (!value || !value[key])
          throw new Error("The key provided is incorrect");
        value = value[currentKey];
      }
      if (typeof value === "number") return value.toString();
      if (typeof value === "boolean") return String(value);
      if (typeof value !== "string") {
        throw new Error("The value of a key cannot be an object or array");
      }
      if (!variables) return value;
      for (const key in variables) {
        const currentVariable = variables[key];
        value = value.replace(`{${key}}`, currentVariable.toString());
      }
      return value;
    },
    [language, translations]
  );

  const value = useMemo(
    () => ({ language, changeLanguage, t }),
    [changeLanguage, language, t]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};
