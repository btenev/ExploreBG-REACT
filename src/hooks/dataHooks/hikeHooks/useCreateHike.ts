import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { hikesApi } from "@api/public";
import { APP_ROUTES } from "@constants";
import { CreateHikeDto } from "@schemas/hike";
import { handleApiError } from "@utils/errorHandlers";

export const useCreateHike = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["createHike"],
    mutationFn: (hikeData: CreateHikeDto) => hikesApi.createHike(hikeData),

    onSuccess: (data) => {
      navigate(APP_ROUTES.hike.detail.build(data.id)); // Redirect to the created hike's page
      toast.success(`Hike created successfully!`);
    },

    onError: handleApiError,
  });
};
