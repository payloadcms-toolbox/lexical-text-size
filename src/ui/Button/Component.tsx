import {
  $getSelection,
  $isRangeSelection,
  $isTextNode,
} from "@payloadcms/richtext-lexical/lexical";
import { useLexicalComposerContext } from "@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext";
import type { MouseEventHandler } from "react";
import { Icon } from "../Icon";

export const Button = () => {
  const [editor] = useLexicalComposerContext();

  const handleClick: MouseEventHandler = (e) => {
    editor.update(() => {
      const selection = $getSelection();

      if ($isRangeSelection(selection)) {
        const nodes = selection.extract();

        nodes.forEach((node) => {
          if ($isTextNode(node)) {
            const currentStyle = node.getStyle();

            if (currentStyle.includes("color: red")) {
              node.setStyle("");
            } else {
              node.setStyle("color: red");
            }
          }
        });
      }
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      style={{
        border: "none",
        backgroundColor: "transparent",
      }}
    >
      <Icon />
    </button>
  );
};
