import {
	$getSelection,
	$isRangeSelection,
	COMMAND_PRIORITY_LOW,
	SELECTION_CHANGE_COMMAND,
} from "@payloadcms/richtext-lexical/lexical";
import { useLexicalComposerContext } from "@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
	applyFontSizeToNodes,
	DEFAULT_FONT_SIZE,
	FONT_SIZES,
	type FontSize,
	getFirstTextNodeFontSize,
	getNextFontSizeIndex,
} from "../../utils";
import { Icon } from "../Icon";
import * as styles from "./styles.css";

export const Button = () => {
	const [editor] = useLexicalComposerContext();
	const [currentSize, setCurrentSize] = useState<string>(DEFAULT_FONT_SIZE);

	const currentSizeIndex = useMemo(
		() => FONT_SIZES.indexOf(currentSize as FontSize),
		[currentSize],
	);

	const isAtMinSize = useMemo(
		() => currentSizeIndex === FONT_SIZES.length - 1,
		[currentSizeIndex],
	);

	const isAtMaxSize = useMemo(() => currentSizeIndex === 0, [currentSizeIndex]);

	useEffect(() => {
		const updateCurrentSize = () => {
			const selection = $getSelection();

			if ($isRangeSelection(selection)) {
				const nodes = selection.getNodes();
				const fontSize = getFirstTextNodeFontSize(nodes);
				setCurrentSize(fontSize);
			}
		};

		const unregisterCommand = editor.registerCommand(
			SELECTION_CHANGE_COMMAND,
			() => {
				editor.getEditorState().read(updateCurrentSize);
				return false;
			},
			COMMAND_PRIORITY_LOW,
		);

		const unregisterUpdateListener = editor.registerUpdateListener(
			({ editorState }) => {
				editorState.read(updateCurrentSize);
			},
		);

		return () => {
			unregisterCommand();
			unregisterUpdateListener();
		};
	}, [editor]);

	const changeFontSize = useCallback(
		(delta: number) => {
			editor.update(() => {
				const selection = $getSelection();

				if ($isRangeSelection(selection)) {
					const nodes = selection.extract();
					const currentFontSize = getFirstTextNodeFontSize(nodes);
					const newIndex = getNextFontSizeIndex(currentFontSize, delta);
					const newSize = FONT_SIZES[newIndex];

					applyFontSizeToNodes(nodes, newSize);
				}
			});
		},
		[editor],
	);

	const handleDecrease = useCallback(
		() => changeFontSize(-1),
		[changeFontSize],
	);
	const handleIncrease = useCallback(() => changeFontSize(1), [changeFontSize]);

	return (
		<div className={styles.container}>
			<button
				type="button"
				className={styles.btn}
				onClick={handleDecrease}
				disabled={isAtMinSize}
				aria-label="Decrease font size"
			>
				<Icon name="minus" size={16} />
			</button>
			<input
				value={currentSize}
				className={styles.input}
				disabled
				readOnly
				aria-label="Current font size"
			/>
			<button
				type="button"
				className={styles.btn}
				onClick={handleIncrease}
				disabled={isAtMaxSize}
				aria-label="Increase font size"
			>
				<Icon name="plus" size={16} />
			</button>
		</div>
	);
};
