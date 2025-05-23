import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { apiFetch } from "./config";

type OfferInput = {
  title: string;
  price: number;
  productType: ProductType;
  insuranceType: InsuranceType;
};

type OfferResponse = {
  offer: OfferType;
};

export default function useCreateOffer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (offer: OfferInput): Promise<OfferResponse> => {
      return apiFetch<OfferResponse>("/api/offers", {
        method: "POST",
        body: JSON.stringify(offer),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["offers"] });
      toast.success("Offer created successfully");
    },
    onError: () => {
      toast.error("Failed to create offer");
    },
  });
}
