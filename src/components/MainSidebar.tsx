'use client'

import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarTrigger,
} from '@/components/ui/sidebar'
import { Home, Settings, User } from 'lucide-react'
import Link from 'next/link'

interface MainSidebarProps {
	children?: React.ReactNode
}

export default function MainSidebar({ children }: MainSidebarProps) {
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
								<Link href="/">
									<Home />
									<span>Home</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
						<SidebarMenuItem>
							<SidebarMenuButton asChild>
								<Link href="/profile">
									<User />
									<span>Profile</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
						<SidebarMenuItem>
							<SidebarMenuButton asChild>
								<Link href="/settings">
									<Settings />
									<span>Settings</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarContent>
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
