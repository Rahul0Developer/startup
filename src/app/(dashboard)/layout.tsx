import { createClient } from '@/lib/supabase/client'
import { redirect } from 'next/navigation'
import { Sidebar } from '@/components/navigation/sidebar'
import { logout } from '@/app/api/auth/actions'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Get profile data
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name')
    .eq('user_id', user.id)
    .single()

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar
        userName={profile?.full_name || user.email?.split('@')[0] || 'User'}
        userEmail={user.email || ''}
        onLogout={async () => {
          'use server'
          await logout()
          redirect('/login')
        }}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
