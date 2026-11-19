// Component Imports
import Eyebrow from '@/components/shared/eyebrow/eyebrow'
import Timeline from '@/components/ui/timeline'
import ActivityCard from './activity-card'
import ExperienceTimelineItem from './experience-timeline-item'

const EXPERIENCES = [
  {
    index: '01',
    logo: '/images/logos/btis.png',
    company: "Builders and Tradesmen's Insurance Services",
    role: 'Machine Learning Intern',
    period: 'June 2025 - October 2025',
    stack: ['Python', 'NLP classification', 'PostgreSQL', 'Pandas', 'SQLAlchemy'],
    achievement: 'Cut manual underwriting review roughly 40% without silent misclassification',
    description:
      'Designed and shipped a classification service that maps plain-English business descriptions to 691+ WCIRB class codes, replacing a fully manual workflow. Confident results auto-resolve and ambiguous ones go to a human. Also designed the PostgreSQL schemas for model outputs and built ETL jobs processing 20K+ records a month.'
  },
  {
    index: '02',
    logo: '/images/logos/retail-labs.png',
    company: 'Retail Labs',
    role: 'Machine Learning / GTM Intern',
    period: 'March 2025 - June 2025',
    stack: ['Python', 'SQL', 'REST APIs', 'Document parsing', 'BI dashboards'],
    achievement: 'Roughly halved analyst turnaround on recurring reports',
    description:
      'Built REST endpoints and SQL aggregation layers serving real-time data to internal dashboards, and pipelines that convert unstructured quarterly reports into normalized JSON for BI tools. Contributed to the backend ingestion services behind the company\'s AI retail agent.'
  },
  {
    index: '03',
    logo: '/images/logos/pcc.png',
    company: 'Pacific Coast Companies',
    role: 'Automation / Test Engineer Intern',
    period: 'November 2024 - March 2025',
    stack: ['Python', 'Synthetic data', 'Test automation', 'SAP SuccessFactors'],
    achievement: 'Regression testing without exposing customer data in lower environments',
    description:
      'Built Python tooling that generates production-like synthetic datasets for regression tests, plus dashboards that surface test-execution anomalies across environments. Co-led automated test coverage for critical SAP SuccessFactors workflows.'
  },
  {
    index: '04',
    logo: '/images/logos/code-ninjas.png',
    company: 'Code Ninjas',
    role: 'Coding Instructor',
    period: 'June 2023 - November 2024',
    stack: ['Python', 'JavaScript', 'Scratch', 'Teaching'],
    achievement: 'Taught programming fundamentals to 100+ students aged 7 to 14',
    description:
      'Taught Python, JavaScript and Scratch, and built the internal progress-tracking dashboard instructors used to follow each student.'
  }
]

const Experience = () => {
  return (
    <section id='experience' className='min-w-0 border-b py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:space-y-16 lg:px-10.5'>
        <div className='space-y-2'>
          <Eyebrow>Stack & Experience</Eyebrow>
          <h2 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>
            What I use and where I learned it
          </h2>
        </div>

        <ActivityCard />

        <Timeline
          data={EXPERIENCES.map(({ index, ...experience }) => ({
            index,
            content: <ExperienceTimelineItem {...experience} />
          }))}
        />
      </div>
    </section>
  )
}

export default Experience
