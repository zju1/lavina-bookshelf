/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { FormField } from "../../../../lib/shared/FormField";
import { useCreateBookMutation } from "../../../../app/store/services/api.service";
import { useForm } from "react-hook-form";
import { BookDTO } from "../../dto/book.dto";
import { toast } from "sonner";
import { useSearchParams } from "react-router-dom";
import { useCallback } from "react";

const defaultValues: BookDTO = {
  isbn: "",
};

export function AddBookDialog() {
  const [createBook, { isLoading }] = useCreateBookMutation();
  const [params, setParams] = useSearchParams();
  const isOpen = params.get("create") === "open";

  const { control, handleSubmit, reset } = useForm<BookDTO>({ defaultValues });

  const handleClose = useCallback(() => {
    params.delete("create");
    setParams(params);
    reset(defaultValues);
  }, [params, reset, setParams]);

  const onSubmit = handleSubmit(async (values) => {
    try {
      await createBook(values.isbn).unwrap();
      toast.success("The book successfully added to your bookshelf");
      handleClose();
    } catch (error: any) {
      toast.error(error?.data?.message || error?.message || "Unknown error");
    }
  });

  return (
    <Dialog onClose={handleClose} open={isOpen} fullWidth>
      <DialogTitle>Add a book</DialogTitle>
      <DialogContent>
        <form onSubmit={onSubmit}>
          <Stack spacing={2}>
            <FormField
              autoFocus
              disabled={isLoading}
              control={control}
              name="isbn"
              label="ISBN"
              rules={{
                required: {
                  value: true,
                  message: "ISBN is required field",
                },
              }}
            />
            <Stack flexDirection="row" gap={2} justifyContent="flex-end">
              <Button
                disabled={isLoading}
                onClick={handleClose}
                data-variant="light"
                size="medium"
              >
                Cancel
              </Button>
              <Button
                disabled={isLoading}
                type="submit"
                sx={{ height: 40 }}
                size="medium"
                startIcon={<Add />}
                variant="contained"
              >
                Add
              </Button>
            </Stack>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
}
