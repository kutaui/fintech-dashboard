"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { INSURANCE_CATEGORY, PRODUCT_CATEGORY } from "@/constants/insurance";
import useGetOffers from "@/hooks/api/useGetOffers";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

type OfferType = {
  id: number;
  title: string;
  price: number;
  createdAt: string;
  productType: string;
  insuranceType: string;
};

export default function ChartsDashboard() {
    const { data, isLoading, error } = useGetOffers();
    const offers = data?.offers || [];
    const productCategoryData = Object.values(PRODUCT_CATEGORY).map(category => {
        const count = offers.filter((offer: OfferType) => offer.productType === category).length;
        const totalValue = offers
            .filter((offer: OfferType) => offer.productType === category)
            .reduce((sum: number, offer: OfferType) => sum + offer.price, 0);
        
        return {
            name: category,
            count,
            value: totalValue
        };
    }).filter(item => item.count > 0);
    const insuranceTypeData = Object.values(INSURANCE_CATEGORY).map(type => {
        const count = offers.filter((offer: OfferType) => offer.insuranceType === type).length;
        const totalValue = offers
            .filter((offer: OfferType) => offer.insuranceType === type)
            .reduce((sum: number, offer: OfferType) => sum + offer.price, 0);
        
        return {
            name: type,
            count,
            value: totalValue
        };
    }).filter(item => item.count > 0);
    const sortedOffers = [...offers].sort((a: OfferType, b: OfferType) => 
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
    const priceTimelineData = sortedOffers.map((offer: OfferType) => ({
        name: new Date(offer.createdAt).toLocaleDateString(),
        price: offer.price,
        product: offer.productType
    }));
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1'];

    if (isLoading) {
        return <div className="flex justify-center items-center h-80">Loading charts data...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-80 text-red-500">Error loading data: {error.error}</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Product Category Distribution</CardTitle>
                    <CardDescription>Number of offers by product category</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={productCategoryData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" fill="#8884d8" name="Number of Offers" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Insurance Type Distribution</CardTitle>
                    <CardDescription>Value distribution by insurance type</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={insuranceTypeData}
                                cx="50%"
                                cy="50%"
                                labelLine={true}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                nameKey="name"
                                label={(entry) => entry.name}
                            >
                                {insuranceTypeData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value) => `$${typeof value === 'number' ? value.toFixed(2) : value}`} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <Card className="md:col-span-2">
                <CardHeader>
                    <CardTitle>Price Trends Over Time</CardTitle>
                    <CardDescription>Insurance offer prices by date</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={priceTimelineData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip formatter={(value) => `$${typeof value === 'number' ? value.toFixed(2) : value}`} />
                            <Legend />
                            <Line type="monotone" dataKey="price" stroke="#8884d8" name="Price" />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <Card className="md:col-span-2">
                <CardHeader>
                    <CardTitle>Total Value by Product Category</CardTitle>
                    <CardDescription>Sum of all offer values by category</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={productCategoryData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip formatter={(value) => `$${typeof value === 'number' ? value.toFixed(2) : value}`} />
                            <Legend />
                            <Bar dataKey="value" fill="#82ca9d" name="Total Value" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    );
} 