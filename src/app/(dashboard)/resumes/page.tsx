import { EmptyState } from '@/components/ui/empty-state'
import { FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ResumesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Resumes</h1>
        <p className="mt-1 text-slate-500">Manage your resume versions</p>
      </div>

      <EmptyState
        icon={<FileText className="h-12 w-12" />}
        title="No resumes yet"
        description="Upload your first resume to start matching your profile with jobs."
        action={
          <Button disabled>
            Upload Resume (Coming Soon)
          </Button>
        }
      />
    </div>
  )
}
