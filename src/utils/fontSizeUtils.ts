import {
	$isTextNode,
	$setState,
	createState,
	type LexicalNode,
} from "@payloadcms/richtext-lexical/lexical";

import {
	DEFAULT_FONT_SIZE,
	FONT_SIZE_REGEX,
	FONT_SIZES,
	type FontSize,
} from "./constants";

/**
 * Extracts font-size value from a CSS style string
 * @param style - CSS style string
 * @returns Font size value or default font size
 */
export const extractFontSize = (style: string): string => {
	const match = style.match(FONT_SIZE_REGEX);
	return match ? match[1].trim() : DEFAULT_FONT_SIZE;
};

/**
 * Removes font-size property from a CSS style string
 * @param style - CSS style string
 * @returns Style string without font-size property
 */
export const removeFontSizeFromStyle = (style: string): string => {
	return style.replace(/font-size:\s*[^;]+;?\s*/g, "").trim();
};

/**
 * Creates a new style string with the specified font size
 * @param currentStyle - Current CSS style string
 * @param fontSize - Font size to apply
 * @returns New style string with font-size property
 */
export const createStyleWithFontSize = (
	currentStyle: string,
	fontSize: string,
): string => {
	const styleWithoutFontSize = removeFontSizeFromStyle(currentStyle);

	return styleWithoutFontSize
		? `${styleWithoutFontSize}; font-size: ${fontSize}`
		: `font-size: ${fontSize}`;
};

/**
 * Gets the font size from the first text node in the array
 * @param nodes - Array of Lexical nodes
 * @returns Font size value or default font size
 */
export const getFirstTextNodeFontSize = (nodes: LexicalNode[]): string => {
	for (const node of nodes) {
		if ($isTextNode(node)) {
			return extractFontSize(node.getStyle());
		}
	}

	return DEFAULT_FONT_SIZE;
};

const fontSizeState = createState("fontSize", {
	parse: Number,
});

/**
 * Applies font size to all text nodes in the array
 * @param nodes - Array of Lexical nodes
 * @param fontSize - Font size to apply
 */
export const applyFontSizeToNodes = (
	nodes: LexicalNode[],
	fontSize: string,
): void => {
	nodes.forEach((node) => {
		if ($isTextNode(node)) {
			const newStyle = createStyleWithFontSize(node.getStyle(), fontSize);
			node.setStyle(newStyle);
			$setState(node, fontSizeState, FONT_SIZES.indexOf(fontSize));
		}
	});
};

/**
 * Calculates the next font size index based on current size and delta
 * @param currentSize - Current font size value
 * @param delta - Change direction (-1 for smaller, 1 for larger)
 * @returns Index of the next font size in FONT_SIZES array
 */
export const getNextFontSizeIndex = (
	currentSize: string,
	delta: number,
): number => {
	const currentIndex = FONT_SIZES.indexOf(currentSize as FontSize);
	const startIndex =
		currentIndex === -1 ? FONT_SIZES.indexOf(DEFAULT_FONT_SIZE) : currentIndex;
	return Math.max(0, Math.min(FONT_SIZES.length - 1, startIndex - delta));
};
