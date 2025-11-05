import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { imagesApi } from "@api/public";
import { useSessionStore } from "@store/sessionStore";
import { ApiError } from "@types";

export const useUpdateUserPhoto = () => {
  const store = useSessionStore((state) => state.updateUserFields);
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["userPhoto"],
    mutationFn: (data: FormData) => imagesApi.updateUserPhoto(data),
    onSuccess: (data) => {
      if (data.imageUrl) {
        store({
          userImage: data.imageUrl,
        });

        queryClient.setQueryData(["myProfile"], (old: any) => ({
          ...old,
          ...data,
        }));
        toast.success("You successfully updated your profile photo!");
      } else {
        toast.error("Image upload succeeded, but no image URL returned.");
      }
    },
    onError: (error: ApiError) => {
      if (error.errors) {
        error.errors.forEach((err: string) => toast.error(err));
      } else {
        toast.error(error.message);
      }
    },
  });
};
