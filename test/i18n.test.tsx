import React from "react";
import { test, describe, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { I18nProvider } from "../src/providers/i18n-provider";
import { useTranslation } from "../src/hooks/use-translation";

const en = {
  example: "example",
};
const es = {
  example: "ejemplo",
};

const TestBed = () => {
  const { t, changeLanguage, language } = useTranslation();

  return (
    <>
      <button onClick={() => changeLanguage("en")}>change to english</button>
      <button onClick={() => changeLanguage("es")}>change to spanish</button>
      <button onClick={() => changeLanguage("it")}>change to italian</button>
      <p>{t("example")}</p>
      <p>{language}</p>
    </>
  );
};

describe("I18n Test", () => {
  test("should be defined component", () => {
    render(
      <I18nProvider defaultLanguage="en" translations={{ en, es }}>
        <TestBed />
      </I18nProvider>
    );

    expect(screen).toBeDefined();
  });
  test("should be change the language", () => {
    render(
      <I18nProvider defaultLanguage="en" translations={{ en, es }}>
        <TestBed />
      </I18nProvider>
    );
    expect(screen.getByText("example")).toBeDefined();
    expect(screen.getByText("en")).toBeDefined();

    const changeToSpanishButton = screen.getByText("change to spanish");
    fireEvent.click(changeToSpanishButton);
    expect(screen.getByText("ejemplo")).toBeDefined();
    expect(screen.getByText("es")).toBeDefined();

    const changeToEnglishButton = screen.getByText("change to english");
    fireEvent.click(changeToEnglishButton);
    expect(screen.getByText("example")).toBeDefined();
    expect(screen.getByText("en")).toBeDefined();
  });
});
