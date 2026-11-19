// Third-party Imports
import { MinusIcon, PlusIcon } from 'lucide-react'

// Component Imports
import Eyebrow from '@/components/shared/eyebrow/eyebrow'
import { Accordion, AccordionItem, AccordionPanel, AccordionTrigger } from '@/components/ui/accordion'

const AREAS = [
  {
    title: 'Machine learning in production',
    proof: 'BTIS classifier · Fraud Triage',
    tools: ['scikit-learn', 'LightGBM', 'SHAP', 'Calibration'],
    description:
      'Turning a model score into a decision people can trust: calibrated probabilities, confidence thresholds that route hard cases to humans, and evaluation on time-based splits so results hold up on future data.'
  },
  {
    title: 'Backend services & APIs',
    proof: 'Retail Labs · Cost Melt',
    tools: ['FastAPI', 'REST', 'Redis', 'Docker'],
    description:
      'Designing endpoints and the layers behind them: caching, routing, aggregation queries and per-request cost tracking, packaged so the service is easy to run and easy to reason about.'
  },
  {
    title: 'Data pipelines & databases',
    proof: 'BTIS ETL · Retail Labs parsing',
    tools: ['PostgreSQL', 'Pandas', 'SQLAlchemy', 'DuckDB'],
    description:
      'Schemas and indexes tuned for how data is actually queried, ETL with validation and error handling, and pipelines that turn unstructured documents into clean, normalized records.'
  },
  {
    title: 'Full-stack tools for real users',
    proof: 'Fraud Triage review app · ReachScout',
    tools: ['Next.js', 'TypeScript', 'Supabase', 'Playwright'],
    description:
      'The interface that makes a backend useful: an analyst review queue, a research assistant with evidence for every claim, and browser tests that keep both working.'
  }
]

const Services = () => {
  return (
    <section id='skills' className='border-b py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:space-y-16 lg:px-10.5'>
        <div className='space-y-2'>
          <Eyebrow>Where I can help</Eyebrow>
          <h2 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>What I&apos;d bring to your team</h2>
        </div>

        <Accordion className='divide-y'>
          {AREAS.map((area, index) => (
            <AccordionItem key={area.title} value={index}>
              <AccordionTrigger className='text-primary text-lg sm:text-xl lg:text-[26px]'>
                <span>
                  {index + 1}. {area.title}
                </span>
                <span className='bg-card relative flex size-6 shrink-0 items-center justify-center overflow-hidden rounded-full'>
                  <PlusIcon className='text-accent size-4 rotate-0 opacity-100 transition-all duration-300 group-data-panel-open:rotate-90 group-data-panel-open:opacity-0' />
                  <MinusIcon className='text-accent absolute size-4 -rotate-90 opacity-0 transition-all duration-300 group-data-panel-open:rotate-0 group-data-panel-open:opacity-100' />
                </span>
              </AccordionTrigger>
              <AccordionPanel>
                <div className='mt-2 space-y-4'>
                  <p className='text-sm font-medium tracking-wide uppercase'>Shown in: {area.proof}</p>
                  <p className='mb-1 flex flex-wrap items-center gap-3 text-sm font-medium tracking-wide uppercase'>
                    {area.tools.map((tool, toolIndex) => (
                      <span key={tool} className='flex items-center gap-2'>
                        {tool}
                        {toolIndex < area.tools.length - 1 && <span className='text-accent'>✦</span>}
                      </span>
                    ))}
                  </p>
                  <p className='text-muted-foreground max-w-3xl text-base'>{area.description}</p>
                </div>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

export default Services
