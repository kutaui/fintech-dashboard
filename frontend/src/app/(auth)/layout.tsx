'use client'

import MainSidebar from "@/components/MainSidebar"
import { useAuthStore } from "@/store/Auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const { isAuthenticated, isLoading } = useAuthStore()
	const router = useRouter()

	useEffect(() => {
		if (!isLoading && !isAuthenticated) {
			router.push('/login')
		}
	}, [isLoading, isAuthenticated, router])

	if (isLoading || !isAuthenticated) {
		return (
			<div className="h-screen w-screen flex items-center justify-center">
				<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
			</div>
		)
	}

	return (
		<MainSidebar>{children}</MainSidebar>
	)
}