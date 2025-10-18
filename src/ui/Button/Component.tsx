import {
  $getSelection,
  $isRangeSelection,
  $isTextNode,
  SELECTION_CHANGE_COMMAND,
  COMMAND_PRIORITY_LOW,
} from "@payloadcms/richtext-lexical/lexical";
import { useLexicalComposerContext } from "@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext";
import { useEffect, useState } from "react";

import * as styles from "./styles.css";
import { Icon } from "../Icon";

const sizes = [
  "40px",
  "32px",
  "24px",
  "18px",
  "16px",
  "14px",
  "14px",
  "12px",
  "12px",
];

export const Button = () => {
  const [editor] = useLexicalComposerContext();
  const [currentSize, setCurrentSize] = useState<string>("16px");

  useEffect(() => {
    const updateCurrentSize = () => {
      const selection = $getSelection();

      if ($isRangeSelection(selection)) {
        const nodes = selection.extract();

        // Получаем размер шрифта первого текстового узла в выделении
        for (const node of nodes) {
          if ($isTextNode(node)) {
            const style = node.getStyle();
            const match = style.match(/font-size:\s*([^;]+)/);
            if (match) {
              setCurrentSize(match[1].trim());
            } else {
              setCurrentSize("16px");
            }
            break;
          }
        }
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

  const applyFontSize = (fontSize: string) => {
    editor.update(() => {
      const selection = $getSelection();

      if ($isRangeSelection(selection)) {
        const nodes = selection.extract();

        nodes.forEach((node) => {
          if ($isTextNode(node)) {
            const currentStyle = node.getStyle();
            const styleWithoutFontSize = currentStyle.replace(
              /font-size:\s*[^;]+;?/g,
              "",
            );
            const newStyle = styleWithoutFontSize
              ? `${styleWithoutFontSize.trim()}; font-size: ${fontSize}`
              : `font-size: ${fontSize}`;
            node.setStyle(newStyle);
          }
        });
      }
    });
  };

  const changeFontSize = (delta: number) => {
    const currentIndex = sizes.indexOf(currentSize);

    const startIndex =
      currentIndex === -1 ? sizes.indexOf("16px") : currentIndex;

    const newIndex = Math.max(
      0,
      Math.min(sizes.length - 1, startIndex - delta),
    );
    const newSize = sizes[newIndex];

    setCurrentSize(newSize);
    applyFontSize(newSize);
  };

  return (
    <div className={styles.container}>
      <button
        type="button"
        className={styles.btn}
        onClick={() => changeFontSize(-1)}
        disabled={sizes.indexOf(currentSize) === sizes.length - 1}
      >
        <Icon name="minus" size={16} />
      </button>
      <input value={currentSize} className={styles.input} disabled />
      <button
        type="button"
        className={styles.btn}
        onClick={() => changeFontSize(1)}
        disabled={sizes.indexOf(currentSize) === 0}
      >
        <Icon name="plus" size={16} />
      </button>
    </div>
  );
};
