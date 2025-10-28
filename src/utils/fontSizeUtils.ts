import {
	$isTextNode,
	$setState,
	createState,
	type LexicalNode,
} from "@payloadcms/richtext-lexical/lexical";

import { FONT_SIZE_REGEX } from "./constants";

/**
 * Extracts font-size value from a CSS style string
 * @param style - CSS style string
 * @param defaultSize - Default font size to return if not found
 * @returns Font size value or default font size
 */
export const extractFontSize = (style: string, defaultSize: string): string => {
	const match = style.match(FONT_SIZE_REGEX);
	return match ? match[1].trim() : defaultSize;
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
 * @param sizes - Array of available font sizes
 * @param defaultSize - Default font size to return if not found
 * @param selectionStyle - Optional selection style to check when no text nodes found
 * @returns Font size value or default font size
 */
export const getFirstTextNodeFontSize = (
	nodes: LexicalNode[],
	defaultSize: string,
	selectionStyle?: string,
): string => {
	for (const node of nodes) {
		if ($isTextNode(node)) {
			return extractFontSize(node.getStyle(), defaultSize);
		}
	}

	if (selectionStyle) {
		return extractFontSize(selectionStyle, defaultSize);
	}

	return defaultSize;
};

const fontSizeState = createState("fontSize", {
	parse: Number,
});

/**
 * Applies font size to all text nodes in the array
 * @param nodes - Array of Lexical nodes
 * @param fontSize - Font size to apply
 * @param sizes - Array of available font sizes
 */
export const applyFontSizeToNodes = (
	nodes: LexicalNode[],
	fontSize: string,
	sizes: string[],
): void => {
	nodes.forEach((node) => {
		if ($isTextNode(node)) {
			const newStyle = createStyleWithFontSize(node.getStyle(), fontSize);
			node.setStyle(newStyle);
			$setState(node, fontSizeState, sizes.indexOf(fontSize));
		}
	});
};

/**
 * Calculates the next font size index based on current size and delta
 * @param currentSize - Current font size value
 * @param delta - Change direction (-1 for smaller, 1 for larger)
 * @param sizes - Array of available font sizes
 * @returns Index of the next font size in sizes array
 */
export const getNextFontSizeIndex = (
	currentSize: string,
	delta: number,
	sizes: string[],
): number => {
	const currentIndex = sizes.indexOf(currentSize);
	const startIndex = currentIndex === -1 ? 0 : currentIndex;
	return Math.max(0, Math.min(sizes.length - 1, startIndex + delta));
};
