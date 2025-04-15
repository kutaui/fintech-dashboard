'use client'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { INSURANCE_CATEGORY, PRODUCT_CATEGORY } from '@/constants/insurance'
import { useOffers } from '@/hooks/useOffers'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const offerFormSchema = z.object({
	title: z.string().min(3, { message: "Title must be at least 3 characters." }),
	price: z.coerce.number().positive({ message: "Price must be a positive number." }),
	productType: z.string({ required_error: "Please select a product type." }),
	insuranceType: z.string({ required_error: "Please select an insurance type." })
})

type OfferFormValues = z.infer<typeof offerFormSchema>

interface EditOfferDialogProps {
	offer: OfferType
	onEditOffer?: (updatedOffer: OfferType) => void
	trigger?: React.ReactNode
	open?: boolean
	onOpenChange?: Dispatch<SetStateAction<boolean>>
}

export function EditOfferDialog({ 
	offer, 
	onEditOffer,
	trigger,
	open: controlledOpen,
	onOpenChange: setControlledOpen
}: EditOfferDialogProps) {
	const { isUpdating } = useOffers()
	const [internalOpen, setInternalOpen] = useState(false)
	
	// Use either controlled or uncontrolled state
	const open = controlledOpen !== undefined ? controlledOpen : internalOpen
	const setOpen = setControlledOpen || setInternalOpen
	
	const form = useForm<OfferFormValues>({
		resolver: zodResolver(offerFormSchema),
		defaultValues: {
			title: offer.title,
			price: offer.price,
			productType: offer.productType,
			insuranceType: offer.insuranceType
		}
	})

	// Reset form when offer changes
	useEffect(() => {
		if (offer) {
			form.reset({
				title: offer.title,
				price: offer.price,
				productType: offer.productType,
				insuranceType: offer.insuranceType
			})
		}
	}, [offer, form])

	function onSubmit(data: OfferFormValues) {
		const updatedOffer: OfferType = {
			...offer,
			title: data.title,
			price: data.price,
			productType: data.productType as ProductType,
			insuranceType: data.insuranceType as InsuranceType,
		}
		
		if (onEditOffer) {
			onEditOffer(updatedOffer)
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			{trigger && (
				<DialogTrigger asChild>
					{trigger}
				</DialogTrigger>
			)}
			<DialogContent className="sm:max-w-[550px]">
				<DialogHeader>
					<DialogTitle>Edit Insurance Offer</DialogTitle>
					<DialogDescription>
						Update the details of this insurance offer.
					</DialogDescription>
				</DialogHeader>
				
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Offer Title</FormLabel>
									<FormControl>
										<Input placeholder="Enter offer title" {...field} />
									</FormControl>
									<FormDescription>
										The name of the insurance offer.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						
						<FormField
							control={form.control}
							name="price"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Price</FormLabel>
									<FormControl>
										<Input 
											type="number" 
											step="0.01" 
											placeholder="Enter price" 
											{...field} 
										/>
									</FormControl>
									<FormDescription>
										The price of the insurance offer in USD.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						
						<div className="grid grid-cols-2 gap-4">
							<FormField
								control={form.control}
								name="productType"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Product Type</FormLabel>
										<Select 
											onValueChange={field.onChange} 
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select product type" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{Object.values(PRODUCT_CATEGORY).map((type) => (
													<SelectItem key={type} value={type}>
														{type}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormDescription>
											Category of insurance product.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							
							<FormField
								control={form.control}
								name="insuranceType"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Insurance Type</FormLabel>
										<Select 
											onValueChange={field.onChange} 
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select insurance type" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{Object.values(INSURANCE_CATEGORY).map((type) => (
													<SelectItem key={type} value={type}>
														{type}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormDescription>
											Type of insurance coverage.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						
						<DialogFooter>
							<Button 
								type="button" 
								variant="outline" 
								onClick={() => {
									form.reset()
									setOpen(false)
								}}
							>
								Cancel
							</Button>
							<Button type="submit" disabled={isUpdating}>
								{isUpdating ? "Updating..." : "Update Offer"}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
} 