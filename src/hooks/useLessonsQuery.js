import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

export function useLessons({
  search,
  category,
  emotionalTone,
  sort = "newest",
  page = 1,
  limit = 12,
} = {}) {
  return useQuery({
    queryKey: [
      "lessons",
      search || "",
      category || "",
      emotionalTone || "",
      sort || "newest",
      page,
      limit,
    ],
    queryFn: async () => {
      const params = {
        search: search || undefined,
        category: category || undefined,
        emotionalTone: emotionalTone || undefined,
        sort: sort || undefined,
        page,
        limit,
      };

      const response = await api.get("/lessons", { params });
      return response.data;
    },
    staleTime: 30_000,
    retry: 1,
  });
}
