import { createClient } from '@/lib/supabase/client'
import { redirect } from 'next/navigation'

export async function POST(request: Request) {
  const supabase = createClient()

  // Get authenticated user
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    
    const profileData = {
      full_name: formData.get('full_name') as string || null,
      professional_title: formData.get('professional_title') as string || null,
      phone: formData.get('phone') as string || null,
      location: formData.get('location') as string || null,
      bio: formData.get('bio') as string || null,
      linkedin_url: (formData.get('linkedin_url') as string) || null,
      github_url: (formData.get('github_url') as string) || null,
      portfolio_url: (formData.get('portfolio_url') as string) || null,
      leetcode_url: (formData.get('leetcode_url') as string) || null,
      codeforces_url: (formData.get('codeforces_url') as string) || null,
      hackerrank_url: (formData.get('hackerrank_url') as string) || null,
      kaggle_url: (formData.get('kaggle_url') as string) || null,
    }

    // Validate URLs - allow empty strings but validate non-empty ones
    const urlValidations = [
      { key: 'linkedin_url', pattern: /^https:\/\/(www\.)?linkedin\.com\/.*/, message: 'Invalid LinkedIn URL' },
      { key: 'github_url', pattern: /^https:\/\/github\.com\/.*/, message: 'Invalid GitHub URL' },
      { key: 'portfolio_url', pattern: /^https?:\/\/.*/, message: 'Invalid Portfolio URL' },
      { key: 'leetcode_url', pattern: /^https:\/\/(www\.)?leetcode\.com\/.*/, message: 'Invalid LeetCode URL' },
      { key: 'codeforces_url', pattern: /^https:\/\/(www\.)?codeforces\.com\/.*/, message: 'Invalid Codeforces URL' },
      { key: 'hackerrank_url', pattern: /^https:\/\/(www\.)?hackerrank\.com\/.*/, message: 'Invalid HackerRank URL' },
      { key: 'kaggle_url', pattern: /^https:\/\/(www\.)?kaggle\.com\/.*/, message: 'Invalid Kaggle URL' },
    ]

    for (const validation of urlValidations) {
      const value = profileData[validation.key as keyof typeof profileData]
      if (value && value.length > 0 && !validation.pattern.test(value)) {
        return Response.json({ error: validation.message }, { status: 400 })
      }
      // Clear empty strings to null
      if (value && value.length === 0) {
        profileData[validation.key as keyof typeof profileData] = null
      }
    }

    // Check if profile exists
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id')
      .eq('user_id', user.id)
      .single()

    let result

    if (existingProfile) {
      // Update existing profile
      result = await supabase
        .from('profiles')
        .update({
          ...profileData,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id)
    } else {
      // Create new profile
      result = await supabase
        .from('profiles')
        .insert({
          user_id: user.id,
          ...profileData,
        })
    }

    if (result.error) {
      console.error('Profile save error:', result.error)
      return Response.json({ error: 'Failed to save profile' }, { status: 500 })
    }

    return Response.json({ success: true })
  } catch (error) {
    console.error('Profile update error:', error)
    return Response.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
