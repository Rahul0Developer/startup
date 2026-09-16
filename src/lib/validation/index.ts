import { z } from 'zod'

export const signupSchema = z.object({
  full_name: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirm_password: z.string(),
}).refine((data) => data.password === data.confirm_password, {
  message: "Passwords don't match",
  path: ['confirm_password'],
})

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
})

export const profileSchema = z.object({
  full_name: z.string().min(2, 'Full name must be at least 2 characters').optional(),
  professional_title: z.string().max(100).optional(),
  phone: z.string().optional(),
  location: z.string().optional(),
  bio: z.string().max(500).optional(),
  linkedin_url: z.string().url().startsWith('https://www.linkedin.com/', 'Invalid LinkedIn URL').or(z.literal('')).optional(),
  github_url: z.string().url().startsWith('https://github.com/', 'Invalid GitHub URL').or(z.literal('')).optional(),
  portfolio_url: z.string().url().or(z.literal('')).optional(),
  leetcode_url: z.string().url().startsWith('https://leetcode.com/', 'Invalid LeetCode URL').or(z.literal('')).optional(),
  codeforces_url: z.string().url().startsWith('https://codeforces.com/', 'Invalid Codeforces URL').or(z.literal('')).optional(),
  hackerrank_url: z.string().url().startsWith('https://www.hackerrank.com/', 'Invalid HackerRank URL').or(z.literal('')).optional(),
  kaggle_url: z.string().url().startsWith('https://www.kaggle.com/', 'Invalid Kaggle URL').or(z.literal('')).optional(),
})

export const urlSchemas = {
  linkedin: /^https:\/\/(www\.)?linkedin\.com\/.*/,
  github: /^https:\/\/github\.com\/.*/,
  portfolio: /^https?:\/\/.*/,
  leetcode: /^https:\/\/(www\.)?leetcode\.com\/.*/,
  codeforces: /^https:\/\/(www\.)?codeforces\.com\/.*/,
  hackerrank: /^https:\/\/(www\.)?hackerrank\.com\/.*/,
  kaggle: /^https:\/\/(www\.)?kaggle\.com\/.*/,
}
