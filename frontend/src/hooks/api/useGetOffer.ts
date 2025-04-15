import { useQuery } from "@tanstack/react-query";
import { ApiError, apiFetch } from "./config";

type OfferResponse = {
  offer: OfferType;
};

export default function useGetOffer(id: number | string) {
  return useQuery<OfferResponse, ApiError>({
    queryKey: ["offers", id],
    queryFn: async () => {
      return apiFetch<OfferResponse>(`/api/offers/${id}`);
    },
    enabled: !!id,
  });
}
