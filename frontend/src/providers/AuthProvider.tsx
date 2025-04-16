'use client'

import useGetUser from '@/hooks/api/useGetUser'
import { useAuthStore } from '@/store/Auth'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isLoading, isAuthenticated } = useAuthStore()
  const { refetch, isError } = useGetUser()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    refetch()
  }, [refetch])

  useEffect(() => {
    if (isError) {
      useAuthStore.getState().setIsLoading(false)
    }
  }, [isError])

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