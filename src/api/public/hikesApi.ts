import { PUBLIC_ROUTES } from "@constants";
import { IHikeCard } from "@types";

import { ApiClient } from "../base";

const apiClient = new ApiClient();

export const hikesApi = {
  get4RandomHikes: (): Promise<IHikeCard[]> =>
    apiClient.get(PUBLIC_ROUTES.hike.random),
};
