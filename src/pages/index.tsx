import { Link } from "waku";

import { Heading } from "../components/ui/heading";

export default async function HomePage() {
  return (
    <div>
      <Heading level={1}>Waku MDX Demo</Heading>
      <br />
      <Link
        to="/first-blog-post"
        className="mt-4 inline-block underline text-primary"
      >
        First blog post
      </Link>
    </div>
  );
}

export const getConfig = async () => {
  return {
    render: "dynamic",
  } as const;
};
