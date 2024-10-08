/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Stack } from "@mui/material";
import { AuthWrapper } from "./styles/auth.style";
import { FormField } from "../../lib/shared/FormField";
import { useSignupMutation } from "../../app/store/services/auth.service";
import { useForm } from "react-hook-form";
import { AuthDTO } from "./dto/auth.dto";
import { useAppDispatch } from "../../app/store/store.config";
import { envVars } from "../../constants/envVars";
import { setUser } from "../../app/store/slices/auth.slice";
import { toast } from "sonner";
import { generateKey } from "../../lib/utils/generateKey";
import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";

const defaultValues: Partial<AuthDTO> = {
  name: "",
  email: "",
};

export function AuthPage() {
  const [signup, { isLoading }] = useSignupMutation();
  const { control, handleSubmit } = useForm<AuthDTO>({ defaultValues });
  const dispatch = useAppDispatch();
  const user = useAuth();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const body = {
        ...data,
        key: generateKey(data),
        secret: envVars.USER_SECRET,
      };
      const response = await signup(body as AuthDTO).unwrap();
      dispatch(setUser(response.data));
    } catch (error: any) {
      toast.error(error?.data?.message || error.message || "Unknown error!");
    }
  });

  return user ? (
    <Navigate to="/" />
  ) : (
    <AuthWrapper>
      <div className="content">
        <img src="/logo.png" alt="" />
        <Stack gap="24px" component="form" onSubmit={onSubmit} className="form">
          <Stack className="header">
            <h1>Welcome to your bookshelf!</h1>
            <p>Please enter your details below to continue</p>
          </Stack>
          <Stack gap="12px">
            <FormField
              disabled={isLoading}
              control={control}
              name="name"
              rules={{
                required: {
                  value: true,
                  message: "This is required field",
                },
              }}
              label="Full name"
            />
            <FormField
              disabled={isLoading}
              control={control}
              name="email"
              rules={{
                required: {
                  value: true,
                  message: "This is required field",
                },
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/gi,
                  message: "Email must be a valid email address",
                },
              }}
              label="Email"
            />
          </Stack>
          <Button
            disabled={isLoading}
            type="submit"
            variant="contained"
            size="large"
          >
            Sign Up
          </Button>
          <div className="tos">
            <p>
              By clicking on Sign up, you agree to <span>Terms of Service</span>{" "}
              and <span>Privacy Policy</span>
            </p>
          </div>
        </Stack>
      </div>
    </AuthWrapper>
  );
}
