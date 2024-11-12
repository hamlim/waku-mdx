import { Link } from "waku";

import fsPromises from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Container } from "../components/ui/container";
import { Heading } from "../components/ui/heading";
import { useMDXComponents } from "../mdx-components";
import { transformMDX } from "../transform-mdx";

export default async function BlogPage({ slug }: { slug: string }) {
  try {
    let content = await fsPromises.readFile(
      path.join(
        path.dirname(fileURLToPath(import.meta.url)),
        "../private",
        `${slug}.mdx`,
      ),
      "utf8",
    );
    const { Component, frontmatter } = await transformMDX<{
      title: string;
      publishDate: string;
      tags: string[];
    }>({
      content,
      useMDXComponents,
    });

    return (
      <main>
        <Container>
          <Heading level={1}>{frontmatter.title}</Heading>
          <Component />
          <hr />
          <p>
            Published on{" "}
            {new Date(frontmatter.publishDate).toLocaleDateString()}
          </p>
          <ul>
            {frontmatter.tags.map((tag: string) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          <Link to="/">Back to home</Link>
        </Container>
      </main>
    );
  } catch (error) {
    console.error(error);
    return <div>Error: {(error as Error).message}</div>;
  }
}

export const getConfig = async () => {
  return {
    render: "dynamic",
  } as const;
};
