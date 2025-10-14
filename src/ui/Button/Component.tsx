import {
  $getSelection,
  $isRangeSelection,
  $isTextNode,
} from "@payloadcms/richtext-lexical/lexical";
import { useLexicalComposerContext } from "@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext";
import { useState, type ChangeEventHandler } from "react";

import * as styles from "./styles.css";
import { Icon } from "../Icon";

export const Button = () => {
  const [editor] = useLexicalComposerContext();
  const [size, setSize] = useState<string>("16");

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;

    editor.update(() => {
      const selection = $getSelection();

      if ($isRangeSelection(selection)) {
        const nodes = selection.extract();

        nodes.forEach((node) => {
          if ($isTextNode(node)) {
            node.setStyle(`font-size: ${value}px`);
          }
        });
      }
    });

    setSize(value);
  };

  return (
    <div className={styles.container}>
      <button type="button" className={styles.btn}>
        <Icon name="minus" size={18} />
      </button>
      <input
        value={size}
        onChange={handleChange}
        className={styles.input}
        disabled
      />
      <button type="button" className={styles.btn}>
        <Icon name="plus" size={18} />
      </button>
    </div>
  );
};
