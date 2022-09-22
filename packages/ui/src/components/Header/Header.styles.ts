import { styled } from "../../styles/stitches.config";

export const Wrapper = styled("div", {
  display: "flex",
  position: "fixed",
  width: "100%",
  background: "$secondary-01",
  borderBottom: "1px solid",
  borderColor: "$primary-09",
  height: "60px",
  padding: "0 50px",
  alignItems: "center",
  justifyContent: "space-between",
  zIndex: "$always-on-top"
});

export const Navbar = styled("nav", {});

export const NavbarList = styled("ul", {
  display: "flex",
  listStyle: "none",
  gap: "$xx",
  alignItems: "center",
});

export const NavbarItem = styled("li", {
  color: "$text-contrast-low",
  "&:hover": {
    color: "$primary-09",
    cursor: "pointer",
  },
});

export const Logo = styled("div", {
  marginRight: "calc(50px - $xx)",
});
