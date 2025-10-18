export const FONT_SIZES = [
  "40px",
  "32px",
  "24px",
  "18px",
  "16px",
  "14px",
  "12px",
] as const;

export const DEFAULT_FONT_SIZE = "16px";

export const FONT_SIZE_REGEX = /font-size:\s*([^;]+)/;

export type FontSize = (typeof FONT_SIZES)[number];
