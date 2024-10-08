import { styled } from "@mui/material";

export const AuthWrapper = styled("div")(({ theme }) => ({
  height: "100dvh",
  background: "url(/bookshelf.jpeg)",
  backgroundSize: "100%",
  display: "grid",
  ".content": {
    background: "rgba(0,0,0,0.8)",
    display: "flex",
    alignItems: "center",
    backdropFilter: "blur(5px)",
    justifyContent: "center",
    flexDirection: "column",
    gap: "24px",
    img: {
      width: "250px",
    },
    ".form": {
      width: "500px",
      background: "white",
      borderRadius: "20px",
      boxShadow: "-2px -5px 30px 3px rgba(0,0,0,0.5) inset",
      padding: "48px",
      [theme.breakpoints.down("md")]: {
        width: "90%",
        padding: "24px",
      },
      ".header": {
        display: "grid",
        gap: "4px",
        h1: {
          font: "600 24px 'Geologica Variable', sans-serif",
          [theme.breakpoints.down("md")]: {
            font: "600 18px 'Geologica Variable', sans-serif",
          },
        },
        p: {
          font: "400 12px 'Geologica Variable', sans-serif",
          [theme.breakpoints.down("md")]: {
            font: "400 10px 'Geologica Variable', sans-serif",
          },
        },
      },
      ".tos": {
        font: "300 14px 'Geologica Variable', sans-serif",
        lineHeight: "18px",
        color: theme.palette.grey[700],
        [theme.breakpoints.down("md")]: {
          font: "400 10px 'Geologica Variable', sans-serif",
        },
        span: {
          color: theme.palette.info.main,
          cursor: "pointer",
          ":hover": {
            textDecoration: "underline",
          },
        },
      },
    },
  },
}));
