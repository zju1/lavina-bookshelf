import { useSearchParams } from "react-router-dom";
import { CoverLoader, SDWrapper } from "./search-dialog.style";
import { useCallback, useState } from "react";
import {
  Avatar,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { Close, Search } from "@mui/icons-material";
import { useDebouncedValue } from "../../../../hooks/useDebouncedValue";
import {
  useCreateBookMutation,
  useSearchBookQuery,
} from "../../../../app/store/services/api.service";
import { Book } from "../../dto/book.dto";
import { toast } from "sonner";

export function SearchDialog() {
  const [search, setSearch] = useState("");
  const [params, setParams] = useSearchParams();
  const isOpen = params.get("search") === "open";
  const [create, { isLoading }] = useCreateBookMutation();
  const key = useDebouncedValue(search, 300);

  const { data: searchResults, isFetching } = useSearchBookQuery(key, {
    skip: key.length < 3,
  });

  const handleClose = useCallback(() => {
    params.delete("search");
    setParams(params);
    setSearch("");
  }, [params, setParams]);

  const handleCreate = useCallback(
    async (item: Book) => {
      await create(item.isbn).unwrap();
      toast.success("The book has successfully added to your bookshelf");
      handleClose();
    },
    [create, handleClose]
  );

  return (
    <SDWrapper
      open={isOpen}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: "600px",
          minHeight: "100px",
          boxShadow: "none",
          display: "grid",
        },
      }}
    >
      <Stack display="grid" gridTemplateRows="auto 1fr auto">
        <Stack position="sticky" top={0} bgcolor="white" zIndex={1}>
          <OutlinedInput
            autoFocus
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search"
            startAdornment={
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton size="small" onClick={handleClose}>
                  <Close />
                </IconButton>
              </InputAdornment>
            }
          />
          <Divider />
        </Stack>
        {isFetching ? (
          <Stack alignItems="center" minHeight={100} justifyContent="center">
            <CircularProgress />
          </Stack>
        ) : searchResults?.data?.length === 0 ? (
          <Stack p="12px" alignItems="center">
            <Typography fontSize={12} color="textDisabled">
              We couldn't find any books 😥
            </Typography>
          </Stack>
        ) : (
          <Stack position="relative">
            <Stack
              position="relative"
              maxHeight="500px"
              sx={{ overflowY: "auto" }}
            >
              {searchResults?.data.map((item, index) => (
                <ListItemButton
                  key={`${item.isbn}_${index}`}
                  onClick={() => handleCreate(item)}
                >
                  <ListItemAvatar>
                    <Avatar src={item.cover}>{item.title[0]}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={item.title} secondary={item.author} />
                </ListItemButton>
              ))}
            </Stack>
            {isLoading && (
              <CoverLoader>
                <CircularProgress />
              </CoverLoader>
            )}
            {searchResults?.data && searchResults.data.length > 0 && (
              <Stack position="sticky" top={0} bgcolor="white" zIndex={1}>
                <Divider />
                <Typography
                  fontSize={12}
                  color="textDisabled"
                  textAlign="center"
                >
                  {searchResults?.data.length} books found
                </Typography>
              </Stack>
            )}
          </Stack>
        )}
      </Stack>
    </SDWrapper>
  );
}
