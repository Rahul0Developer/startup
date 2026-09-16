import { EmptyState } from '@/components/ui/empty-state'
import { Briefcase } from 'lucide-react'

export default function JobsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Jobs</h1>
        <p className="mt-1 text-slate-500">Browse and save job opportunities</p>
      </div>

      <EmptyState
        icon={<Briefcase className="h-12 w-12" />}
        title="No jobs saved yet"
        description="Save jobs you're interested in to track them in one place."
      />
    </div>
  )
}
