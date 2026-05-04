# Portfolio · Joel Wong

Space-themed personal portfolio site. Plain HTML / CSS / JS (no build step,
no framework). Just open it in VS Code and run.

---

## Quick start

1. **Open this folder in VS Code.**
   `File → Open Folder → portfolio`. Open the **whole folder**, not a single file —
   the relative paths to `css/`, `js/`, and `assets/` only work when VS Code
   knows the project root.

2. **Install the Live Server extension.**
   The first time you open the folder, VS Code will prompt you with the
   "Recommended Extensions" notice (because of `.vscode/extensions.json`).
   Click **Install** — or open the Extensions panel manually and search for
   *Live Server* by **Ritwick Dey**.

3. **Launch the site.**
   Right-click `index.html` in the file tree → **Open with Live Server**.
   A browser tab opens at something like `http://127.0.0.1:5500/`.
   Save any file in VS Code and the page auto-reloads.

> **Why not just double-click `index.html`?**
> Browsers restrict JavaScript on `file://` URLs and some relative paths fail
> silently. Live Server runs a tiny web server on your machine so the site
> behaves exactly as it would when deployed — including project page links.

---

## Folder structure

```
portfolio/
├── index.html                 ← homepage
├── project.html               ← project detail page (uses ?id=01, ?id=02 …)
├── README.md
├── .vscode/
│   └── extensions.json        ← recommends Live Server when folder opens
├── css/
│   ├── styles.css             ← homepage styling (skills, projects, etc.)
│   └── project.css            ← project detail page styling
├── js/
│   ├── cursor.js              ← custom dot cursor + magnetic hover
│   ├── stars.js               ← background starfield + shooting stars
│   ├── intro.js               ← boot-up loading sequence
│   ├── landing.js             ← hero typewriter
│   ├── planets.js             ← skills solar system (orbits, parallax)
│   ├── main.js                ← scroll reveal + nav glue
│   └── project.js             ← project page data + page hydration
└── assets/
    ├── logos/                 ← skill planet decals (Maya, HTML5, …)
    └── projects/
        ├── convinight/                       ← FILE 01 screenshots
        └── world-without-assumption/         ← FILE 02 screenshots
```

---

## Adding a new project

The homepage shows two project cards (FILE 01 and FILE 02). Templates for
FILE 03 and FILE 04 are commented out at the bottom of the projects section
in `index.html`, ready to uncomment.

To add a third project:

1. **Drop screenshots** into `assets/projects/your-project-name/`.
   JPG or PNG, longest edge ≤ 1600px is plenty.

2. **Add the data entry** in `js/project.js`. Find the `'02': { ... }` block
   for World Without Assumption and copy it over the existing `'03'` placeholder
   in the same file. Update every field — title, role, timeline, banner, overview,
   process steps, outcome, tools, links, credits, gallery image paths.

3. **Uncomment the FILE 03 card** in `index.html` (at the bottom of
   `<section class="module" id="projects">`). Update the year, title, description,
   and tags to match the new project.

4. **Bump the stat.** In the About section of `index.html`, change the
   "02 Projects Launched" number to "03".

That's it — Live Server will reload, and clicking the new card will load the
project detail page populated from `js/project.js`.

---

## Customising existing content

| What you want to change          | File to edit                         |
| -------------------------------- | ------------------------------------ |
| About me text / stats            | `index.html` (search for `id="about"`) |
| Skill planet labels / descriptions | `index.html` (search for `class="planet planet-1"`) |
| Skill planet logos                | replace files in `assets/logos/`      |
| Skill planet textures             | `css/styles.css` (search for `.planet-surface.metallic`) |
| Skill planet orbit speeds / sizes | `js/planets.js` (the `planets` array near top) |
| Work experience timeline          | `index.html` (search for `id="experience"`) |
| Achievements list                 | `index.html` (search for `id="achievements"`) |
| Footer / contact links            | `index.html` (bottom of file)         |
| Color palette                     | `css/styles.css` (CSS variables at top) |

---

## Deploying

When you're ready to put it online, the whole folder is deploy-as-is.
Drag-and-drop friendly options:

- **Netlify Drop** — go to [app.netlify.com/drop](https://app.netlify.com/drop),
  drag the `portfolio` folder onto the page, get a live URL in 30 seconds.
- **GitHub Pages** — push the folder to a GitHub repo, enable Pages in settings.
- **Vercel** — `vercel deploy` from the folder (after `npm i -g vercel`).

No build step required for any of these — the site is already its own output.
