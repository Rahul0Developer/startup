import { createClient } from '@/lib/supabase/client'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Get profile data
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user.id)
    .single()

  // Get stats - these will be 0 for new users since no data exists yet
  const [applicationsCount, interviewsCount, followupsCount, savedJobsCount] = await Promise.all([
    supabase.from('applications').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
    // These tables don't exist yet but will be added in future days
    Promise.resolve({ count: 0 }),
    Promise.resolve({ count: 0 }),
    Promise.resolve({ count: 0 }),
  ])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">
          Good morning, {profile?.full_name || user.email?.split('@')[0] || 'User'}
        </h1>
        <p className="mt-1 text-slate-500">Your job search workspace</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Applications"
          value={applicationsCount.count || 0}
          description="Total applications tracked"
        />
        <StatCard
          title="Interviews"
          value={interviewsCount}
          description="Scheduled interviews"
        />
        <StatCard
          title="Follow-ups"
          value={followupsCount}
          description="Pending follow-ups"
        />
        <StatCard
          title="Saved Jobs"
          value={savedJobsCount}
          description="Jobs you've saved"
        />
      </div>

      {/* Recent Applications */}
      <div className="rounded-lg border border-slate-200 bg-white">
        <div className="border-b border-slate-200 p-6">
          <h2 className="text-lg font-semibold">Recent Applications</h2>
        </div>
        <div className="p-6">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 rounded-full bg-slate-100 p-3">
              <svg className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-sm font-medium text-slate-900">No applications yet</h3>
            <p className="mt-1 max-w-sm text-sm text-slate-500">
              Start by analyzing a job description or tracking your first application.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">Quick Actions</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <QuickActionCard
            title="Upload Resume"
            description="Add your resume to get started"
            href="/resumes"
            disabled
          />
          <QuickActionCard
            title="Analyze Job"
            description="Paste a job description"
            href="/jd-analyzer"
            disabled
          />
          <QuickActionCard
            title="Track Application"
            description="Log a new application"
            href="/applications"
          />
          <QuickActionCard
            title="Find Jobs"
            description="Browse opportunities"
            href="/jobs"
          />
        </div>
      </div>
    </div>
  )
}

interface StatCardProps {
  title: string
  value: number
  description: string
}

function StatCard({ title, value, description }: StatCardProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6">
      <dt className="truncate text-sm font-medium text-slate-500">{title}</dt>
      <dd className="mt-2 text-3xl font-semibold text-slate-900">{value}</dd>
      <dd className="mt-1 text-xs text-slate-500">{description}</dd>
    </div>
  )
}

interface QuickActionCardProps {
  title: string
  description: string
  href: string
  disabled?: boolean
}

function QuickActionCard({ title, description, href, disabled }: QuickActionCardProps) {
  if (disabled) {
    return (
      <div className="group relative flex cursor-not-allowed flex-col rounded-lg border border-slate-200 bg-white p-4 opacity-60">
        <h3 className="text-sm font-medium text-slate-900">{title}</h3>
        <p className="mt-1 text-xs text-slate-500">{description}</p>
        <span className="absolute inset-0" />
      </div>
    )
  }

  return (
    <a href={href} className="group relative flex flex-col rounded-lg border border-slate-200 bg-white p-4 transition-shadow hover:shadow-md">
      <h3 className="text-sm font-medium text-slate-900">{title}</h3>
      <p className="mt-1 text-xs text-slate-500">{description}</p>
      <span className="absolute inset-0" />
    </a>
  )
}
