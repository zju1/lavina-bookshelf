import { useAppSelector } from "../app/store/store.config";

export interface User {
  id: number;
  name: string;
  email: string;
  key: string;
  secret: string;
}

export function useAuth() {
  const user = useAppSelector((store) => store.auth.user);
  return user;
}
