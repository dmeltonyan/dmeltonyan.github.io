// Next Imports
import Link from 'next/link'

// Third-party Imports
import { ArrowRightIcon, DownloadIcon, MailIcon } from 'lucide-react'

// Component Imports
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Eyebrow from '@/components/shared/eyebrow/eyebrow'
import GithubIcon from '@/assets/svg/github-icon'
import LinkedinIcon from '@/assets/svg/linkedin-icon'

// Data Imports
import { PROFILE } from '@/lib/profile'

const ContactCta = () => {
  return (
    <section id='contact-cta' className='py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-10.5'>
        <Card className='ring-border gap-8 rounded-[28px] p-6 shadow-lg sm:p-10 md:flex-row md:items-end md:justify-between'>
          <div className='max-w-lg space-y-3'>
            <Eyebrow>Let&apos;s talk</Eyebrow>
            <h2 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>Hiring for ML or backend in 2027?</h2>
            <p className='text-muted-foreground text-base'>
              I&apos;m finishing my CS degree in December and can start in January. The fastest way to reach me is
              email.
            </p>
            <p className='font-medium select-all'>{PROFILE.email}</p>
          </div>

          <div className='flex flex-col gap-2.5 sm:min-w-60'>
            <Button
              className='h-11 gap-2 rounded-full text-base'
              render={<Link href='/contact/' />}
              nativeButton={false}
            >
              <MailIcon className='size-4' />
              Send a message
              <ArrowRightIcon className='size-4' />
            </Button>
            <Button
              variant='outline'
              className='hover:text-accent h-11 gap-2 rounded-full text-base'
              render={<a href={PROFILE.resume} download='David-Meltonyan-Resume.pdf' />}
              nativeButton={false}
            >
              <DownloadIcon className='size-4' />
              Download resume
            </Button>
            <div className='flex gap-2.5'>
              <Button
                variant='outline'
                className='hover:text-accent h-11 flex-1 gap-2 rounded-full'
                render={<a href={PROFILE.github} target='_blank' rel='noopener noreferrer' />}
                nativeButton={false}
              >
                <GithubIcon className='size-4' />
                GitHub
              </Button>
              <Button
                variant='outline'
                className='hover:text-accent h-11 flex-1 gap-2 rounded-full'
                render={<a href={PROFILE.linkedin} target='_blank' rel='noopener noreferrer' />}
                nativeButton={false}
              >
                <LinkedinIcon className='size-4' />
                LinkedIn
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}

export default ContactCta
