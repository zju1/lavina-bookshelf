/* eslint-disable @typescript-eslint/no-explicit-any */
import { alpha, createTheme } from "@mui/material";

export const appTheme = createTheme({
  palette: {
    background: {
      paper: "#ffffff",
      default: "#eeeeee",
    },
    primary: {
      main: "#98BA5B",
      light: "#f0f5e9",
      contrastText: "#fff",
    },
  },
  shape: {
    borderRadius: 15,
  },
  transitions: {
    duration: {
      shorter: 100,
    },
  },
  typography: {
    allVariants: {
      fontFamily: `"Geologica Variable", sans-serif`,
    },
    h1: {
      fontSize: 32,
      fontWeight: "700",
    },
    h4: {
      fontSize: 18,
      fontWeight: "550",
    },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiIconButton: {
      defaultProps: { disableRipple: true },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          transition: ".2s",
          fontWeight: "600",
          paddingLeft: 20,
          paddingRight: 20,
          textTransform: "none",
          "&:hover": {
            boxShadow: "none",
          },
          "&:active": {
            filter: "brightness(120%)",
          },
        },
        sizeLarge: {
          height: 50,
        },
      },
      defaultProps: {
        disableRipple: true,
      },
      variants: [
        {
          props: { variant: "light", color: "primary" },
          style: ({ theme }) => ({
            background: theme.palette.primary.light,
            color: theme.palette.primary.main,
            "&:hover": {
              boxShadow: "none",
              background: alpha(theme.palette.primary.main, 0.1),
              filter: "brightness(95%)",
            },
            "&:active": {
              filter: "brightness(105%)",
            },
          }),
        },
        {
          props: { ["data-variant" as any]: "light", color: "error" },
          style: ({ theme }) => ({
            background: alpha(theme.palette.error.light, 0.2),
            color: theme.palette.error.main,
            "&:hover": {
              boxShadow: "none",
              background: alpha(theme.palette.error.light, 0.2),
              filter: "brightness(95%)",
            },
            "&:active": {
              filter: "brightness(105%)",
            },
          }),
        },
      ],
    },
    MuiTextField: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          "& .MuiFilledInput-root": {
            border: `1px solid ${
              ownerState.error ? theme.palette.error.main : "#e2e2e2"
            } `,
            borderRadius: theme.shape.borderRadius,
            height: 50,
            overflow: "hidden",
            fontWeight: "600",
            color: ownerState.error ? theme.palette.error.main : "#000000",
            background:
              theme.palette.mode === "light"
                ? "linear-gradient(to bottom, #f7f7f7, #e2e2e2)"
                : "#2b2b2b",
            "&:hover": {
              background:
                theme.palette.mode === "light"
                  ? "linear-gradient(to bottom, #f7f7f7, #e2e2e2)"
                  : "#2b2b2b",
              borderColor: "#ccc",
            },
            "&.Mui-focused": {
              background:
                theme.palette.mode === "light"
                  ? "linear-gradient(to bottom, #f7f7f7, #e2e2e2)"
                  : "#2b2b2b",
              borderColor: "#aaa",
            },
          },
          label: {
            fontWeight: "500",
            transform: "translate(12px, 14px)",
            "&.MuiInputLabel-shrink": {
              transform: "translate(12px, 7px) scale(0.75)",
            },
          },
        }),
      },
      defaultProps: {
        InputProps: {
          disableUnderline: true,
        },
        variant: "filled",
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          padding: 0,
          marginRight: 8,
          borderRadius: 15,
        },
      },
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          fontWeight: "600",
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontWeight: "500",
        },
      },
    },
  },
});
