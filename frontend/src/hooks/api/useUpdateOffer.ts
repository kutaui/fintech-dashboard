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

export default function useUpdateOffer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      ...data
    }: OfferInput & { id: number | string }): Promise<OfferResponse> => {
      return apiFetch<OfferResponse>(`/api/offers/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["offers"] });
      queryClient.invalidateQueries({ queryKey: ["offers", variables.id] });
      toast.success("Offer updated successfully");
    },
    onError: () => {
      toast.error("Failed to update offer");
    },
  });
}
