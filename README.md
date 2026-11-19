# meltonyan.dev

Portfolio of David Meltonyan, ML and backend engineer. Live at **https://meltonyan.dev**.

Built with Next.js (static export), Tailwind CSS and shadcn/ui, based on the MIT-licensed
[Zolt template](https://github.com/shadcnstudio/shadcn-nextjs-zolt-landing-page-free).

## Editing content

| What | Where |
| --- | --- |
| Name, role, email, links, availability | `src/lib/profile.ts` |
| Projects (case studies) | `src/content/case-studies/*.mdx`. Frontmatter sets the title, card image, `liveUrl`, `repoUrl` and `order` |
| Experience timeline | `src/components/home/experience/experience.tsx` |
| Toolkit badges | `src/components/home/experience/activity-card.tsx` |
| About section | `src/components/home/about/about.tsx` |
| Resume | replace `public/resume.pdf` |
| Images | `public/images/` |

## Run locally

```bash
corepack enable
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # static site in out/
```

## Deploying

Every push to `main` builds the site and publishes it to GitHub Pages via
`.github/workflows/deploy.yml`. The custom domain comes from `public/CNAME`.
