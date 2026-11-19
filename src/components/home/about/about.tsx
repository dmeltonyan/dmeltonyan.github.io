// Third-party Imports
import { BrainCircuitIcon, DatabaseIcon, GraduationCapIcon, ServerIcon } from 'lucide-react'

// Component Imports
import { Card, CardContent } from '@/components/ui/card'
import Eyebrow from '@/components/shared/eyebrow/eyebrow'

const STATS = [
  { value: '3', label: 'technical internships in ML, backend and automation' },
  { value: '691+', label: 'insurance class codes my BTIS classifier maps to' },
  { value: '~40%', label: 'less manual underwriting review after it shipped' },
  { value: '66%', label: 'lower fraud cost than probability-ranked review in Fraud Triage' }
]

const FOCUS = [
  {
    icon: BrainCircuitIcon,
    title: 'Applied ML',
    text: 'Classification, calibration and cost-aware decisions. Models judged by what they change, not just their scores.'
  },
  {
    icon: ServerIcon,
    title: 'Backend systems',
    text: 'FastAPI services, REST APIs, Redis caching and the plumbing that keeps them fast and observable.'
  },
  {
    icon: DatabaseIcon,
    title: 'Data engineering',
    text: 'PostgreSQL schema design, ETL jobs with validation, and pipelines that turn messy documents into clean data.'
  }
]

const About = () => {
  return (
    <section id='about' className='border-b py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:space-y-16 lg:px-10.5'>
        <div className='space-y-2'>
          <Eyebrow>About me</Eyebrow>
          <h2 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>I like models that leave the notebook</h2>
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-[380px_1fr]'>
          <Card className='ring-border gap-5 rounded-[24px] p-6 shadow-lg'>
            <CardContent className='space-y-5 p-0 text-base'>
              <p>
                Most of my work starts where a model&apos;s output has to become a decision someone acts on: which
                insurance class code applies, which transaction an analyst should check, which LLM is cheap enough for
                a prompt.
              </p>
              <p className='text-muted-foreground'>
                At BTIS I replaced a fully manual underwriting step with a classifier that knows when to ask a human.
                On my own time I build end-to-end projects with tests, decision logs and live demos, so the reasoning
                is as easy to check as the code.
              </p>
              <div className='flex items-start gap-3 rounded-2xl bg-(--background-darker) p-4'>
                <GraduationCapIcon className='text-accent mt-0.5 size-5 shrink-0' />
                <p className='text-sm'>
                  <span className='font-medium'>B.S. Computer Science, Sacramento State</span>
                  <span className='text-muted-foreground'> · Dec 2026</span>
                  <br />
                  <span className='font-medium'>M.S. Computer Science, Georgia Tech (OMSCS)</span>
                  <span className='text-muted-foreground'> · starting Spring 2027</span>
                </p>
              </div>
            </CardContent>
          </Card>

          <div className='grid gap-4'>
            <div className='grid grid-cols-2 gap-4'>
              {STATS.map(stat => (
                <Card key={stat.label} className='ring-border gap-1 rounded-[20px] p-5 shadow-none'>
                  <p className='text-accent text-3xl font-bold tracking-tight lg:text-[40px] lg:leading-tight'>{stat.value}</p>
                  <p className='text-muted-foreground text-sm leading-snug'>{stat.label}</p>
                </Card>
              ))}
            </div>

            <Card className='ring-border gap-0 rounded-[24px] bg-(--background-darker) p-0 shadow-none'>
              <CardContent className='divide-border grid divide-y p-0 sm:grid-cols-3 sm:divide-x sm:divide-y-0'>
                {FOCUS.map(({ icon: Icon, title, text }) => (
                  <div key={title} className='space-y-2 p-5'>
                    <div className='bg-card flex size-10 items-center justify-center rounded-xl shadow-sm'>
                      <Icon className='text-accent size-5' />
                    </div>
                    <p className='text-base font-medium'>{title}</p>
                    <p className='text-muted-foreground text-sm'>{text}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
