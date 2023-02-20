import { ApiClient } from "@/services/ApiClient";
import { BASE_URL } from "@/utils/constants";
import { create } from "zustand";

export const useSingletonsStore = create<{ apiClient: ApiClient }>()(() => ({
  apiClient: new ApiClient({ url: BASE_URL }),
}));
