'use client'

import { Bell, ChevronDown } from 'lucide-react'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface HeaderProps {
  pageTitle: string
  userName: string
  userEmail: string
  onLogout: () => void
}

export function Header({ pageTitle, userName, userEmail, onLogout }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
      <div className="flex items-center lg:hidden">
        {/* Spacer for mobile menu button */}
        <div className="w-10" />
      </div>

      <h1 className="text-lg font-semibold text-slate-900 hidden lg:block">
        {pageTitle}
      </h1>

      <div className="flex items-center space-x-4 ml-auto">
        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="relative text-slate-500 hover:text-slate-700"
          title="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </Button>

        {/* User dropdown */}
        <div className="relative">
          <button className="flex items-center space-x-2 rounded-md p-1 pr-2 hover:bg-slate-50">
            <Avatar name={userName} size="sm" />
            <span className="hidden text-sm font-medium text-slate-700 md:inline-block">
              {userName || 'User'}
            </span>
            <ChevronDown className="h-4 w-4 text-slate-500" />
          </button>

          {/* Dropdown menu - simplified for Day 1 */}
          <div className="absolute right-0 mt-2 w-48 rounded-md border border-slate-200 bg-white py-1 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
            <Link
              href="/profile"
              className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              Profile
            </Link>
            <Link
              href="/settings"
              className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              Settings
            </Link>
            <button
              onClick={onLogout}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-50"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
