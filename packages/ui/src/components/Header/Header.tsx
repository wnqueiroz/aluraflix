import Image from "next/image";

import * as s from "./Header.styles";

export type HeaderProps = {};

export const Header = ({}: HeaderProps) => {
  return (
    <s.Wrapper>
      <s.Navbar>
        <s.NavbarList>
          <s.NavbarItem>
            <s.Logo>
              <Image
                alt="Aluraflix logo"
                src={"/logo.png"}
                width={125}
                height={30}
                layout={"fixed"}
              />
            </s.Logo>
          </s.NavbarItem>
          <s.NavbarItem>Início</s.NavbarItem>
          <s.NavbarItem>Filmes</s.NavbarItem>
        </s.NavbarList>
      </s.Navbar>
    </s.Wrapper>
  );
};
