'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import useLogin from "@/hooks/api/useLogin"
import useGetUser from "@/hooks/api/useGetUser"
import { useAuthStore } from "@/store/Auth"
import { cn } from "@/lib/utils"

const loginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
})

type LoginFormValues = z.infer<typeof loginFormSchema>

const defaultValues: Partial<LoginFormValues> = {
  email: "",
  password: "",
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { mutate: login } = useLogin()
  const { isAuthenticated, user } = useAuthStore()
  const { isLoading: isAuthLoading, refetch } = useGetUser()
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues,
  })

  useEffect(() => {
    if (isAuthenticated && !isAuthLoading) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, isAuthLoading, router, user])

  function onSubmit(data: LoginFormValues) {
    setIsLoading(true)
    login(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          setIsLoading(false)
          
          refetch().then(() => {
            router.push("/dashboard")
          })
        },
        onError: () => {
          setIsLoading(false)
          form.setError("root", {
            message: "Invalid email or password",
          })
        },
      }
    )
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="m@example.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center">
                  <FormLabel>Password</FormLabel>
                </div>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {form.formState.errors.root && (
            <p className="text-sm font-medium text-destructive">
              {form.formState.errors.root.message}
            </p>
          )}
          <Button type="submit" className="w-full" disabled={isLoading || isAuthLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
         
        </form>
      </Form>

    </div>
  )
}
