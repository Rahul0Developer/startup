import { EmptyState } from '@/components/ui/empty-state'
import { ClipboardList } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ApplicationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Applications</h1>
        <p className="mt-1 text-slate-500">Track your job applications</p>
      </div>

      <EmptyState
        icon={<ClipboardList className="h-12 w-12" />}
        title="No applications yet"
        description="Start tracking your job applications to stay organized."
        action={
          <Button disabled>
            Add Application (Coming Soon)
          </Button>
        }
      />
    </div>
  )
}
