import { createClient } from '@/lib/supabase/client'

export async function signup(formData: FormData) {
  const supabase = createClient()

  const fullName = formData.get('full_name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirm_password') as string

  // Validation
  if (!fullName || fullName.length < 2) {
    return { error: 'Full name must be at least 2 characters' }
  }

  if (!email || !email.includes('@')) {
    return { error: 'Invalid email address' }
  }

  if (!password || password.length < 8) {
    return { error: 'Password must be at least 8 characters' }
  }

  if (password !== confirmPassword) {
    return { error: "Passwords don't match" }
  }

  // Check password complexity
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /[0-9]/.test(password)

  if (!hasUppercase || !hasLowercase || !hasNumber) {
    return { 
      error: 'Password must contain at least one uppercase letter, one lowercase letter, and one number' 
    }
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })

    if (error) {
      return { error: error.message }
    }

    // Create profile record
    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          user_id: data.user.id,
          full_name: fullName,
        })

      if (profileError) {
        console.error('Error creating profile:', profileError)
        // Don't fail the signup, just log the error
      }
    }

    return { success: true }
  } catch (error) {
    console.error('Signup error:', error)
    return { error: 'Something went wrong. Please try again.' }
  }
}

export async function login(formData: FormData) {
  const supabase = createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !email.includes('@')) {
    return { error: 'Invalid email address' }
  }

  if (!password) {
    return { error: 'Password is required' }
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return { error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error('Login error:', error)
    return { error: 'Something went wrong. Please try again.' }
  }
}

export async function logout() {
  const supabase = createClient()

  try {
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      return { error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error('Logout error:', error)
    return { error: 'Something went wrong. Please try again.' }
  }
}

export async function resetPassword(formData: FormData) {
  const supabase = createClient()

  const email = formData.get('email') as string

  if (!email || !email.includes('@')) {
    return { error: 'Invalid email address' }
  }

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/reset-password`,
    })

    if (error) {
      return { error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error('Reset password error:', error)
    return { error: 'Something went wrong. Please try again.' }
  }
}
