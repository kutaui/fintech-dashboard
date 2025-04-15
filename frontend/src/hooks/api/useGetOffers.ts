import { useQuery } from "@tanstack/react-query";
import { ApiError, apiFetch } from "./config";

type OffersResponse = {
  offers: OfferType[];
};

export default function useGetOffers() {
  return useQuery<OffersResponse, ApiError>({
    queryKey: ["offers"],
    queryFn: async () => {
      return apiFetch<OffersResponse>("/api/offers");
    },
  });
}
