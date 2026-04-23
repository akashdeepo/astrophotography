# Deep Field

Personal astrophotography journal — Akash Deep's progress notes, processed from a Pixel 9 Pro XL under Lubbock skies. Built with Astro + Tailwind v4, deployed to GitHub Pages.

Live: https://akashdeepo.github.io/astrophotography/

---

## Quickstart

```bash
npm install        # one-time
npm run dev        # local dev server at http://localhost:4321/astrophotography/
npm run build      # production build into ./dist
npm run preview    # serve the built site locally
npm run check      # type-check + content schema validation
```

## Adding a new post

Every post is one folder. Drop the folder, drop the images, write the markdown, push. No config, no registry.

1. Create a folder under [src/content/posts/](src/content/posts/) named `YYYY-MM-DD-short-slug/`. The folder name is the URL slug.
2. Put two images in it:
   - `before.jpg` — original phone JPG, straight out of the camera
   - `after.jpg` — your processed final
3. (Optional) Add intermediate stages in a `stages/` subfolder and reference them in frontmatter.
4. Create `index.md` in the folder with frontmatter matching the schema (see the Antares post for a full template). Required fields: `title`, `description`, `capturedAt`, `publishedAt`, `target`, `tags`, `beforeImage`, `afterImage`, `camera`, `exposure`.
5. Run `npm run dev`, check the post renders, push to `main`. GitHub Actions deploys automatically.

### Frontmatter reference

| Field | Required | Notes |
|---|---|---|
| `title` | yes | Post title |
| `description` | yes | ~150-word APOD-style teaser for cards + meta |
| `capturedAt` / `publishedAt` | yes | ISO dates |
| `target` | yes | e.g. `"Antares (α Scorpii)"` |
| `tags` | yes | Array; must be from the closed list in [src/consts.ts](src/consts.ts) |
| `beforeImage` / `afterImage` | yes | Relative path like `"./before.jpg"` |
| `thumbnail` | no | Falls back to `afterImage` |
| `stages` | no | Array of `{image, caption}` |
| `location`, `direction`, `bortle`, `processingNotes` | no | Optional capture/processing context |
| `camera`, `exposure` | yes | |
| `frames` | no | Defaults to `1` |
| `processingSoftware` | no | Array, e.g. `["Siril"]` |
| `featured` | no | `true` pins as homepage hero; otherwise newest post is used |
| `draft` | no | `true` hides from all listings |

### Image tips

- **Resize before committing.** Export processed images at ~3000 px on the long edge, ~90% JPG quality. Astro's `<Image>` handles responsive variants, but the repo only needs one reasonably-sized source.
- **Matching frames.** For the slider to look clean, `before.jpg` and `after.jpg` should share the same aspect ratio and crop. If you crop the processed version, save a copy pre-crop to use as the "after" source.
- The download links on each post point at the files you commit, so whatever you check in is what visitors get.

### Adding a new tag

Edit [src/consts.ts](src/consts.ts) and add the string to both the `TAGS` array and `TAG_LABELS` record. The content schema validates frontmatter tags against this list, so typos fail at build.

## Folder structure

```
.
├── .github/workflows/deploy.yml   # auto-deploy on push to main
├── public/                        # static assets (favicon, og image, etc.)
├── src/
│   ├── components/                # reusable UI pieces
│   ├── content/
│   │   └── posts/                 # ONE FOLDER PER POST — add new ones here
│   │       └── YYYY-MM-DD-slug/
│   │           ├── index.md
│   │           ├── before.jpg
│   │           └── after.jpg
│   ├── content.config.ts          # frontmatter schema (edit to change required fields)
│   ├── layouts/                   # page shells
│   ├── pages/                     # routes (index, archive, about, posts/[slug])
│   ├── styles/global.css          # Tailwind + theme colors/fonts
│   └── consts.ts                  # site title, author, nav, tag list
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

## Deployment

Pushing to `main` triggers [.github/workflows/deploy.yml](.github/workflows/deploy.yml), which builds and publishes to GitHub Pages. One-time setup on GitHub:

1. Repo → Settings → Pages → Source: **GitHub Actions**
2. First push to `main` runs the workflow; check the Actions tab.
3. Site goes live at https://akashdeepo.github.io/astrophotography/

If you ever rename the repo, update `base` in [astro.config.mjs](astro.config.mjs).
