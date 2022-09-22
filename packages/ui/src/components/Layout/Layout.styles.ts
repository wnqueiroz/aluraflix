import { styled } from "../../styles/stitches.config";

export const Wrapper = styled("div", {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
});

export const Main = styled("main", {
  flex: 1,
  padding: "0 50px",
  marginTop: "61px",
  zIndex: "$base",
});

export const BlurWrapper = styled("div", {
  position: "fixed",
  zIndex: "$root",
});

export const Blur = styled("div", {
  width: "290px",
  height: "900px",
  background: "$primary-09",
  filter: "blur(250px)",
  transform: "rotate(-46.28deg)",
});
