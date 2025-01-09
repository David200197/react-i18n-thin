import React from "react";
import { useTranslation } from "../../src/hooks/use-translation";

type Props = { throwError?: (error: Error) => void };
export const TestBed = ({ throwError }: Props) => {
  const { t, changeLanguage, language } = useTranslation();

  const dispatchError = () => {
    try {
      changeLanguage("it");
    } catch (error: any) {
      throwError?.(error);
    }
  };

  return (
    <>
      <button onClick={() => changeLanguage("en")}>change to english</button>
      <button onClick={() => changeLanguage("es")}>change to spanish</button>
      <button onClick={dispatchError}>change to italian</button>
      <p>{t("example")}</p>
      <p>{language}</p>
    </>
  );
};
