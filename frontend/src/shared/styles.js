import { createTheme } from "@mui/material";
// const theme = {
//   title: "dark",
//   //Background
//   mainBg: "#141414",
//   mainBlockBg: "#222222",
//   grayBlockBg: "rgba(255, 255, 255, 0.1)",
//   btnBg: "rgba(255, 255, 255, 0.1)",
//   greenBtnBg: "rgb(33 255 0 / 25%)",
//   lightBtnBg: "rgb(232 232 232)",
//   secondaryBlockBg: "rgb(41, 41, 41);",
//   //Text
//   mainTextColor: "#E1E3E6",
//   btnTextColor: "#E1E3E6",
//   btnDarkTextColor: "#222222",
//   //Border
//   mainBlockBorder: "1px solid rgb(54, 55, 56)",
//   userImgBorder: "4px solid #222",
//   secondaryBlockBorder: "rgb(54, 55, 56) 0px 0px 0px 1px inset",
//   //Hover
//   hoverBtnBg: "rgba(255, 255, 255, 0.2)",
//   hoverLightBtnBg: "rgb(232 232 232 / 77%)",
//   //Scroll
//   scrollBtn: "#292929",
// };
export const theme = createTheme({
  // Палитра цветов, пока использовать только primary, поскольку для secondary не определены нужные цвета
  palette: {
    primary: {
      main: "#F1F1F1",
      green: {
        1: "rgb(33 255 0 / 25%)",
      },
      grey: {
        1: "#E1E3E6",
        2: "rgb(232 232 232 / 77%)",
        3: "rgba(255, 255, 255, 0.2)",
        4: "#292929",
        5: "#222222",
        6: "#141414",
      },
      black: {
        1: "#262629",
        2: "#111112",
      },
      white: {
        1: "#F1F1F1",
      },
    },
  },
});
