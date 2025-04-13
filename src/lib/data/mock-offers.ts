import { INSURANCE_CATEGORY, PRODUCT_CATEGORY } from '@/constants/insurance'

export const offers: OfferType[] = [
	{
		id: 'off_1',
		title: 'Comprehensive Auto Insurance',
		price: 1250.99,
		createdAt: '2023-11-15T10:30:00Z',
		productType: PRODUCT_CATEGORY.AUTO,
		insuranceType: INSURANCE_CATEGORY.COMPREHENSIVE,
	},
	{
		id: 'off_2',
		title: 'Home Insurance Premium',
		price: 876.5,
		createdAt: '2023-11-10T14:45:00Z',
		productType: PRODUCT_CATEGORY.HOME,
		insuranceType: INSURANCE_CATEGORY.PREMIUM,
	},
	{
		id: 'off_3',
		title: 'Health Insurance Basic',
		price: 450.75,
		createdAt: '2023-11-05T09:15:00Z',
		productType: PRODUCT_CATEGORY.HEALTH,
		insuranceType: INSURANCE_CATEGORY.BASIC,
	},
	{
		id: 'off_4',
		title: 'Term Life Insurance',
		price: 320.0,
		createdAt: '2023-10-28T16:20:00Z',
		productType: PRODUCT_CATEGORY.LIFE,
		insuranceType: INSURANCE_CATEGORY.TERM,
	},
	{
		id: 'off_5',
		title: 'Travel Insurance Standard',
		price: 125.99,
		createdAt: '2023-10-22T11:10:00Z',
		productType: PRODUCT_CATEGORY.TRAVEL,
		insuranceType: INSURANCE_CATEGORY.STANDARD,
	},
	{
		id: 'off_6',
		title: 'Business Liability Insurance',
		price: 2150.5,
		createdAt: '2023-10-15T13:40:00Z',
		productType: PRODUCT_CATEGORY.BUSINESS,
		insuranceType: INSURANCE_CATEGORY.CUSTOM,
	},
	{
		id: 'off_7',
		title: 'Property Insurance Standard',
		price: 955.25,
		createdAt: '2023-10-08T15:30:00Z',
		productType: PRODUCT_CATEGORY.PROPERTY,
		insuranceType: INSURANCE_CATEGORY.STANDARD,
	},
	{
		id: 'off_8',
		title: 'Auto Third Party Insurance',
		price: 650.0,
		createdAt: '2023-10-01T10:00:00Z',
		productType: PRODUCT_CATEGORY.AUTO,
		insuranceType: INSURANCE_CATEGORY.THIRD_PARTY,
	},
	{
		id: 'off_9',
		title: 'Whole Life Insurance Premium',
		price: 520.75,
		createdAt: '2023-09-25T14:20:00Z',
		productType: PRODUCT_CATEGORY.LIFE,
		insuranceType: INSURANCE_CATEGORY.WHOLE_LIFE,
	},
	{
		id: 'off_10',
		title: 'Health Insurance Premium',
		price: 780.5,
		createdAt: '2023-09-18T09:45:00Z',
		productType: PRODUCT_CATEGORY.HEALTH,
		insuranceType: INSURANCE_CATEGORY.PREMIUM,
	},
]
