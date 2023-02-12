import type * as Stitches from '@stitches/react'
import { createStitches } from '@stitches/react'

export const {
  config,
  createTheme,
  css,
  getCssText,
  globalCss,
  styled,
  theme,
} = createStitches({
  theme: {
    colors: {
      background: '#101010',
      white: 'white',
      gray: "#aaa",
      grayOne: '#181818',
      grayText: '#383838',
    },
    fonts: {
      system: 'system-ui',
    },
  },
  // utils: {
  //   marginX: (value: Stitches.PropertyValue<'margin'>) => ({
  //     marginLeft: value,
  //     marginRight: value,
  //   }),
  //   marginY: (value: Stitches.PropertyValue<'margin'>) => ({
  //     marginTop: value,
  //     marginBottom: value,
  //   }),
  //   paddingX: (value: Stitches.PropertyValue<'padding'>) => ({
  //     paddingLeft: value,
  //     paddingRight: value,
  //   }),
  //   paddingY: (value: Stitches.PropertyValue<'padding'>) => ({
  //     paddingTop: value,
  //     paddingBottom: value,
  //   }),
  // },
  media: {
    mobileUp: '(min-width: 640px)',
    tabletUp: '(min-width: 900px)',
  },
})



export const globalStyles = globalCss({
  "#nprogress .bar": {
    background: "#fff !important",
    height: "1px !important",
  },
  "#nprogress .spinner": {
    display: "none !important"
  },
  "*": {
    boxSizing: "border-box",
    margin: 0,
  },
  "html, body": {
    height: "100%",
  },
  body: {
    fontFamily: "OutfitVariable, sans-serif;",
    fontWeight: 600,
    lineHeight: 1.5,
    "-webkit-font-smoothing": "antialiased",
    backgroundColor: "#101010",
    color: "#aaa",
  },
  "img, picture, video, canvas, svg": {
    display: "block",
    maxWidth: "100%",
  },
  "input, button, textarea, select": {
    font: "inherit",
  },
  "p, h1, h2, h3, h4, h5, h6": {
    overflowWrap: "break-word",
  },
  "#root, #__next": {
    isolation: "isolate",
  },
});