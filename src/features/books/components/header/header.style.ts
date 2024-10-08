import { styled } from "@mui/material";
import { ButtonBase } from "@mui/material";

export const HeaderWrapper = styled("header")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr auto auto",
  gap: "12px",
  padding: "12px 0",
  h3: {
    font: "800 24px 'Geologica Variable', sans-serif",
    color: "#98BA5B",
  },
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr auto",
    ".addButton": {
      position: "fixed",
      bottom: 12,
      left: 12,
      right: 12,
      height: "60px",
    },
  },
}));

export const SearchWrapper = styled(ButtonBase)(() => ({
  padding: "18px",
  background: "#eee",
  borderRadius: "12px",
  font: "500 16px 'Geologica Variable', sans-serif",
  color: "#777",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  justifyContent: "flex-start",
}));
