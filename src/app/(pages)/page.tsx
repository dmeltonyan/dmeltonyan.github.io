// Component Imports
import Hero from '@/components/home/hero/hero'
import About from '@/components/home/about/about'
import FeaturedWorks from '@/components/shared/featured-works/featured-works'
import Experience from '@/components/home/experience/experience'
import Services from '@/components/shared/services/services'
import ContactCta from '@/components/shared/contact-cta/contact-cta'

// Data Imports
import { getCaseStudies } from '@/lib/case-studies'
import { PROFILE } from '@/lib/profile'

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${PROFILE.url}/#website`,
      name: PROFILE.name,
      description: PROFILE.description,
      url: PROFILE.url,
      inLanguage: 'en-US'
    },
    {
      '@type': 'Person',
      '@id': `${PROFILE.url}/#person`,
      name: PROFILE.name,
      jobTitle: 'Software Engineer',
      url: PROFILE.url,
      email: `mailto:${PROFILE.email}`,
      alumniOf: 'Sacramento State University',
      sameAs: [PROFILE.github, PROFILE.linkedin]
    }
  ]
}

const Home = async () => {
  const caseStudies = await getCaseStudies()

  return (
    <>
      <Hero />
      <About />
      <FeaturedWorks
        caseStudies={caseStudies}
        title='Projects I built end to end'
        eyebrow='Featured work'
      />
      <Experience />
      <Services />
      <ContactCta />

      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c')
        }}
      />
    </>
  )
}

export default Home
