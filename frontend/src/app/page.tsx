import { Columns } from '@/components/OffersTable/Columns'
import { DataTable } from '@/components/OffersTable/DataTable'
import { offers } from '@/lib/data/mock-offers'

export default function Home() {
	return (
		<main className="flex-1 min-w-0 p-4">
			<h1 className="text-2xl font-semibold mb-6">Insurance Offers</h1>
			<DataTable columns={Columns} data={offers} />
		</main>
	)
}
