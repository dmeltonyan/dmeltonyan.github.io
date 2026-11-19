import type { JSX } from 'react'

import { CheckIcon } from 'lucide-react'
import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote-client/rsc'
import remarkGfm from 'remark-gfm'

import { cn } from '@/lib/utils'

// Helper function to generate slug from text
function generateSlug(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
}

// Text elements get a centered, narrower column; images/raw JSX blocks stay full-width of the parent.
const PROSE_WIDTH = 'mx-auto w-full max-w-xl'

const components: MDXRemoteProps['components'] = {
  h1: ({ children }) => <h1 className={cn(PROSE_WIDTH, 'text-4xl font-bold')}>{children}</h1>,
  h2: ({ children }) => {
    const slug = generateSlug(children as string)

    return (
      <h2
        id={slug}
        className={cn(PROSE_WIDTH, 'text-accent mt-24 scroll-mt-20 text-xl font-medium italic sm:text-[22px]')}
      >
        {children}
      </h2>
    )
  },
  h3: ({ children }) => {
    const slug = generateSlug(children as string)

    return (
      <h3 id={slug} className={cn(PROSE_WIDTH, 'text-accent mt-6 scroll-mt-20 text-lg font-medium italic sm:text-xl')}>
        {children}
      </h3>
    )
  },
  h4: ({ children }) => {
    const slug = generateSlug(children as string)

    return (
      <h4 id={slug} className={cn(PROSE_WIDTH, 'mt-4 scroll-mt-20 text-lg font-medium')}>
        {children}
      </h4>
    )
  },
  p: ({ children }) => <p className={cn(PROSE_WIDTH, 'mt-2 text-base')}>{children}</p>,
  ul: ({ children }) => <ul className={cn(PROSE_WIDTH, 'mt-4 space-y-3')}>{children}</ul>,
  ol: ({ children }) => (
    <ol className={cn(PROSE_WIDTH, 'mt-4 space-y-3 [counter-reset:step] [&>li]:[counter-increment:step] [&>li>span:first-child]:hidden [&>li]:before:bg-accent [&>li]:before:text-accent-foreground [&>li]:before:flex [&>li]:before:size-5 [&>li]:before:shrink-0 [&>li]:before:items-center [&>li]:before:justify-center [&>li]:before:rounded-full [&>li]:before:text-xs [&>li]:before:font-bold [&>li]:before:content-[counter(step)] [&>li]:before:mt-0.5')}>
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className='bg-card ring-border flex items-start gap-2 rounded-md p-3 ring-1'>
      <span className='bg-accent text-accent-foreground mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full'>
        <CheckIcon className='size-3' />
      </span>
      <span className='text-base font-medium'>{children}</span>
    </li>
  ),
  table: ({ children }) => (
    <div className='ring-border bg-card mx-auto mt-6 w-full max-w-3xl overflow-x-auto rounded-2xl ring-1'>
      <table className='w-full text-left text-sm'>{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className='bg-(--background-darker)'>{children}</thead>,
  tr: ({ children }) => <tr className='border-border border-b last:border-b-0'>{children}</tr>,
  th: ({ children }) => <th className='px-4 py-3 font-medium whitespace-nowrap'>{children}</th>,
  td: ({ children }) => <td className='text-muted-foreground px-4 py-3 whitespace-nowrap tabular-nums'>{children}</td>,
  hr: () => <hr className={cn(PROSE_WIDTH, 'my-6')} />,
  img: ({ src, alt }) => (
    <img src={src as string} alt={(alt as string) ?? ''} className='mt-6 w-full rounded-2xl border shadow-sm' />
  ),
  blockquote: ({ children }) => (
    <blockquote
      className={cn(
        PROSE_WIDTH,
        'border-accent text-foreground mt-6 border-l-2 bg-(--background-darker) p-2 pl-3 text-lg font-medium italic [&_p]:mt-0'
      )}
    >
      {children}
    </blockquote>
  )
}

const MDXContent = (props: JSX.IntrinsicAttributes & MDXRemoteProps) => {
  return (
    <MDXRemote
      {...props}
      options={{ mdxOptions: { remarkPlugins: [remarkGfm] }, ...(props.options || {}) }}
      components={{ ...components, ...(props.components || {}) }}
    />
  )
}

export default MDXContent
