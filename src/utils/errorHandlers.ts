import { toast } from 'react-toastify';
import { ApiError } from '../types';

export const handleApiError = (error: ApiError) => {
  if (error.errors) {
    error.errors.forEach((err: string) => toast.error(err));
  } else {
    toast.error(error.message);
  }
};

export const isApiError = (error: unknown): error is ApiError => {
  return typeof error === 'object' && error !== null && 'status' in error;
};
