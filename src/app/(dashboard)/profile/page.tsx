import { createClient } from '@/lib/supabase/client'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default async function ProfilePage() {
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Profile</h1>
        <p className="mt-1 text-slate-500">Manage your personal and professional information</p>
      </div>

      <form action="/api/profile" method="POST" className="space-y-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Your basic contact details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="full_name">Full Name</Label>
                <Input
                  id="full_name"
                  name="full_name"
                  defaultValue={profile?.full_name || ''}
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={user.email || ''}
                  disabled
                  className="bg-slate-50"
                />
                <p className="text-xs text-slate-500">Email comes from your account</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  defaultValue={profile?.phone || ''}
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  defaultValue={profile?.location || ''}
                  placeholder="San Francisco, CA"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Professional Information */}
        <Card>
          <CardHeader>
            <CardTitle>Professional Information</CardTitle>
            <CardDescription>Your professional summary</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="professional_title">Professional Title</Label>
              <Input
                id="professional_title"
                name="professional_title"
                defaultValue={profile?.professional_title || ''}
                placeholder="Software Engineer"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                defaultValue={profile?.bio || ''}
                placeholder="Brief description about yourself..."
                rows={4}
                maxLength={500}
              />
              <p className="text-xs text-slate-500">Maximum 500 characters</p>
            </div>
          </CardContent>
        </Card>

        {/* Professional Links */}
        <Card>
          <CardHeader>
            <CardTitle>Professional Links</CardTitle>
            <CardDescription>Links to your professional profiles (optional)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="linkedin_url">LinkedIn URL</Label>
              <Input
                id="linkedin_url"
                name="linkedin_url"
                defaultValue={profile?.linkedin_url || ''}
                placeholder="https://www.linkedin.com/in/your-profile"
                pattern="https://.*"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="github_url">GitHub URL</Label>
              <Input
                id="github_url"
                name="github_url"
                defaultValue={profile?.github_url || ''}
                placeholder="https://github.com/your-username"
                pattern="https://.*"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="portfolio_url">Portfolio URL</Label>
              <Input
                id="portfolio_url"
                name="portfolio_url"
                defaultValue={profile?.portfolio_url || ''}
                placeholder="https://yourportfolio.com"
                pattern="https?://.*"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="leetcode_url">LeetCode URL</Label>
                <Input
                  id="leetcode_url"
                  name="leetcode_url"
                  defaultValue={profile?.leetcode_url || ''}
                  placeholder="https://leetcode.com/your-username"
                  pattern="https://.*"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="codeforces_url">Codeforces URL</Label>
                <Input
                  id="codeforces_url"
                  name="codeforces_url"
                  defaultValue={profile?.codeforces_url || ''}
                  placeholder="https://codeforces.com/profile/your-username"
                  pattern="https://.*"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="hackerrank_url">HackerRank URL</Label>
                <Input
                  id="hackerrank_url"
                  name="hackerrank_url"
                  defaultValue={profile?.hackerrank_url || ''}
                  placeholder="https://www.hackerrank.com/your-username"
                  pattern="https://.*"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="kaggle_url">Kaggle URL</Label>
                <Input
                  id="kaggle_url"
                  name="kaggle_url"
                  defaultValue={profile?.kaggle_url || ''}
                  placeholder="https://www.kaggle.com/your-username"
                  pattern="https://.*"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between">
          <Button type="submit">Save Profile</Button>
          <Link href="/dashboard">
            <Button variant="ghost" type="button">Cancel</Button>
          </Link>
        </div>
      </form>
    </div>
  )
}
