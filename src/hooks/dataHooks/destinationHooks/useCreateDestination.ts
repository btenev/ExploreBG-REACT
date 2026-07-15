import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { destinationsApi } from "@api/public";
import { APP_ROUTES } from "@constants";
import { CreateDestinationDto } from "@schemas/destination";
import { handleApiError } from "@utils/errorHandlers";

export const useCreateDestination = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["createDestination"],
    mutationFn: (destinationData: CreateDestinationDto) =>
      destinationsApi.createDestination(destinationData),

    onSuccess: (data) => {
      navigate(APP_ROUTES.destination.detail.build(data.id)); // Redirect to the created destination's page
      toast.success(`Destination created successfully!`);
    },

    onError: handleApiError,
  });
};
