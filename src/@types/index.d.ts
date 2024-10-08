export type BaseAPI<T = unknown> = {
  data: T;
  isOk: boolean;
  message: string;
};

declare module "@mui/material/Button" {
  declare interface ButtonPropsVariantOverrides {
    light: true;
  }
}

export type RequestMethods = "GET" | "POST" | "DELETE" | "PATCH" | "PUT";
