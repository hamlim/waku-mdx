import { Code } from "bright";
import { Heading } from "./components/ui/heading";

export function useMDXComponents() {
  return {
    pre: Code,
    h1: (props: React.ComponentPropsWithoutRef<"h1">) => (
      <Heading level={1} {...props} />
    ),
    h2: (props: React.ComponentPropsWithoutRef<"h2">) => (
      <Heading level={2} {...props} />
    ),
    h3: (props: React.ComponentPropsWithoutRef<"h3">) => (
      <Heading level={3} {...props} />
    ),
    h4: (props: React.ComponentPropsWithoutRef<"h4">) => (
      <Heading level={4} {...props} />
    ),
  };
}
