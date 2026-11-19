// Third-party Imports
import { DownloadIcon, MailIcon, MapPinIcon } from 'lucide-react'

// Component Imports
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Eyebrow from '@/components/shared/eyebrow/eyebrow'
import ContactForm from '@/components/contact/contact-form/contact-form'
import GithubIcon from '@/assets/svg/github-icon'
import LinkedinIcon from '@/assets/svg/linkedin-icon'

// Data Imports
import { PROFILE } from '@/lib/profile'

const LINKS = [
  { label: 'Email', value: PROFILE.email, href: `mailto:${PROFILE.email}`, icon: MailIcon, external: false },
  { label: 'LinkedIn', value: 'in/davidmeltonyan', href: PROFILE.linkedin, icon: LinkedinIcon, external: true },
  { label: 'GitHub', value: 'github.com/dmeltonyan', href: PROFILE.github, icon: GithubIcon, external: true }
]

const ContactHero = () => {
  return (
    <section className='border-b py-8 max-sm:pt-20 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-245 space-y-10 px-4 sm:px-6 lg:space-y-16 lg:px-10.5'>
        <div className='max-w-2xl space-y-2'>
          <Eyebrow>Contact me</Eyebrow>
          <h1 className='text-2xl font-semibold sm:text-3xl lg:text-[36px]'>
            Hiring, have a question about a project, or just want to talk shop? I&apos;ll reply within a day.
          </h1>
        </div>

        <div className='grid gap-8 lg:grid-cols-2'>
          <ContactForm className='order-2 lg:order-1' />

          <Card className='ring-border order-1 h-fit gap-6 rounded-3xl p-6 shadow-lg lg:order-2'>
            <CardContent className='space-y-6 p-0'>
              <div className='flex items-center gap-4'>
                <img src='/images/avatar.png' alt={PROFILE.name} className='size-16 rounded-full' />
                <div className='space-y-1'>
                  <p className='text-lg font-medium'>{PROFILE.name}</p>
                  <p className='text-muted-foreground'>{PROFILE.role}</p>
                  <p className='text-muted-foreground flex items-center gap-1 text-sm'>
                    <MapPinIcon className='size-3.5' /> {PROFILE.location} · open to relocation
                  </p>
                </div>
              </div>

              <Badge
                variant='outline'
                className='bg-card h-7 gap-1.5 rounded-full px-3 text-sm text-green-600 shadow-sm dark:text-green-400'
              >
                <span className='relative inline-flex size-1.5'>
                  <span className='absolute -inset-0.5 animate-[ping_1.8s_cubic-bezier(0,0,0.2,1)_infinite] rounded-full bg-green-600/40 opacity-75 dark:bg-green-400/40' />
                  <span className='relative inline-flex size-1.5 rounded-full bg-green-600 dark:bg-green-400' />
                </span>
                {PROFILE.availability}
              </Badge>

              <div className='divide-border divide-y rounded-2xl bg-(--background-darker)'>
                {LINKS.map(({ label, value, href, icon: Icon, external }) => (
                  <a
                    key={label}
                    href={href}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className='hover:text-accent flex items-center gap-3 px-4 py-3 transition-colors'
                  >
                    <Icon className='text-accent size-4 shrink-0' />
                    <span className='text-muted-foreground w-20 text-sm'>{label}</span>
                    <span className='truncate text-sm font-medium'>{value}</span>
                  </a>
                ))}
              </div>

              <Button
                variant='outline'
                className='hover:text-accent h-11 w-full gap-2 rounded-full text-base'
                render={<a href={PROFILE.resume} download='David-Meltonyan-Resume.pdf' />}
                nativeButton={false}
              >
                <DownloadIcon className='size-4' />
                Download resume (PDF)
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default ContactHero
