import useDeleteOffer from "@/hooks/api/useDeleteOffer";
import useUpdateOffer from "@/hooks/api/useUpdateOffer";
import { useOffersStore } from "@/store/useOffersStore";
import { useEffect } from "react";

export function useOffers() {
  const { isUpdating, isDeleting, setUpdating, setDeleting } = useOffersStore();

  const { mutate: updateOfferMutation, isPending: isUpdatePending } =
    useUpdateOffer();
  const { mutate: deleteOfferMutation, isPending: isDeletePending } =
    useDeleteOffer();

  useEffect(() => {
    setUpdating(isUpdatePending);
  }, [isUpdatePending, setUpdating]);

  useEffect(() => {
    setDeleting(isDeletePending);
  }, [isDeletePending, setDeleting]);

  const updateOffer = (
    offer: OfferType,
    onSuccess?: (updatedOffer: OfferType) => void
  ) => {
    updateOfferMutation(
      {
        id: offer.id,
        title: offer.title,
        price: offer.price,
        productType: offer.productType,
        insuranceType: offer.insuranceType,
      },
      {
        onSuccess: (response) => {
          if (onSuccess) {
            onSuccess(response.offer);
          }
        },
      }
    );
  };

  const deleteOffer = (id: number | string) => {
    deleteOfferMutation(id);
  };

  return {
    isUpdating,
    isDeleting,
    updateOffer,
    deleteOffer,
  };
}
