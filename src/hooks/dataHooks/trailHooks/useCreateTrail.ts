import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { trailsApi } from "@api/public";
import { PUBLIC_ROUTES } from "@constants";
import { CreateTrailDto } from "@schemas/trail";
import { handleApiError } from "@utils/errorHandlers";

export const useCreateTrail = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["createTrail"],
    mutationFn: (trailData: CreateTrailDto) => trailsApi.createTrail(trailData),

    onSuccess: (data) => {
      navigate(PUBLIC_ROUTES.trail.details.build(data.id)); // Redirect to the created trail's page
      toast.success(`Trail created successfully!`);
    },

    onError: handleApiError,
  });
};
