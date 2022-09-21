export type FooterProps = {};

import Image from "next/image";
import * as s from "./Footer.styles";

export const Footer = ({}: FooterProps) => {
  return (
    <s.Wrapper>
      <s.Content>
        <s.Header>
          <Image
            alt="Alura logo"
            src={"/alura-logo.png"}
            width={52}
            height={24}
            layout={"fixed"}
          />
          <s.SocialLinks>
            <s.SocialLink
              onClick={() => {
                window?.open("https://github.com/wnqueiroz", "_blank");
              }}
              className="bx bxl-github"
            ></s.SocialLink>
            <s.SocialLink
              onClick={() => {
                window?.open("https://twitter.com/wnqueiroz", "_blank");
              }}
              className="bx bxl-twitter"
            ></s.SocialLink>
            <s.SocialLink
              onClick={() => {
                window?.open(
                  "https://linkedin.com/in/william-queiroz",
                  "_blank"
                );
              }}
              className="bx bxl-linkedin"
            ></s.SocialLink>
          </s.SocialLinks>
        </s.Header>
        <s.Body>
          <s.Text>AOVS Sistemas de Informática S.A</s.Text>
          <s.Text>CNPJ 05.555.382/0001-33</s.Text>
        </s.Body>
      </s.Content>
    </s.Wrapper>
  );
};
