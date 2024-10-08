import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  ListItem,
  ListItemText,
  Radio,
  RadioGroup,
  Stack,
  useTheme,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { AddedBook } from "../../dto/book.dto";
import { useSearchParams } from "react-router-dom";
import { useCallback, useState } from "react";
import {
  useDeleteBookMutation,
  useUpdateBookMutation,
} from "../../../../app/store/services/api.service";
import { useConfirm } from "material-ui-confirm";
import { toast } from "sonner";

export function EditBookDialog({ currentBook }: { currentBook: AddedBook }) {
  const [update, { isLoading: updateLoading }] = useUpdateBookMutation();
  const [remove, { isLoading: deleteLoading }] = useDeleteBookMutation();
  const [status, setStatus] = useState(currentBook.status);
  const [params, setParams] = useSearchParams();
  const isOpen = params.get("mutate") === "open";
  const [imageError, setImageError] = useState(false);
  const theme = useTheme();
  const isLoading = updateLoading || deleteLoading;
  const confirm = useConfirm();
  const handleClose = useCallback(() => {
    params.delete("mutate");
    setParams(params);
  }, [params, setParams]);

  const handleSubmit = useCallback(async () => {
    await update({
      body: { status },
      id: currentBook.book.id.toString(),
    }).unwrap();
    toast.success("Status updated!");
    handleClose();
  }, [currentBook.book.id, handleClose, status, update]);

  const handleDelete = useCallback(async () => {
    confirm({
      title: "Are you sure?",
      description: "You can't restore the book after deleting!",
    }).then(async () => {
      await remove(currentBook.book.id.toString()).unwrap();
      toast.success("The book has deleted");
      handleClose();
    });
  }, [confirm, currentBook.book.id, handleClose, remove]);

  return (
    <Dialog
      onClose={handleClose}
      open={isOpen}
      sx={{
        [theme.breakpoints.down("md")]: {
          ".MuiDialog-container ": { alignItems: "flex-end" },
        },
      }}
      PaperProps={{
        sx: {
          width: "450px",
          padding: 0,
          [theme.breakpoints.down("md")]: {
            margin: 0,
            borderRadius: "20px 20px 0 0",
          },
        },
      }}
    >
      <DialogContent>
        <Stack divider={<Divider />} gap="12px">
          <ListItem
            disableGutters
            secondaryAction={
              <IconButton disabled={deleteLoading} onClick={handleDelete}>
                {deleteLoading ? (
                  <CircularProgress size={18} color="inherit" />
                ) : (
                  <Delete />
                )}
              </IconButton>
            }
          >
            <ListItemText
              primary={currentBook.book.title}
              secondary={currentBook.book.author}
            />
          </ListItem>
          <img
            style={{
              width: "100%",
              height: "450px",
              objectFit: "fill",
              borderRadius: "16px",
              border: `1px solid ${theme.palette.divider}`,
            }}
            src={imageError ? "/placeholder.png" : currentBook.book.cover}
            onError={() => setImageError(true)}
            alt={currentBook.book.title}
          />

          <Stack>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Status</FormLabel>
              <RadioGroup
                value={status}
                onChange={(_event, value) => {
                  setStatus(parseInt(value));
                }}
              >
                <FormControlLabel value={0} control={<Radio />} label="New" />
                <FormControlLabel
                  value={1}
                  control={<Radio />}
                  label="Reading"
                />
                <FormControlLabel
                  value={2}
                  control={<Radio />}
                  label="Finished"
                />
              </RadioGroup>
            </FormControl>
          </Stack>
          <Stack gap={1} display="grid" gridTemplateColumns="1fr 1fr">
            <Button
              sx={{ height: 40 }}
              disabled={isLoading}
              onClick={handleClose}
              variant="light"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={handleSubmit}
              sx={{ height: 40 }}
              size="medium"
              disabled={status === currentBook.status || isLoading}
              variant="contained"
            >
              Save
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
