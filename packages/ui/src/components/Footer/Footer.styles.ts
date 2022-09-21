import { styled } from "../../styles/stitches.config";

export const Wrapper = styled("footer", {
  display: "flex",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  margin: "60px 0",
});

export const Content = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$xl",
  width: "659px",
  height: "70px",
});

export const Header = styled("div", {
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
});

export const Body = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$sm",
});

export const Text = styled("p", {
  color: "$text-contrast-low",
});

export const SocialLinks = styled("div", {
  display: "flex",
  gap: "$xl",
});

export const SocialLink = styled("i", {
  fontSize: "$xl",
  "&:hover": {
    color: "$primary-09",
    cursor: "pointer",
  },
});
