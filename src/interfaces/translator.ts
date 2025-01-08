export type Translator = (
  key: string,
  variables?: Record<string, string | number | boolean>
) => string;
