import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";

import * as s from "./Layout.styles";

export type LayoutProps = {
  children?: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <s.Wrapper>
      <Header />
      <s.Main>{children}</s.Main>
      <Footer />
    </s.Wrapper>
  );
};
