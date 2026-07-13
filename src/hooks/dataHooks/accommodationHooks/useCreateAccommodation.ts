import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { accommodationsApi } from "@api/public";
import { APP_ROUTES } from "@constants";
import { CreateAccommodationDto } from "@schemas/accommodation";
import { handleApiError } from "@utils/errorHandlers";

export const useCreateAccommodation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["createAccommodation"],
    mutationFn: (accommodationData: CreateAccommodationDto) =>
      accommodationsApi.createAccommodation(accommodationData),

    onSuccess: (data) => {
      navigate(APP_ROUTES.accommodation.detail.build(data.id)); // Redirect to the created accommodation's page
      toast.success(`Accommodation created successfully!`);
    },

    onError: handleApiError,
  });
};
