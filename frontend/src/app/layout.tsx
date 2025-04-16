import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

import { AuthProvider } from '@/providers/AuthProvider'
import { QueryClientProvider } from '@/providers/QueryClientProvider'
import { Toaster } from '@/components/ui/sonner'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'FinSureTex',
	description: 'FinSureTex',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<QueryClientProvider>
					<AuthProvider>
						{children}
						<Toaster />
					</AuthProvider>
				</QueryClientProvider>
			</body>
		</html>
	)
}
