import type { ReactNode } from "react";

const gutterTemplate = Array.from({ length: 8 });

type GridProps = { children?: ReactNode };

export default function GridLayout({ children }: GridProps) {
  return <>{children}</>;
}
