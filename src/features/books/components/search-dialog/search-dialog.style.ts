import { Dialog, styled } from "@mui/material";

export const SDWrapper = styled(Dialog)(() => ({
  ".MuiDialog-scrollPaper": {
    alignItems: "flex-start",
  },
  ".MuiInputBase-root .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
}));

export const CoverLoader = styled("div")(() => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(255,255,255,0.7)",
}));
