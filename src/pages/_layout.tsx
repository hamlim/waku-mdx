import "../styles.css";

import type { ReactNode } from "react";

import { Footer } from "../components/footer";
import { Header } from "../components/header";

type RootLayoutProps = { children: ReactNode };

export default async function RootLayout({ children }: RootLayoutProps) {
  const data = await getData();

  return (
    <div className="font-['Geist']">
      <meta name="description" content={data.description} />
      <title>{data.title}</title>
      <link rel="icon" type="image/png" href={data.icon} />
      <Header />
      <main className="m-6 flex items-center *:min-h-64 *:min-w-64 lg:m-0 lg:min-h-svh lg:justify-center">
        {children}
      </main>
      <Footer />
    </div>
  );
}

const getData = async () => {
  const data = {
    title: "Waku MDX Demo",
    description: "An internet website!",
    icon: "/images/favicon.png",
  };

  return data;
};

export const getConfig = async () => {
  return {
    render: "dynamic",
  } as const;
};
