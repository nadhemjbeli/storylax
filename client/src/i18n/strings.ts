import { en } from "./en";

export const defaultLanguage = 'en';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const i18n: Record<string, any>={
  en
}

export const strings = i18n[defaultLanguage];