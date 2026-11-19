import type { ReactNode } from 'react'

import localFont from 'next/font/local'
import type { Metadata } from 'next'

import { ThemeProvider } from '@/components/theme-provider'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/sonner'
import CustomCursor from '@/components/layout/custom-cursor'
import EdgeBlur from '@/components/layout/edge-blur'


import { cn } from '@/lib/utils'
import { PROFILE } from '@/lib/profile'

import './globals.css'

const geistMono = localFont({
  variable: '--font-geist-mono',
  display: 'swap',
  src: [
    { path: '../assets/fonts/geist-mono/GeistMono-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../assets/fonts/geist-mono/GeistMono-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../assets/fonts/geist-mono/GeistMono-SemiBold.woff2', weight: '600', style: 'normal' }
  ]
})

const deliciousHandrawn = localFont({
  variable: '--font-delicious-handrawn',
  display: 'swap',
  src: [{ path: '../assets/fonts/handrawn/delicious-handrawn-latin-400-normal.woff2', weight: '400', style: 'normal' }]
})

const satoshi = localFont({
  variable: '--font-satoshi',
  display: 'swap',
  src: [
    { path: '../assets/fonts/satoshi/satoshi-400.woff2', weight: '400', style: 'normal' },
    { path: '../assets/fonts/satoshi/satoshi-500.woff2', weight: '500', style: 'normal' },
    { path: '../assets/fonts/satoshi/satoshi-700.woff2', weight: '700', style: 'normal' },
    { path: '../assets/fonts/satoshi/satoshi-900.woff2', weight: '900', style: 'normal' }
  ]
})

const TITLE = `${PROFILE.name} · ${PROFILE.role}`

export const metadata: Metadata = {
  title: {
    template: `%s · ${PROFILE.name}`,
    default: TITLE
  },
  description: PROFILE.description,
  robots: 'index,follow',
  keywords: ['David Meltonyan', 'software engineer', 'machine learning engineer', 'backend engineer', 'new grad', 'Sacramento'],
  authors: [{ name: PROFILE.name, url: PROFILE.url }],
  icons: {
    icon: [
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon.ico', sizes: '48x48', type: 'image/x-icon' }
    ],
    apple: [{ url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }]
  },
  metadataBase: new URL(PROFILE.url),
  alternates: { canonical: `${PROFILE.url}/` },
  openGraph: {
    title: TITLE,
    description: PROFILE.description,
    type: 'website',
    siteName: PROFILE.name,
    url: PROFILE.url,
    images: [{ url: '/images/og-image.png', type: 'image/png', width: 1200, height: 630, alt: TITLE }]
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: PROFILE.description,
    images: ['/images/og-image.png']
  }
}

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <html
      lang='en'
      className={cn(
        geistMono.variable,
        satoshi.variable,
        deliciousHandrawn.variable,
        'flex min-h-full w-full scroll-smooth antialiased'
      )}
      suppressHydrationWarning
    >
      <body className='flex min-h-full w-full flex-auto flex-col'>
        <ThemeProvider attribute='class' enableSystem={false} disableTransitionOnChange>
          <TooltipProvider>{children}</TooltipProvider>
          <EdgeBlur />
          <Toaster />
          <CustomCursor />

        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout
