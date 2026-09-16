'use client'

import { login } from '@/app/api/auth/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const redirectedFrom = searchParams.get('redirectedFrom')

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    setError(null)

    try {
      const result = await login(formData)

      if (result.error) {
        setError(result.error)
      } else {
        // Redirect to dashboard or the page they were trying to access
        const redirectPath = redirectedFrom || '/dashboard'
        router.push(redirectPath)
        router.refresh()
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-semibold">Welcome back</CardTitle>
          <CardDescription>
            Sign in to your job application workspace
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                disabled={isLoading}
              />
            </div>

            <div className="flex items-center justify-between">
              <Link
                href="/forgot-password"
                className="text-sm font-medium text-slate-600 hover:text-slate-900"
              >
                Forgot password?
              </Link>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-slate-600">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="font-medium text-slate-900 hover:underline">
                Create account
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
