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
import useCreateOffer from '@/hooks/api/useCreateOffer'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const offerFormSchema = z.object({
	title: z.string().min(3, { message: "Title must be at least 3 characters." }),
	price: z.coerce.number().positive({ message: "Price must be a positive number." }),
	productType: z.string({ required_error: "Please select a product type." }),
	insuranceType: z.string({ required_error: "Please select an insurance type." })
})

type OfferFormValues = z.infer<typeof offerFormSchema>

const defaultValues: Partial<OfferFormValues> = {
	title: "",
	price: undefined,
	productType: undefined,
	insuranceType: undefined
}

interface AddOfferDialogProps {
	onAddOffer?: (newOffer: OfferType) => void
}

export function AddOfferDialog({ onAddOffer }: AddOfferDialogProps) {
	const [open, setOpen] = useState(false)
	const { mutate: createOffer, isPending } = useCreateOffer()
	
	const form = useForm<OfferFormValues>({
		resolver: zodResolver(offerFormSchema),
		defaultValues
	})

	function onSubmit(data: OfferFormValues) {
		createOffer({
			title: data.title,
			price: data.price,
			productType: data.productType as ProductType,
			insuranceType: data.insuranceType as InsuranceType,
		}, {
			onSuccess: () => {
				setOpen(false)
				form.reset()
			}
		})
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline">Add New Offer</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[550px]">
				<DialogHeader>
					<DialogTitle>Add New Insurance Offer</DialogTitle>
					<DialogDescription>
						Fill in the details to create a new insurance offer.
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
							<Button type="submit" disabled={isPending}>
								{isPending ? "Creating..." : "Create Offer"}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
} 