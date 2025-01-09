import React, { ReactNode, useCallback, useMemo, useState } from "react";
import { Translation } from "../interfaces/translation";
import { setStoredLanguage } from "../utils/set-stored-language";
import { I18nContext } from "../context/i18n-context";
import { getLanguage } from "../utils/get-language";
import { Translator } from "../interfaces/translator";
import { isDefined } from "../utils/is-not-defined";

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
        throw new Error(
          `You can't switch to an unconfigured language: ${lang}`
        );
      setLanguage(lang);
      setStoredLanguage(lang);
    },
    [translations]
  );

  const t: Translator = useCallback(
    (key, variables) => {
      const keys = key.toString().split(".");
      let value: any = translations[language];

      if (
        typeof value === "number" ||
        typeof value === "boolean" ||
        typeof value === "string"
      ) {
        throw new Error(
          `The config language cannot be string, boolean or string value`
        );
      }

      for (const currentKey of keys) {
        const currentValue = value[currentKey];
        if (!value || !isDefined(currentValue))
          throw new Error(`The key provided "${keys}" is incorrect`);
        value = currentValue;
      }

      if (typeof value === "number") return value.toString();
      if (typeof value === "boolean") return String(value);
      if (typeof value !== "string") {
        throw new Error(
          `The value of a key "${keys}" cannot be an object or array`
        );
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
