'use client'

import { useAuthStore } from '@/store/Auth'
import useGetUser from '@/hooks/api/useGetUser'
import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isLoading, isAuthenticated } = useAuthStore()
  const { refetch, isError } = useGetUser()
  const router = useRouter()
  const pathname = usePathname()

  // Initial authentication check
  useEffect(() => {
    refetch()
  }, [refetch])

  // Error handling - ensure we're not stuck in loading
  useEffect(() => {
    if (isError) {
      useAuthStore.getState().setIsLoading(false)
    }
  }, [isError])

  // Navigation based on auth state
  useEffect(() => {
    if (!isLoading) {
      const isLoginPage = pathname === '/login'
      
      if (!isAuthenticated && !isLoginPage && !pathname.includes('/_next')) {
        router.push('/login')
      } else if (isAuthenticated && isLoginPage) {
        router.push('/dashboard')
      }
    }
  }, [isLoading, isAuthenticated, pathname, router])

  return children
} 