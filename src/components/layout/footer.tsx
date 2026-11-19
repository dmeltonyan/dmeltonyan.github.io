// Third-party Imports
import { MailIcon } from 'lucide-react'

// Component Imports
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import GithubIcon from '@/assets/svg/github-icon'
import LinkedinIcon from '@/assets/svg/linkedin-icon'

// Data Imports
import { PROFILE } from '@/lib/profile'

const socials = [
  { label: 'GitHub', href: PROFILE.github, icon: GithubIcon, external: true },
  { label: 'Email', href: `mailto:${PROFILE.email}`, icon: MailIcon, external: false },
  { label: 'LinkedIn', href: PROFILE.linkedin, icon: LinkedinIcon, external: true }
]

const Footer = () => {
  return (
    <footer className='lg:px-10.5'>
      <div className='mx-auto max-w-4xl space-y-10 pb-28 lg:border-x lg:pb-12 xl:max-w-245'>
        <div className='flex items-center gap-3'>
          <Separator className='flex-1' />
          <div className='flex items-center gap-3'>
            {socials.map(({ label, href, icon: Icon, external }) => (
              <Button
                key={label}
                variant='outline'
                size='icon'
                aria-label={label}
                className='hover:bg-muted/5 hover:text-accent min-w-10 rounded-md'
                render={<a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} />}
                nativeButton={false}
              >
                <Icon className='size-4' />
              </Button>
            ))}
          </div>
          <Separator className='flex-1' />
        </div>

        <div className='space-y-2 text-center'>
          <p className='font-handrawn text-accent text-4xl'>David Meltonyan</p>
          <p className='text-muted-foreground text-xs'>
            © {new Date().getFullYear()} David Meltonyan · Built with Next.js, based on the MIT-licensed{' '}
            <a
              href='https://github.com/shadcnstudio/shadcn-nextjs-zolt-landing-page-free'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-foreground underline underline-offset-2'
            >
              Zolt template
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
