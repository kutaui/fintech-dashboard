'use client'

import {
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable,
} from '@tanstack/react-table'

import { Input } from '@/components/ui/input'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { useEffect, useState } from 'react'

import useGetOffers from '@/hooks/api/useGetOffers'
import { ColumnDef } from '@tanstack/react-table'
import { AddOfferDialog } from './AddOfferDialog'
import { FilterDialog } from './FilterDialog'
import { Pagination } from './Pagination'

type PriceFilter = {
	min?: number
	max?: number
}
type DataTableProps<TData, TValue> = {
	columns: ColumnDef<TData, TValue>[]
	data?: TData[]
	onAddOffer?: (newOffer: OfferType) => void
} 

export function DataTable<TData, TValue>({
	columns,
	data: initialData,
	onAddOffer,
}: DataTableProps<TData, TValue>) {
	const { data: apiData, isLoading, isError } = useGetOffers()
	const data = initialData || (apiData?.offers as TData[]) || []
	
	const [sorting, setSorting] = useState<SortingState>([])
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
	const [priceRange, setPriceRange] = useState<{ min: string; max: string }>({
		min: '',
		max: '',
	})
	const [selectedProductTypes, setSelectedProductTypes] = useState<string[]>([])
	const [selectedInsuranceTypes, setSelectedInsuranceTypes] = useState<string[]>([])
	const [pageSize, setPageSize] = useState<number>(10)
	const [pageIndex, setPageIndex] = useState<number>(0)

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		manualPagination: false,
		onPaginationChange: (updater) => {
			const newState = typeof updater === 'function' ? updater(table.getState().pagination) : updater
			setPageIndex(newState.pageIndex)
			setPageSize(newState.pageSize)
		},
		state: {
			sorting,
			columnFilters,
			pagination: {
				pageIndex,
				pageSize,
			},
		},
	})
	const pageCount = table.getPageCount()
	const rowCount = table.getFilteredRowModel().rows.length

	useEffect(() => {
		table.setPageSize(pageSize)
	}, [pageSize, table])

	useEffect(() => {
		table.setPageIndex(pageIndex)
	}, [pageIndex, table])

	const handlePageChange = (newPage: number) => {
		setPageIndex(newPage)
	}

	const handlePreviousPage = () => {
		if (pageIndex > 0) {
			setPageIndex(pageIndex - 1)
		}
	}

	const handleNextPage = () => {
		if (pageIndex < pageCount - 1) {
			setPageIndex(pageIndex + 1)
		}
	}

	const handlePageSizeChange = (value: string) => {
		const newPageSize = parseInt(value)
		setPageSize(newPageSize)
		setPageIndex(0)
	}
	
	const applyFilters = () => {
		if (priceRange.min && !isNaN(Number(priceRange.min))) {
			const minValue = Number(priceRange.min)
			if (minValue > 0) {
				table
					.getColumn('price')
					?.setFilterValue((old: PriceFilter | undefined) => ({
						...old,
						min: minValue,
					}))
			}
		}

		if (priceRange.max && !isNaN(Number(priceRange.max))) {
			const maxValue = Number(priceRange.max)
			if (maxValue > 0) {
				table
					.getColumn('price')
					?.setFilterValue((old: PriceFilter | undefined) => ({
						...old,
						max: maxValue,
					}))
			}
		}

		if (selectedProductTypes.length > 0) {
			table.getColumn('productType')?.setFilterValue(selectedProductTypes)
		} else {
			table.getColumn('productType')?.setFilterValue(undefined)
		}

		if (selectedInsuranceTypes.length > 0) {
			table.getColumn('insuranceType')?.setFilterValue(selectedInsuranceTypes)
		} else {
			table.getColumn('insuranceType')?.setFilterValue(undefined)
		}
	}

	const resetFilters = () => {
		setPriceRange({ min: '', max: '' })
		setSelectedProductTypes([])
		setSelectedInsuranceTypes([])
		table.getColumn('price')?.setFilterValue(undefined)
		table.getColumn('productType')?.setFilterValue(undefined)
		table.getColumn('insuranceType')?.setFilterValue(undefined)
	}

	const handleProductTypeChange = (type: string) => {
		setSelectedProductTypes((prev) =>
			prev.includes(type)
				? prev.filter((item) => item !== type)
				: [...prev, type]
		)
	}

	const handleInsuranceTypeChange = (type: string) => {
		setSelectedInsuranceTypes((prev) =>
			prev.includes(type)
				? prev.filter((item) => item !== type)
				: [...prev, type]
		)
	}

	if (isLoading) {
		return <div className="w-full text-center py-8">Loading offers...</div>
	}
	
	if (isError) {
		return <div className="w-full text-center py-8 text-red-500">Error loading offers. Please try again later.</div>
	}

	return (
		<div className="w-full">
			<div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between mb-4">
				<Input
					placeholder="Filter offers..."
					value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
					onChange={(event) =>
						table.getColumn('title')?.setFilterValue(event.target.value)
					}
					className="max-w-sm"
				/>
				<div className="flex gap-2">
					<FilterDialog 
						priceRange={priceRange}
						setPriceRange={setPriceRange}
						selectedProductTypes={selectedProductTypes}
						selectedInsuranceTypes={selectedInsuranceTypes}
						handleProductTypeChange={handleProductTypeChange}
						handleInsuranceTypeChange={handleInsuranceTypeChange}
						applyFilters={applyFilters}
						resetFilters={resetFilters}
					/>
					<AddOfferDialog onAddOffer={onAddOffer} />
				</div>
			</div>
			<div className="border rounded-md overflow-hidden">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
												  )}
										</TableHead>
									)
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<Pagination 
				pageIndex={pageIndex}
				pageSize={pageSize}
				pageCount={pageCount}
				totalItems={rowCount}
				handlePageChange={handlePageChange}
				handlePreviousPage={handlePreviousPage}
				handleNextPage={handleNextPage}
				handlePageSizeChange={handlePageSizeChange}
			/>
		</div>
	)
}
