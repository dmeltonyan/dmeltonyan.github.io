// Component Imports
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

// Grouped toolkit, matching the skills section of the resume.
const STACK = [
  { group: 'Languages', items: ['Python', 'TypeScript', 'JavaScript', 'Java', 'SQL'] },
  {
    group: 'ML & data',
    items: ['scikit-learn', 'LightGBM', 'PyTorch', 'TensorFlow', 'Pandas', 'NumPy', 'SHAP', 'BERT embeddings']
  },
  { group: 'Backend', items: ['FastAPI', 'Flask', 'Spring Boot', 'Express', 'Redis', 'REST API design'] },
  { group: 'Data & infra', items: ['PostgreSQL', 'MySQL', 'DuckDB', 'Supabase', 'Docker', 'CI/CD', 'Linux'] },
  { group: 'Frontend & testing', items: ['React', 'Next.js', 'Tailwind CSS', 'pytest', 'Playwright', 'Vitest'] }
]

const ActivityCard = () => {
  return (
    <Card className='ring-border gap-6 rounded-3xl p-6 shadow-lg'>
      <CardContent className='space-y-4 p-0'>
        <div>
          <p className='text-sm font-semibold'>@dmeltonyan</p>
          <p className='text-muted-foreground text-xs opacity-75'>Tools I&apos;ve shipped with at work and in projects</p>
        </div>

        <div className='divide-border divide-y'>
          {STACK.map(row => (
            <div key={row.group} className='flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:gap-6'>
              <p className='text-muted-foreground w-40 shrink-0 text-sm'>{row.group}</p>
              <div className='flex flex-wrap gap-2'>
                {row.items.map(item => (
                  <Badge
                    key={item}
                    variant='secondary'
                    className='text-foreground h-6 rounded-full bg-(--background-darker) px-2.5 text-sm font-normal'
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default ActivityCard
