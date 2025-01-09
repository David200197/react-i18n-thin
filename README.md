# React-I18n-Thin

`react-i18n-thin` is a lightweight internationalization library for React applications. It provides a simple API to manage translations and locale settings. Load the default language prioritizing local storage or browser settings

## Installation

You can install `react-i18n-thin` using npm:

```bash
npm install react-i18n-thin
```

## Usage
Below is a simple example of how to set up the I18nProvider and use the useTranslation hook in a React application.

### Setting up I18nProvider
First, wrap your application with the I18nProvider to provide the translation context to your components.

```tsx
import React from "react";
import ReactDOM from "react-dom";
import { I18nProvider } from "react-i18n-thin";

const translations = {
  en: {
    welcome: "Welcome",
    goodbye: "Goodbye",
  },
  es: {
    welcome: "Bienvenido",
    goodbye: "Adiós",
  },
};

function App() {
  return (
    <I18nProvider translations={translations} defaultLanguage="en">
      <YourMainComponent />
    </I18nProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
```

### Using the useTranslation Hook
You can use the useTranslation hook to access translation functions within your components.

```tsx
import React from "react";
import { useTranslation } from "react-i18n-thin";

function WelcomeComponent() {
  const { t, changeLanguage } = useTranslation();

  return (
    <div>
      <h1>{t("welcome")}</h1>
      <button onClick={() => changeLanguage("es")}>Switch to Spanish</button>
      <button onClick={() => changeLanguage("en")}>Switch to English</button>
    </div>
  );
}

export default WelcomeComponent;
```

### Using the useTranslation Hook with Variables
You can pass variables for dynamic content.

```tsx
//main.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { I18nProvider } from 'react-i18n-thin';

const translations = {
  en: {
    welcome: "Welcome, {name}",
  },
  es: {
    welcome: "Bienvenido, {name}",
  }
};

function App() {
  return (
    <I18nProvider translations={translations} defaultLanguage="en">
      <YourMainComponent />
    </I18nProvider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
```

```tsx
//YourMainComponent.tsx
import React from 'react';
import { useTranslation } from 'react-i18n-thin';

function WelcomeComponent() {
  const { t } = useTranslation();

  return (
    <div>
      {/* "Welcome, David" */}
      <h1>{t('welcome', { name: "David" })}</h1>
    </div>
  );
}

export default WelcomeComponent;
```

### Using the useTranslation Hook with Nested Keys
you can use nested keys.

```tsx
//main.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { I18nProvider } from 'react-i18n-thin';

const translations = {
  en: {
    greetings: {
      welcome: "Welcome",
    },
  },
  es: {
    greetings: {
      welcome: "Bienvenido",
    },
  }
};

function App() {
  return (
    <I18nProvider translations={translations} defaultLanguage="en">
      <YourMainComponent />
    </I18nProvider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
```

```tsx
import React from 'react';
import { useTranslation } from 'react-i18n-thin';

function WelcomeComponent() {
  const { t } = useTranslation();

  return (
    <div>
      {/* "Welcome" */}
      <h1>{t('greetings.welcome')}</h1>
    </div>
  );
}

export default WelcomeComponent;
```

## API

### I18nProvider:

- translations (required): An object containing your translations.
- defaultLanguage (required): A string indicating the default language.

### useTranslation

- t(key: string, variables: object): string - Function to get the translated string by key.
- changeLanguage(languageCode: string): void - Function to change the current language.
- language: The active language.

## License

MIT
