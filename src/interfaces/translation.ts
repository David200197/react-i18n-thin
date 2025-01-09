export type TranslationValue =
  | string
  | number
  | boolean
  | string[]
  | number[]
  | boolean[]
  | Translation
  | Translation[];

export interface Translation {
  [key: string]: TranslationValue;
}
