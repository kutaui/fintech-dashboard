'use client'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { formatDate } from '@/lib/utils'
import { Dispatch, SetStateAction, useState } from 'react'

type ViewDetailsDialogProps = {
	offer: OfferType
	trigger?: React.ReactNode
	open?: boolean
	onOpenChange?: Dispatch<SetStateAction<boolean>>
}

export function ViewDetailsDialog({ 
	offer, 
	trigger, 
	open: controlledOpen, 
	onOpenChange: setControlledOpen 
}: ViewDetailsDialogProps) {
	const [internalOpen, setInternalOpen] = useState(false)
	const open = controlledOpen !== undefined ? controlledOpen : internalOpen
	const setOpen = setControlledOpen || setInternalOpen

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			{trigger && (
				<DialogTrigger asChild>
					{trigger}
				</DialogTrigger>
			)}
			<DialogContent className="sm:max-w-[550px]">
				<DialogHeader>
					<DialogTitle>Offer Details</DialogTitle>
					<DialogDescription>
						Detailed information about the insurance offer.
					</DialogDescription>
				</DialogHeader>
				
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<div className="font-medium">ID:</div>
						<div className="col-span-3">{offer.id}</div>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<div className="font-medium">Title:</div>
						<div className="col-span-3">{offer.title}</div>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<div className="font-medium">Price:</div>
						<div className="col-span-3">
							{new Intl.NumberFormat('en-US', {
								style: 'currency',
								currency: 'USD',
							}).format(offer.price)}
						</div>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<div className="font-medium">Product Type:</div>
						<div className="col-span-3">{offer.productType}</div>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<div className="font-medium">Insurance Type:</div>
						<div className="col-span-3">{offer.insuranceType}</div>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<div className="font-medium">Created At:</div>
						<div className="col-span-3">{formatDate(offer.createdAt)}</div>
					</div>
				</div>
				
				<div className="flex justify-end">
					<Button 
						variant="outline" 
						onClick={() => setOpen(false)}
					>
						Close
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
} 