import type { Metadata } from 'next'

// Component Imports
import ContactHero from '@/components/contact/contact-hero/contact-hero'
import FeaturedWorks from '@/components/shared/featured-works/featured-works'

// Data Imports
import { getCaseStudies } from '@/lib/case-studies'
import { PROFILE } from '@/lib/profile'

export const metadata: Metadata = {
  title: 'Contact',
  description: `Get in touch with ${PROFILE.name}, ML and backend engineer, open to full-time roles from January 2027.`,
  alternates: {
    canonical: `${PROFILE.url}/contact/`
  }
}

const ContactPage = async () => {
  const caseStudies = await getCaseStudies(2)

  return (
    <>
      <ContactHero />
      <FeaturedWorks
        caseStudies={caseStudies}
        layout='vertical'
        eyebrow='Featured work'
        title='A couple of things I built'
        showBorder={false}
      />
    </>
  )
}

export default ContactPage
