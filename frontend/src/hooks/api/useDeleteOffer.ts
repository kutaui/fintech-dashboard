import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "./config";

type DeleteOfferResponse = {
  message: string;
};

export default function useDeleteOffer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number | string): Promise<DeleteOfferResponse> => {
      return apiFetch<DeleteOfferResponse>(`/api/offers/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["offers"] });
      queryClient.invalidateQueries({ queryKey: ["offers", id] });
    },
  });
}
