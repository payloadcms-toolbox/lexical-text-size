import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  backgroundColor: "#f8f8f9",
  borderRadius: "8px",
});

export const input = style({
  width: "40px",
  height: "32px",
  border: "none",
  outline: "none",
  textAlign: "center",
  backgroundColor: "transparent",
});

export const btn = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "32px",
  height: "32px",
  border: "none",
  backgroundColor: "transparent",
});
