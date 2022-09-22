import { styled } from "../../styles/stitches.config";

export const Wrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
});

export const Cover = styled("img", {
  width: 203,
  height: 304,
  borderRadius: "$md",
  transition: "$fast",
  "&:hover": {
    border: "2px solid $primary-09",
    cursor: "pointer",
  },
});
