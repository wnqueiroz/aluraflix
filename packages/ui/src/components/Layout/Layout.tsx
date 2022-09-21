import Image from "next/image";

import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";

export type LayoutProps = {
  children?: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <Image
        src={"/blur.png"}
        width="1080px"
        height="1080px"
        layout={"fixed"}
      />
    </>
  );
};
