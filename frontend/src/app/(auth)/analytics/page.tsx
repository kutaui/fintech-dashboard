import ChartsDashboard from "@/components/analytics/ChartsDashboard";

export default function AnalyticsPage() {
    return (
        <div className="container mx-auto p-4 space-y-8">
            <h1 className="text-3xl font-bold">Insurance Analytics Dashboard</h1>
            <ChartsDashboard />
        </div>
    );
}
