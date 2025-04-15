'use client'

import { Columns } from '@/components/OffersTable/Columns'
import { DataTable } from '@/components/OffersTable/DataTable'
import useCreateOffer from '@/hooks/api/useCreateOffer'
import useGetOffers from '@/hooks/api/useGetOffers'

export default function Dashboard() {
	const { isLoading, isError } = useGetOffers()
	const { mutate: createOffer } = useCreateOffer()

	const handleAddOffer = (newOffer: OfferType) => {
		createOffer({
			title: newOffer.title,
			price: newOffer.price,
			productType: newOffer.productType,
			insuranceType: newOffer.insuranceType,
		})
	}

	if (isLoading) {
		return (
			<main className="flex-1 min-w-0 p-4">
				<h1 className="text-2xl font-semibold mb-6">Insurance Offers</h1>
				<div className="w-full text-center py-8">Loading offers...</div>
			</main>
		)
	}

	if (isError) {
		return (
			<main className="flex-1 min-w-0 p-4">
				<h1 className="text-2xl font-semibold mb-6">Insurance Offers</h1>
				<div className="w-full text-center py-8 text-red-500">Error loading offers. Please try again later.</div>
			</main>
		)
	}

	return (
		<main className="flex-1 min-w-0 p-4">
			<h1 className="text-2xl font-semibold mb-6">Insurance Offers</h1>
			<DataTable 
				columns={Columns} 
				onAddOffer={handleAddOffer} 
			/>
		</main>
	)
}
