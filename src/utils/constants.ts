/**
 * Default font sizes available in the editor (from smallest to largest)
 */
export const DEFAULT_FONT_SIZES = [
	"6px",
	"8px",
	"10px",
	"12px",
	"14px",
	"16px",
	"18px",
	"20px",
	"24px",
	"28px",
	"32px",
	"36px",
	"40px",
	"48px",
	"56px",
	"64px",
	"72px",
];

/**
 * Default font size (first element of DEFAULT_FONT_SIZES)
 */
export const DEFAULT_FONT_SIZE = DEFAULT_FONT_SIZES[0];

/**
 * Regex pattern to extract font-size from CSS style string
 */
export const FONT_SIZE_REGEX = /font-size:\s*([^;]+)/;
