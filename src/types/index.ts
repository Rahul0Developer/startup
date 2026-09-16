export interface Profile {
  id: string
  user_id: string
  full_name: string | null
  professional_title: string | null
  phone: string | null
  location: string | null
  bio: string | null
  linkedin_url: string | null
  github_url: string | null
  portfolio_url: string | null
  leetcode_url: string | null
  codeforces_url: string | null
  hackerrank_url: string | null
  kaggle_url: string | null
  created_at: string
  updated_at: string
}

export interface UserSettings {
  id: string
  user_id: string
  default_resume_id: string | null
  default_email_tone: 'professional' | 'concise' | 'formal' | 'friendly'
  timezone: string
  created_at: string
  updated_at: string
}

export interface DashboardStats {
  applications_count: number
  interviews_count: number
  followups_count: number
  saved_jobs_count: number
}

export type EmailTone = 'professional' | 'concise' | 'formal' | 'friendly'
