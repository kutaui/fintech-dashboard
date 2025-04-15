'use client'

import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'
import { ColumnDef, FilterFn } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { ActionCell } from './ActionCell'

const filterProductTypes: FilterFn<OfferType> = (
	row,
	columnId,
	filterValue
) => {
	if (!filterValue || !filterValue.length) return true
	const productType = row.getValue(columnId) as string
	return (filterValue as string[]).includes(productType)
}

const filterInsuranceTypes: FilterFn<OfferType> = (
	row,
	columnId,
	filterValue
) => {
	if (!filterValue || !filterValue.length) return true
	const insuranceType = row.getValue(columnId) as string
	return (filterValue as string[]).includes(insuranceType)
}

const filterPrice: FilterFn<OfferType> = (row, columnId, filterValue) => {
	if (!filterValue) return true
	const { min, max } = filterValue as { min?: number; max?: number }
	const price = row.getValue(columnId) as number

	if (min !== undefined && max !== undefined) {
		return price >= min && price <= max
	} else if (min !== undefined) {
		return price >= min
	} else if (max !== undefined) {
		return price <= max
	}

	return true
}

export const Columns: ColumnDef<OfferType>[] = [
	{
		accessorKey: 'title',
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
			>
				Offer Title
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
	},
	{
		accessorKey: 'productType',
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
			>
				Product Type
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		filterFn: filterProductTypes,
	},
	{
		accessorKey: 'insuranceType',
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
			>
				Insurance Type
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		filterFn: filterInsuranceTypes,
	},
	{
		accessorKey: 'price',
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				className="w-full flex justify-end"
			>
				Price
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => {
			const price = parseFloat(row.getValue('price'))
			const formatted = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'USD',
			}).format(price)

			return <div className="text-right font-medium">{formatted}</div>
		},
		filterFn: filterPrice,
	},
	{
		accessorKey: 'createdAt',
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
			>
				Created Date
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => {
			return formatDate(row.getValue('createdAt'))
		},
	},
	{
		id: 'actions',
		enableSorting: false,
		header: () => <span>Actions</span>,
		cell: ({ row }) => {
			const offer = row.original
			return <ActionCell offer={offer} />
		},
	},
]
