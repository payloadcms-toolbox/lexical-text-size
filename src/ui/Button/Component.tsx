import {
  $getSelection,
  $isRangeSelection,
  $isTextNode,
} from "@payloadcms/richtext-lexical/lexical";
import { useLexicalComposerContext } from "@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext";
import { useEffect, useState, type ChangeEventHandler } from "react";

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
  const [size, setSize] = useState<number>(1);

  useEffect(() => {
    editor.update(() => {
      const selection = $getSelection();

      if ($isRangeSelection(selection)) {
        const nodes = selection.extract();

        nodes.forEach((node) => {
          if ($isTextNode(node)) {
            node.setStyle(`font-size: ${sizes[size]}`);
          }
        });
      }
    });
  }, [size]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = Number.parseInt(e.target.value, 10);

    setSize(value);
  };

  return (
    <div className={styles.container}>
      <button
        type="button"
        className={styles.btn}
        onClick={() => setSize(size - 1)}
      >
        <Icon name="minus" size={16} />
      </button>
      <input value={sizes[size]} className={styles.input} disabled />
      <button
        type="button"
        className={styles.btn}
        onClick={() => setSize(size + 1)}
      >
        <Icon name="plus" size={16} />
      </button>
    </div>
  );
};
