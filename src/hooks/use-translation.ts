import { use } from "react";
import { I18nContext } from "../context/i18n-context";

export const useTranslation = () => {
  const context = use(I18nContext);
  if (context === null) {
    throw new Error(
      "The I18n context is not initialized. Make sure you have the provider set up correctly."
    );
  }
  return context;
};
