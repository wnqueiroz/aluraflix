import { globalCss } from "../stitches.config";

const commonHtmlTags = [
  "html",
  "body",
  "div",
  "span",
  "applet",
  "object",
  "iframe",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "p",
  "blockquote",
  "pre",
  "a",
  "abbr",
  "acronym",
  "address",
  "big",
  "cite",
  "code",
  "del",
  "dfn",
  "em",
  "img",
  "ins",
  "kbd",
  "q",
  "s",
  "samp",
  "small",
  "strike",
  "strong",
  "sub",
  "sup",
  "tt",
  "var",
  "b",
  "u",
  "i",
  "center",
  "dl",
  "dt",
  "dd",
  "ol",
  "ul",
  "li",
  "fieldset",
  "form",
  "label",
  "legend",
  "table",
  "caption",
  "tbody",
  "tfoot",
  "thead",
  "tr",
  "th",
  "td",
  "article",
  "aside",
  "canvas",
  "details",
  "embed",
  "figure",
  "figcaption",
  "footer",
  "header",
  "hgroup",
  "menu",
  "nav",
  "output",
  "ruby",
  "section",
  "summary",
  "time",
  "mark",
  "audio",
  "video",
];

export const globalStyles = globalCss({
  [commonHtmlTags.join(",")]: {
    margin: 0,
    padding: 0,
    border: 0,
    verticalAlign: "baseline",
  },
  "html, body, #__next": {
    height: "100%",
  },
  body: {
    fontFamily: "$body",
    backgroundColor: "$secondary-01",
    "&::-webkit-scrollbar": {
      backgroundColor: "transparent",
      width: 8,
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "$secondary-09",
      borderRadius: "$xs",
    },
  },
  "*": {
    boxSizing: "border-box",
    margin: 0,
    padding: 0,
    WebkitFontSmoothing: "antialiased",
  },
});
