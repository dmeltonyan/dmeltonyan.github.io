export const dynamic = "force-static"
import type { MetadataRoute } from 'next'

import { getCaseStudies } from '@/lib/case-studies'
import { PROFILE } from '@/lib/profile'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const caseStudies = await getCaseStudies()

  const routes = [
    '/',
    '/contact/',
    ...caseStudies.map(caseStudy => `/case-study/${caseStudy.slug}/`)
  ]

  return routes.map(route => ({
    url: `${PROFILE.url}${route}`
  }))
}
