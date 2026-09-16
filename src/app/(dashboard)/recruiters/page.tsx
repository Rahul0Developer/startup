import { EmptyState } from '@/components/ui/empty-state'
import { Users } from 'lucide-react'

export default function RecruitersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Recruiters</h1>
        <p className="mt-1 text-slate-500">Manage recruiter contacts</p>
      </div>

      <EmptyState
        icon={<Users className="h-12 w-12" />}
        title="No recruiters yet"
        description="Add recruiter contacts to track your communications."
      />
    </div>
  )
}
