'use client'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { formatDate } from '@/lib/utils'
import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'

export const Columns: ColumnDef<OfferType>[] = [
	{
		accessorKey: 'title',
		header: 'Offer Title',
	},
	{
		accessorKey: 'productType',
		header: 'Product Type',
	},
	{
		accessorKey: 'insuranceType',
		header: 'Insurance Type',
	},
	{
		accessorKey: 'price',
		header: () => <div className="text-right">Price</div>,
		cell: ({ row }) => {
			const price = parseFloat(row.getValue('price'))
			const formatted = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'USD',
			}).format(price)

			return <div className="text-right font-medium">{formatted}</div>
		},
	},
	{
		accessorKey: 'createdAt',
		header: 'Created Date',
		cell: ({ row }) => {
			return formatDate(row.getValue('createdAt'))
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const offer = row.original

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem
							onClick={() => navigator.clipboard.writeText(offer.id)}
						>
							Copy offer ID
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>View details</DropdownMenuItem>
						<DropdownMenuItem>Edit offer</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		},
	},
]
