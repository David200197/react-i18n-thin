import React from "react";
import { test, describe, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { I18nProvider } from "../src/providers/i18n-provider";
import { TestBed } from "./components/TestBed";
import { useTranslation } from "../src/hooks/use-translation";

const en = {
  example: "example",
};
const es = {
  example: "ejemplo",
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

  test(`should be throw "The I18n context is not initialized. Make sure you have the provider set up correctly."`, () => {
    const renderWithError = () => {
      render(<TestBed />);
    };
    expect(renderWithError).toThrowError(
      "The I18n context is not initialized. Make sure you have the provider set up correctly."
    );
  });

  test(`should be throw "Default language not found"`, () => {
    const renderWithError = () => {
      render(
        <I18nProvider defaultLanguage="en" translations={{}}>
          <TestBed />
        </I18nProvider>
      );
    };
    expect(renderWithError).toThrowError("Default language not found: en");
  });

  test(`The config language cannot be string value`, () => {
    const renderWithError = () => {
      render(
        <I18nProvider defaultLanguage="en" translations={{ en: "en" }}>
          <TestBed />
        </I18nProvider>
      );
    };
    expect(renderWithError).toThrowError(
      "The config language cannot be string, boolean or string value"
    );
  });

  test(`The config language cannot be number value`, () => {
    const renderWithError = () => {
      render(
        <I18nProvider defaultLanguage="en" translations={{ en: 1 }}>
          <TestBed />
        </I18nProvider>
      );
    };
    expect(renderWithError).toThrowError(
      "The config language cannot be string, boolean or string value"
    );
  });

  test(`The config language cannot be boolean value`, () => {
    const renderWithError = () => {
      render(
        <I18nProvider defaultLanguage="en" translations={{ en: true }}>
          <TestBed />
        </I18nProvider>
      );
    };
    expect(renderWithError).toThrowError(
      "The config language cannot be string, boolean or string value"
    );
  });

  test(`The key provided is incorrect"`, () => {
    const renderWithError = () => {
      render(
        <I18nProvider
          defaultLanguage="en"
          translations={{ en: { example2: "example2" } }}
        >
          <TestBed />
        </I18nProvider>
      );
    };
    expect(renderWithError).toThrowError(
      `The key provided "example" is incorrect`
    );
  });

  test("should be change the language without error", () => {
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

  test(`should be throw "You can't switch to an unconfigured language"`, async () => {
    const throwError = (error: Error) =>
      expect(error.message).toBe(
        "You can't switch to an unconfigured language: it"
      );

    const screen = render(
      <I18nProvider defaultLanguage="en" translations={{ en, es }}>
        <TestBed throwError={throwError} />
      </I18nProvider>
    );

    const changeToItalianButton = screen.getByText("change to italian");
    fireEvent.click(changeToItalianButton);
  });

  test(`should be return correct nested data`, async () => {
    const TestBed = () => {
      const { t } = useTranslation();

      return (
        <>
          <p>{t("work.user")}</p>
          <p>{t("work.action")}</p>
          <p>{t("area.safe")}</p>
        </>
      );
    };

    const en = {
      work: {
        user: "example1",
        action: "example2",
      },
      area: {
        safe: "example3",
      },
    };

    const screen = render(
      <I18nProvider defaultLanguage="en" translations={{ en }}>
        <TestBed />
      </I18nProvider>
    );

    expect(screen.getByText("example1")).toBeDefined();
    expect(screen.getByText("example2")).toBeDefined();
    expect(screen.getByText("example3")).toBeDefined();
  });

  test(`should be return correct variable data`, async () => {
    const TestBed = () => {
      const { t } = useTranslation();

      return <p>{t("example", { var: 1 })}</p>;
    };

    const en = {
      example: "var = {var}",
    };

    const screen = render(
      <I18nProvider defaultLanguage="en" translations={{ en }}>
        <TestBed />
      </I18nProvider>
    );

    expect(screen.getByText("var = 1")).toBeDefined();
  });

  test(`should be return correct scalar data`, async () => {
    const TestBed = () => {
      const { t } = useTranslation();

      return (
        <>
          <p>{t("number")}</p>
          <p>{t("boolean")}</p>
        </>
      );
    };

    const en = {
      number: 1,
      boolean: false,
    };

    const screen = render(
      <I18nProvider defaultLanguage="en" translations={{ en }}>
        <TestBed />
      </I18nProvider>
    );

    expect(screen.getByText("1")).toBeDefined();
    expect(screen.getByText("false")).toBeDefined();
  });

  test(`should be throw "The value of a key cannot be an object or array"`, () => {
    const TestBed = () => {
      const { t } = useTranslation();

      return <p>{t("object")}</p>;
    };

    const en = {
      object: {},
    };

    const renderWithError = () => {
      render(
        <I18nProvider defaultLanguage="en" translations={{ en }}>
          <TestBed />
        </I18nProvider>
      );
    };
    expect(renderWithError).toThrowError(
      `The value of a key "object" cannot be an object or array`
    );
  });
});
