'use client'

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarTrigger,
} from '@/components/ui/sidebar'
import useLogout from '@/hooks/api/useLogout'
import { BarChart, Home, LogOut } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type MainSidebarProps = {
	children?: React.ReactNode
}

export default function MainSidebar({ children }: MainSidebarProps) {
	const { mutate: logout, isPending } = useLogout()
	const router = useRouter()

	function handleLogout() {
		logout(undefined, {
			onSuccess: () => {
				router.push('/login')
			}
		})
	}

	return (
		<SidebarProvider>
			<Sidebar>
				<SidebarHeader className="p-4 flex items-center justify-between">
					<h2 className="font-bold text-xl">FinSureTex</h2>
				</SidebarHeader>
				<SidebarContent>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton asChild>
								<Link href="/dashboard">
									<Home />
									<span>Home</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
						<SidebarMenuItem>
							<SidebarMenuButton asChild>
								<Link href="/analytics">
									<BarChart />
									<span>Analytics</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarContent>
				<SidebarFooter className="p-4">
					<SidebarMenuButton 
						onClick={handleLogout} 
						disabled={isPending}
						className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50"
					>
						<LogOut />
						<span>{isPending ? 'Logging out...' : 'Logout'}</span>
					</SidebarMenuButton>
				</SidebarFooter>
			</Sidebar>
			<SidebarInset className="min-w-0 flex-1 overflow-hidden">
				<div className="p-4">
					<SidebarTrigger />
					{children}
				</div>
			</SidebarInset>
		</SidebarProvider>
	)
}
