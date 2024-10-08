import { styled } from "@mui/material";

export const BCWrapper = styled("div")(({ theme }) => ({
  background: theme.palette.primary.light,
  borderRadius: "16px",
  position: "relative",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  border: `1px solid ${theme.palette.divider}`,
  alignItems: "flex-start",
  cursor: "pointer",
  img: {
    width: "100%",
    height: "280px",
    objectFit: "fill",
    [theme.breakpoints.down("md")]: {
      height: "150px",
    },
  },
  div: {
    padding: "12px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "5px",
    h3: {
      font: "700 14px 'Geologica Variable', sans-serif",
    },
    p: {
      font: "300 11px 'Geologica Variable', sans-serif",
    },
  },
  span: {
    position: "absolute",
    top: 6,
    left: 6,
    borderRadius: "12px",
    padding: "2px 8px",
    font: "400 14px 'Geologica Variable', sans-serif",
    color: "white",
  },
}));

export const ESWrapper = styled("div")(() => ({
  flexDirection: "column",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "400px",
  gap: "12px",
  img: {
    width: "300px",
  },
  p: {
    textAlign: "center",
    maxWidth: "500px",
    font: "500 14px 'Geologica Variable', sans-serif",
    color: "#777",
  },
}));
