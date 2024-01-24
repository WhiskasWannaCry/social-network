export const darkTheme = {
  title: "dark",
  //Background
  mainBg : "#141414",
  mainBlockBg: "#222222",
  btnBg: "rgba(255, 255, 255, 0.1)",
  greenBtnBg : "rgb(33 255 0 / 25%)",
  secondaryBlockBg: "rgb(41, 41, 41);",
  //Text
  mainTextColor: "#E1E3E6",
  btnTextColor: "#E1E3E6",
  //Border
  mainBlockBorder: "1px solid rgb(54, 55, 56)",
  userImgBorder: "4px solid #222",
  secondaryBlockBorder: "rgb(54, 55, 56) 0px 0px 0px 1px inset",
  //Hover
  hoverBtnBg: "rgba(255, 255, 255, 0.2)",
  //Scroll
  scrollBtn: "#292929"
}
export const lightTheme = {
  title: "light",
  //Background
  mainBg : "#dce1e6",
  mainBlockBg: "#ffffff",
  secondaryBlockBg: "rgb(41, 41, 41);",
  btnBg: "rgb(42 88 133 / 13%)",
  //Text
  mainTextColor: "#222222",
  btnTextColor: "#447bba",
  //Border
  mainBlockBorder: "1px solid rgb(204 204 204)",  
  secondaryBlockBorder: "rgb(54, 55, 56) 0px 0px 0px 1px inset",
  userImgBorder: "4px solid rgb(204 204 204)",
  //Hover
  hoverBtnBg:"rgba(0, 0, 0, 0.2)",
  //Scroll
  scrollBtn: "rgb(162 162 162)"
}

export const invertTheme = (theme,setTheme) => {
  return theme.mainBg === "#dce1e6"
    ? setTheme(darkTheme)
    : setTheme(lightTheme);
};
