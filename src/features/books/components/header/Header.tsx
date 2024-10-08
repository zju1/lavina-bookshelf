import { Button } from "@mui/material";
import { HeaderWrapper, SearchWrapper } from "./header.style";
import { Add, Logout, Search } from "@mui/icons-material";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../../../app/store/store.config";
import { signOut } from "../../../../app/store/slices/auth.slice";
import { useConfirm } from "material-ui-confirm";

export function Header() {
  const [params, setParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const confirm = useConfirm();

  const logout = () => {
    confirm({
      title: "Are you sure?",
      description: "You are going to sign out of your account.",
    }).then(() => {
      dispatch(signOut());
    });
  };

  const handleOpen = (dialogType: "create" | "search") => {
    params.set(dialogType, "open");
    setParams(params);
  };

  return (
    <HeaderWrapper>
      <SearchWrapper onClick={() => handleOpen("search")}>
        <Search />
        <span>Search...</span>
      </SearchWrapper>
      <Button
        startIcon={<Add />}
        onClick={() => handleOpen("create")}
        variant="contained"
        className="addButton"
      >
        Add a book
      </Button>
      <Button onClick={logout} variant="light" color="primary">
        <Logout />
      </Button>
    </HeaderWrapper>
  );
}
