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
import { INSURANCE_CATEGORY, PRODUCT_CATEGORY } from '@/constants/insurance'
import { FilterIcon } from 'lucide-react'
import { useState } from 'react'

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
	const [selectedInsuranceTypes, setSelectedInsuranceTypes] = useState<
		string[]
	>([])
	const [filterDialogOpen, setFilterDialogOpen] = useState(false)

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			sorting,
			columnFilters,
		},
	})

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
			<div className="flex items-center justify-end space-x-2 mt-4">
				<Button
					variant="outline"
					size="sm"
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					Previous
				</Button>
				<Button
					variant="outline"
					size="sm"
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					Next
				</Button>
			</div>
		</div>
	)
}
