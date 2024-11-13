// import { MDXCode } from "kanapa";
import { Children } from "react";
import { Checkbox } from "./components/ui/checkbox";
import { Heading } from "./components/ui/heading";
import { Link } from "./components/ui/link";
import { MDXCode } from "./kanapa";

export function useMDXComponents() {
  return {
    pre: MDXCode,
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
    // code: (props: React.ComponentPropsWithoutRef<"kbd">) => (
    //   <Keyboard {...props} keys={props.children} />
    // ),
    a: Link,
    li: (props: React.ComponentPropsWithoutRef<"li">) => {
      switch (props.className) {
        case "task-list-item": {
          let children = Children.toArray(props.children);
          let [checkbox, ...rest] = children;
          let { checked, indeterminate, ...checkboxProps } =
            // @ts-expect-error - TODO: fix this
            checkbox?.props ?? {};
          return (
            <li className="list-disc flex items-center gap-2" {...props}>
              <Checkbox
                {...checkboxProps}
                isDisabled
                isIndeterminate={indeterminate}
                isSelected={checked}
              >
                <div>{rest}</div>
              </Checkbox>
            </li>
          );
        }
        default:
          return <li {...props} />;
      }
    },
    input: (props: React.ComponentPropsWithoutRef<"input">) => {
      switch (props.type) {
        case "checkbox":
          // @ts-expect-error - TODO: fix this
          return <Checkbox {...props} />;
        default:
          return <input {...props} />;
      }
    },
  };
}
