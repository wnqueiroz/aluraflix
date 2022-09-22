import { styled } from "../../styles/stitches.config";

export const Wrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$xl",
});

export const MoviesList = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$xl",
});

export const SelectedMovieSection = styled("div", {
  display: "flex",
  alignItems: "center",
});

export const SelectedMovieDetails = styled("div", {
  display: "flex",
  width: "100%",
  height: 170,
});

export const SelectedMovieCoverWrapper = styled("div", {
  position: "relative",
  display: "inline-block",
  zIndex: "$behind",
  "&:after": {
    display: "inline-block",
    position: "absolute",
    content: "",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    background:
      "linear-gradient(270deg, rgb(22 22 22) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(90deg, rgb(22 22 22) 0%, rgba(0, 0, 0, 0) 45.31%), linear-gradient(0deg, rgb(22 22 22) 0%, rgba(0, 0, 0, 0) 50.52%);",
  },
});

export const SelectedMovieCover = styled("img", {
  width: "calc(100vw  / 2.2 )",
  display: "block",
});
