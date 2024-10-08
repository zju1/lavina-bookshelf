import { envVars } from "../../constants/envVars";
import { AuthDTO } from "../../features/auth/dto/auth.dto";

export const generateKey = (data: AuthDTO) => {
  const key = `${envVars.USER_KEY}/${data.name
    .replace(" ", "")
    .toLowerCase()}/${data.email.replace(" ", "").toLowerCase()}`;
  return key;
};
