'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  ClipboardList,
  Users,
  Mail,
  BarChart3,
  Settings,
  User,
  LogOut,
  Menu,
  X,
  Sparkles,
  Target,
  PenTool,
} from 'lucide-react'

interface SidebarProps {
  userName: string
  userEmail: string
  onLogout: () => void
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
]

const workspaceNav = [
  { name: 'Jobs', href: '/jobs', icon: Briefcase },
  { name: 'Resumes', href: '/resumes', icon: FileText },
  { name: 'Applications', href: '/applications', icon: ClipboardList },
  { name: 'Recruiters', href: '/recruiters', icon: Users },
  { name: 'Emails', href: '/emails', icon: Mail },
]

const toolsNav = [
  { name: 'JD Analyzer', href: '/jd-analyzer', icon: Target, comingSoon: true },
  { name: 'Match Analyzer', href: '/match-analyzer', icon: Sparkles, comingSoon: true },
  { name: 'Resume Builder', href: '/resume-builder', icon: PenTool, comingSoon: true },
]

const insightsNav = [
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
]

const accountNav = [
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export function Sidebar({ userName, userEmail, onLogout }: SidebarProps) {
  const pathname = usePathname()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const NavItem = ({ 
    item, 
    isCollapsed 
  }: { 
    item: { name: string; href: string; icon: any; comingSoon?: boolean }, 
    isCollapsed?: boolean 
  }) => {
    const isActive = pathname === item.href
    const Icon = item.icon

    if (item.comingSoon) {
      return (
        <div
          className={cn(
            'group flex items-center rounded-md px-3 py-2 text-sm font-medium text-slate-500 cursor-not-allowed',
            !isCollapsed && 'justify-start'
          )}
          title={`${item.name} - Coming soon`}
        >
          <Icon className="h-5 w-5 flex-shrink-0" />
          {!isCollapsed && (
            <span className="ml-3 truncate">{item.name}</span>
          )}
        </div>
      )
    }

    return (
      <Link
        href={item.href}
        className={cn(
          'group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
          isActive
            ? 'bg-slate-100 text-slate-900'
            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
          !isCollapsed && 'justify-start'
        )}
      >
        <Icon className="h-5 w-5 flex-shrink-0" />
        {!isCollapsed && (
          <span className="ml-3 truncate">{item.name}</span>
        )}
      </Link>
    )
  }

  const NavSection = ({ 
    title, 
    items, 
    isCollapsed 
  }: { 
    title: string
    items: Array<{ name: string; href: string; icon: any; comingSoon?: boolean }>
    isCollapsed?: boolean
  }) => (
    <div className="mb-6">
      {!isCollapsed && (
        <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
          {title}
        </h3>
      )}
      <div className="space-y-1">
        {items.map((item) => (
          <NavItem key={item.name} item={item} isCollapsed={isCollapsed} />
        ))}
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="lg:hidden fixed left-4 top-4 z-50 rounded-md bg-white p-2 shadow-md border border-slate-200"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </button>

      {/* Backdrop for mobile */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-64 transform bg-white border-r border-slate-200 transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-auto',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center border-b border-slate-200 px-6">
            <Link href="/dashboard" className="text-lg font-semibold text-slate-900">
              JOB APPLICATION PLATFORM
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <NavSection title="" items={navigation} />
            <NavSection title="Workspace" items={workspaceNav} />
            <NavSection title="Tools" items={toolsNav} />
            <NavSection title="Insights" items={insightsNav} />
            <NavSection title="Account" items={accountNav} />
          </nav>

          {/* User section */}
          <div className="border-t border-slate-200 p-4">
            <div className="flex items-center">
              <Avatar name={userName} size="sm" />
              <div className="ml-3 flex-1 min-w-0">
                <p className="truncate text-sm font-medium text-slate-900">
                  {userName || 'User'}
                </p>
                <p className="truncate text-xs text-slate-500">
                  {userEmail}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onLogout}
                className="h-8 w-8 text-slate-500 hover:text-slate-700"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
