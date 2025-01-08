import { createContext } from "react";
import { I18n } from "../interfaces/i18n";

export const I18nContext = createContext<I18n | null>(null);
