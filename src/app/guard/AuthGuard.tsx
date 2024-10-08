import { PropsWithChildren, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { useAppDispatch } from "../store/store.config";
import { useGetMeQuery } from "../store/services/api.service";
import { setUser } from "../store/slices/auth.slice";

export function AuthGuard(props: PropsWithChildren) {
  const user = useAuth();
  const dispatch = useAppDispatch();
  const { data: me } = useGetMeQuery(undefined, { skip: !user });

  useEffect(() => {
    if (me && me.isOk && me.data) {
      dispatch(setUser(me.data));
    }
  }, [dispatch, me]);

  return user ? props.children : <Navigate to="/auth" />;
}
