import { Link } from "waku";

import fsPromises from "node:fs/promises";
// import path from "node:path";
// import { fileURLToPath } from "node:url";
// import { getContextData } from "waku/middleware/context";
// import { Heading } from "../../components/ui/heading";
import { Heading } from "../../components/heading";
import { useMDXComponents } from "../../mdx-components";
import { transformMDX } from "../../transform-mdx";

let formatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "long",
  timeStyle: "short",
  timeZone: "America/New_York",
}).format;

export default async function BlogPage({ slug }: { slug: string }) {
  let content = await fsPromises.readFile(`./public/blog/${slug}.mdx`, "utf8");

  const { Component, frontmatter } = await transformMDX<{
    title: string;
    publishDate: string;
    tags: string[];
  }>({
    content,
    // @ts-expect-error - TODO: fix this
    useMDXComponents,
  });

  return (
    <main>
      <Heading level={1}>{frontmatter.title}</Heading>
      <hr className="my-4" />
      <div className="text-slate-500">
        <p>Published on {formatter(new Date(frontmatter.publishDate))}</p>
        <p>Tags:</p>
        <ul className="flex flex-wrap gap-2 mx-4">
          {frontmatter.tags.map((tag: string, idx, arr) => (
            <li key={tag}>
              {tag}
              {idx < arr.length - 1 ? "," : ""}
            </li>
          ))}
        </ul>
      </div>
      <hr className="my-4" />
      <Component />
      <hr className="my-4" />
      <Link to="/">Back to home</Link>
    </main>
  );
}

export const getConfig = async () => {
  return {
    render: "dynamic",
  } as const;
};
