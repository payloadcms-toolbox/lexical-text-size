import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  type LexicalEditor,
  SELECTION_CHANGE_COMMAND,
} from "@payloadcms/richtext-lexical/lexical";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  applyFontSizeToNodes,
  getFirstTextNodeFontSize,
  getNextFontSizeIndex,
} from "../../utils";
import { Icon } from "../Icon";
import * as styles from "./styles.css";

type Props = {
  editor: LexicalEditor;
  sizes: string[];
  defaultSize: string;
};

export const Button = ({ editor, sizes, defaultSize }: Props) => {
  const [currentSize, setCurrentSize] = useState<string>(defaultSize);

  const currentSizeIndex = useMemo(
    () => sizes.indexOf(currentSize),
    [currentSize, sizes],
  );

  const isAtMinSize = useMemo(() => currentSizeIndex === 0, [currentSizeIndex]);

  const isAtMaxSize = useMemo(
    () => currentSizeIndex === sizes.length - 1,
    [currentSizeIndex, sizes],
  );

  useEffect(() => {
    const updateCurrentSize = () => {
      const selection = $getSelection();

      if ($isRangeSelection(selection)) {
        const nodes = selection.getNodes();
        const selectionStyle = selection.style;
        const fontSize = getFirstTextNodeFontSize(
          nodes,
          defaultSize,
          selectionStyle,
        );
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
  }, [editor, sizes, defaultSize]);

  const changeFontSize = useCallback(
    (delta: number) => {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          const nodes = selection.extract();
          const currentFontSize = getFirstTextNodeFontSize(
            nodes,
            sizes,
            defaultSize,
          );
          const newIndex = getNextFontSizeIndex(currentFontSize, delta, sizes);
          const newSize = sizes[newIndex];

          applyFontSizeToNodes(nodes, newSize, sizes);
        }
      });
    },
    [editor, sizes, defaultSize],
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
