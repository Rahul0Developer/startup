import { createClient } from '@/lib/supabase/client'
import { NextRequest, NextResponse } from 'next/server'

export async function updateSession(request: NextRequest) {
  const supabase = createClient()
  
  try {
    const response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    })

    const { data: { session } } = await supabase.auth.getSession()

    if (!session && !request.nextUrl.pathname.startsWith('/(auth)')) {
      const redirectUrl = new URL('/login', request.url)
      return NextResponse.redirect(redirectUrl)
    }

    return response
  } catch (error) {
    console.error('Middleware error:', error)
    return NextResponse.next()
  }
}
