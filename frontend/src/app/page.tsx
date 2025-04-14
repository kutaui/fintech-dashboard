'use client'

import { Columns } from '@/components/OffersTable/Columns'
import { DataTable } from '@/components/OffersTable/DataTable'
import { offers as mockOffers } from '@/lib/data/mock-offers'
import { useState } from 'react'

export default function Home() {
	const [offers, setOffers] = useState<OfferType[]>(mockOffers)

	const handleAddOffer = (newOffer: OfferType) => {
		setOffers((currentOffers) => [...currentOffers, newOffer])
	}

	return (
		<main className="flex-1 min-w-0 p-4">
			<h1 className="text-2xl font-semibold mb-6">Insurance Offers</h1>
			<DataTable 
				columns={Columns} 
				data={offers} 
				onAddOffer={handleAddOffer} 
			/>
		</main>
	)
}
