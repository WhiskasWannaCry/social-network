import { Box, CircularProgress } from "@mui/material";

export const PageLoader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <CircularProgress size={100}></CircularProgress>
    </Box>
  );
};
