'use client'

import {
	ColumnDef,
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable,
} from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon, FilterIcon } from 'lucide-react'
import { INSURANCE_CATEGORY, PRODUCT_CATEGORY } from '@/constants/insurance'
import { useEffect, useState } from 'react'

type DataTableProps<TData, TValue> = {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
}

type PriceFilter = {
	min?: number
	max?: number
}

export function DataTable<TData, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = useState<SortingState>([])
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
	const [priceRange, setPriceRange] = useState<{ min: string; max: string }>({
		min: '',
		max: '',
	})
	const [selectedProductTypes, setSelectedProductTypes] = useState<string[]>([])
	const [selectedInsuranceTypes, setSelectedInsuranceTypes] = useState<string[]>([])
	const [filterDialogOpen, setFilterDialogOpen] = useState(false)
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

	// Ensure the table updates when pagination state changes
	useEffect(() => {
		table.setPageSize(pageSize)
	}, [pageSize, table])

	useEffect(() => {
		table.setPageIndex(pageIndex)
	}, [pageIndex, table])

	// Calculate the pagination range
	const pageCount = table.getPageCount()
	const currentPage = pageIndex + 1

	// Function handlers for pagination
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
	
	// Generate page numbers for pagination
	const generatePagination = () => {
		// If we have 7 or fewer pages, show all pages
		if (pageCount <= 7) {
			return Array.from({ length: pageCount }, (_, i) => i + 1)
		}
		
		// Show first page, last page, and pages around current page
		if (currentPage <= 3) {
			return [1, 2, 3, 4, 5, '...', pageCount]
		} else if (currentPage >= pageCount - 2) {
			return [1, '...', pageCount - 4, pageCount - 3, pageCount - 2, pageCount - 1, pageCount]
		} else {
			return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', pageCount]
		}
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

		setFilterDialogOpen(false)
	}

	const resetFilters = () => {
		setPriceRange({ min: '', max: '' })
		setSelectedProductTypes([])
		setSelectedInsuranceTypes([])
		table.getColumn('price')?.setFilterValue(undefined)
		table.getColumn('productType')?.setFilterValue(undefined)
		table.getColumn('insuranceType')?.setFilterValue(undefined)
		setFilterDialogOpen(false)
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

	const handlePageSizeChange = (value: string) => {
		const newPageSize = parseInt(value)
		setPageSize(newPageSize)
		// Reset to first page when changing page size
		setPageIndex(0)
	}

	// Calculate display counts
	const rowCount = table.getFilteredRowModel().rows.length
	const firstVisibleRow = rowCount === 0 ? 0 : pageIndex * pageSize + 1
	const lastVisibleRow = Math.min((pageIndex + 1) * pageSize, rowCount)

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
					<Dialog open={filterDialogOpen} onOpenChange={setFilterDialogOpen}>
						<DialogTrigger asChild>
							<Button variant="outline" className="flex items-center gap-2">
								<FilterIcon className="h-4 w-4" />
								Filter
							</Button>
						</DialogTrigger>
						<DialogContent className="sm:max-w-md">
							<DialogHeader>
								<DialogTitle>Filter Insurance Offers</DialogTitle>
								<DialogDescription>
									Set filters to narrow down your search
								</DialogDescription>
							</DialogHeader>
							<div className="grid gap-4 py-4">
								<div className="space-y-2">
									<h3 className="font-medium">Price Range</h3>
									<div className="flex gap-4">
										<div className="flex-1">
											<Label htmlFor="min-price">Min ($)</Label>
											<Input
												id="min-price"
												placeholder="Min"
												type="number"
												min="0"
												value={priceRange.min}
												onChange={(e) =>
													setPriceRange((prev) => ({
														...prev,
														min: e.target.value,
													}))
												}
											/>
										</div>
										<div className="flex-1">
											<Label htmlFor="max-price">Max ($)</Label>
											<Input
												id="max-price"
												placeholder="Max"
												type="number"
												min="0"
												value={priceRange.max}
												onChange={(e) =>
													setPriceRange((prev) => ({
														...prev,
														max: e.target.value,
													}))
												}
											/>
										</div>
									</div>
								</div>

								<div className="space-y-2">
									<h3 className="font-medium">Product Type</h3>
									<div className="grid grid-cols-2 gap-2">
										{Object.values(PRODUCT_CATEGORY).map((type) => (
											<div key={type} className="flex items-center space-x-2">
												<Checkbox
													id={`product-${type}`}
													checked={selectedProductTypes.includes(type)}
													onCheckedChange={() => handleProductTypeChange(type)}
												/>
												<Label htmlFor={`product-${type}`}>{type}</Label>
											</div>
										))}
									</div>
								</div>

								<div className="space-y-2">
									<h3 className="font-medium">Insurance Type</h3>
									<div className="grid grid-cols-2 gap-2">
										{Object.values(INSURANCE_CATEGORY).map((type) => (
											<div key={type} className="flex items-center space-x-2">
												<Checkbox
													id={`insurance-${type}`}
													checked={selectedInsuranceTypes.includes(type)}
													onCheckedChange={() =>
														handleInsuranceTypeChange(type)
													}
												/>
												<Label htmlFor={`insurance-${type}`}>{type}</Label>
											</div>
										))}
									</div>
								</div>
							</div>
							<DialogFooter>
								<Button variant="outline" onClick={resetFilters}>
									Reset
								</Button>
								<Button onClick={applyFilters}>Apply Filters</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
					<Button variant="outline">Add New Offer</Button>
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
			<div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 mt-4">
				<div className="flex items-center space-x-2">
					<p className="text-sm text-muted-foreground">
						Showing 
						<span className="font-medium"> {firstVisibleRow} </span>
						to 
						<span className="font-medium"> {lastVisibleRow} </span>
						of 
						<span className="font-medium"> {rowCount} </span>
						entries
					</p>
					<div className="flex items-center space-x-2">
						<Label htmlFor="perPage" className="text-sm">
							Show
						</Label>
						<Select
							value={pageSize.toString()}
							onValueChange={handlePageSizeChange}
						>
							<SelectTrigger className="h-8 w-[80px]">
								<SelectValue placeholder={pageSize.toString()} />
							</SelectTrigger>
							<SelectContent>
								{[5, 10, 20, 50, 100].map((size) => (
									<SelectItem key={size} value={size.toString()}>
										{size}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>

				{pageCount > 0 && (
					<nav className="flex items-center space-x-1">
						<Button 
							variant="outline"
							size="icon"
							onClick={handlePreviousPage}
							disabled={pageIndex === 0}
							className="h-8 w-8"
							type="button"
						>
							<ChevronLeftIcon className="h-4 w-4" />
							<span className="sr-only">Go to previous page</span>
						</Button>
						
						<div className="flex items-center space-x-1">
							{generatePagination().map((page, i) => (
								page === '...' ? (
									<span
										key={i}
										className="flex h-8 w-8 items-center justify-center text-sm text-muted-foreground"
									>
										<MoreHorizontalIcon className="h-4 w-4" />
									</span>
								) : (
									<Button
										key={i}
										variant={currentPage === page ? "default" : "outline"}
										size="icon"
										onClick={() => handlePageChange(Number(page) - 1)}
										className="h-8 w-8 mx-0.5"
										type="button"
									>
										{page}
									</Button>
								)
							))}
						</div>
						
						<Button 
							variant="outline"
							size="icon"
							onClick={handleNextPage}
							disabled={pageIndex >= pageCount - 1}
							className="h-8 w-8"
							type="button"
						>
							<ChevronRightIcon className="h-4 w-4" />
							<span className="sr-only">Go to next page</span>
						</Button>
					</nav>
				)}
			</div>
		</div>
	)
}
