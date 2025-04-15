import { registerEnumsSchema } from '../schemas/genderEnumSchema';
import { GenderEnum } from '../types';
import { safeParseOrThrow } from '../utils/zodHelpers';
import { ApiClient } from './apiClient';

const apiClient = new ApiClient();
const baseUrl = '/utilities';

interface RegisterEnumsResponse {
  gender: GenderEnum[];
}

export const utilitiesApi = {
  getGenderEnum: async () => {
    const response = await apiClient.get<RegisterEnumsResponse>(`${baseUrl}/register-enums`);
    return safeParseOrThrow(
      registerEnumsSchema,
      response,
      'Failed to load gender options. Please try again later.'
    );
  },
};
