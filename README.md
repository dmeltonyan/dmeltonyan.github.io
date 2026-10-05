# dmeltonyan.github.io

Personal portfolio for David Meltonyan. Plain HTML, CSS, and JavaScript with no build step and no dependencies.

## Files

| File | Purpose |
| --- | --- |
| `data.js` | **All site content.** Edit this to change any text, link, project, or job. |
| `index.html` | Page shell, SEO metadata, structured data, no-JavaScript fallback |
| `app.js` | Renders content from `data.js`, case study pages, copy email, analytics hooks |
| `styles.css` | All styling |
| `resume.pdf` | Served by every View Resume and Download Resume button |
| `og-image.png` | Preview image shown when the link is shared on LinkedIn, Slack, or iMessage |
| `favicon.svg`, `robots.txt`, `sitemap.xml` | Browser icon and search engine files |

## Editing content

Open `data.js`. Any field set to `null` is hidden automatically, so the site never shows a broken link or an empty section. Search the file for `TODO` to find what still needs your input.

To add a live demo, replace `demo: null` with the URL. To add a project, copy an existing entry in `projects` and change it. Case study sections (`challenges`, `results`, `improve`) only appear when they have content.

To replace the resume, upload a new file named exactly `resume.pdf`.

## Deploying to GitHub Pages

1. Create a public repository named exactly `dmeltonyan.github.io`.
2. Upload every file in this folder to the top level of the repository (not inside a subfolder).
3. In the repository, go to Settings, then Pages. Set Source to "Deploy from a branch," choose `main` and `/ (root)`, and save.
4. The site goes live at https://dmeltonyan.github.io within a few minutes.

To update later, upload the changed files with Add file, then Upload files. Uploading a file with the same name replaces it.

## Case study links

Case studies have shareable URLs:

- https://dmeltonyan.github.io/#project/costmelt
- https://dmeltonyan.github.io/#project/noteloop

## Analytics

Nothing is tracked by default. Every important link has a `data-track` attribute, and clicks fire a `portfolio:track` browser event:

| Event | Fired when someone |
| --- | --- |
| `resume_view` | Opens the resume |
| `resume_download` | Downloads the resume |
| `email_click` | Clicks an email link |
| `email_copy` | Copies the email address |
| `github_click`, `linkedin_click` | Opens GitHub or LinkedIn |
| `project_code_click`, `project_demo_click` | Opens a project's code or demo |
| `case_study_open`, `case_study_view` | Opens a case study |

Each event includes a `source` (hero, nav, contact, case_study) or `project` where relevant.

To connect a privacy-friendly provider such as Plausible or GoatCounter later, add its script to `index.html`, then add this before `app.js`:

```html
<script>
  window.portfolioAnalytics = function (name, props) {
    // Example for Plausible:
    // window.plausible && window.plausible(name, { props: props });
  };
</script>
```
