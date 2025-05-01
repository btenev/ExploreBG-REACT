import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { trailsApi } from '../../../api/trailsApi';
import { CreateTrailDto } from '../../../schemas';
import { handleApiError } from '../../../utils/errorHandlers';
import { toast } from 'react-toastify';

export const useCreateTrail = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ['createTrail'],
    mutationFn: (trailData: CreateTrailDto) => trailsApi.createTrail(trailData),
    onSuccess: (data) => {
      //   navigate(`/trails/${data.id}`); // Redirect to the created trail's page
      toast.success(`Trail created successfully!`);
    },
    onError: handleApiError,
  });
};
