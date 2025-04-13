type OfferType = {
	id: string
	title: string
	price: number
	createdAt: string
	productType: ProductType
	insuranceType: InsuranceType
}

type ProductType =
	| 'Auto'
	| 'Home'
	| 'Health'
	| 'Life'
	| 'Travel'
	| 'Business'
	| 'Liability'
	| 'Property'

type InsuranceType =
	| 'Comprehensive'
	| 'Third Party'
	| 'Basic'
	| 'Premium'
	| 'Standard'
	| 'Custom'
	| 'Term'
	| 'Whole Life'
