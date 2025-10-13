import type { FC } from "react";

const icons = {
  plus: (
    <>
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </>
  ),
  minus: (
    <>
      <path d="M5 12h14" />
    </>
  ),
} as const;

type Props = {
  name: keyof typeof icons;
  size?: number;
};

export const Icon: FC<Props> = ({ name, size = "24" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    {icons[name]}
  </svg>
);
