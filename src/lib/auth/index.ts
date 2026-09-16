import { createClient } from '@/lib/supabase/client'
import { NextResponse } from 'next/server'

export async function getUser() {
  const supabase = createClient()
  
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error || !user) {
      return null
    }
    
    return user
  } catch (error) {
    console.error('Error getting user:', error)
    return null
  }
}

export async function getSession() {
  const supabase = createClient()
  
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    
    if (error || !session) {
      return null
    }
    
    return session
  } catch (error) {
    console.error('Error getting session:', error)
    return null
  }
}

export async function requireAuth() {
  const user = await getUser()
  
  if (!user) {
    throw new Error('Unauthorized')
  }
  
  return user
}
