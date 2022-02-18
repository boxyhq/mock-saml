import type { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};
export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <header className="py-5 px-20">
        <h1 className="text-2xl">Mock SAML IdP</h1>
      </header>
      <main>{children}</main>
    </>
  );
}
