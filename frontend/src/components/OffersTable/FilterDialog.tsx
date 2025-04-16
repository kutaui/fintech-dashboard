'use client'

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
import { INSURANCE_CATEGORY, PRODUCT_CATEGORY } from '@/constants/insurance'
import { FilterIcon } from 'lucide-react'
import { useState } from 'react'

type FilterDialogProps = {
    priceRange: { min: string; max: string }
    setPriceRange: React.Dispatch<React.SetStateAction<{ min: string; max: string }>>
    selectedProductTypes: string[]
    selectedInsuranceTypes: string[]
    handleProductTypeChange: (type: string) => void
    handleInsuranceTypeChange: (type: string) => void
    applyFilters: () => void
    resetFilters: () => void
}

export function FilterDialog({
    priceRange,
    setPriceRange,
    selectedProductTypes,
    selectedInsuranceTypes,
    handleProductTypeChange,
    handleInsuranceTypeChange,
    applyFilters,
    resetFilters,
}: FilterDialogProps) {
    const [open, setOpen] = useState(false)

    function handleApply() {
        applyFilters()
        setOpen(false)
    }

    function handleReset() {
        resetFilters()
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
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
                                        onCheckedChange={() => handleInsuranceTypeChange(type)}
                                    />
                                    <Label htmlFor={`insurance-${type}`}>{type}</Label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={handleReset}>
                        Reset
                    </Button>
                    <Button onClick={handleApply}>Apply Filters</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
} 