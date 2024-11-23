import type { ComponentPropsWithoutRef } from "react";

export function Heading({
  level,
  ...props
}: ComponentPropsWithoutRef<"h1"> & { level: 1 | 2 | 3 | 4 | 5 | 6 }) {
  let Tag = `h${level}` as keyof JSX.IntrinsicElements;

  // @ts-expect-error - TODO: fix this
  return <Tag {...props} />;
}
