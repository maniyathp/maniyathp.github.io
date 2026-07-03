# Deploying to GitHub Pages

1. Create a new repo on GitHub named exactly: `maniyathp.github.io`
2. Push these files (`index.html`, `style.css`, `blog/`) to the root of that repo:

```
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/maniyathp/maniyathp.github.io.git
git push -u origin main
```

3. In the repo's Settings → Pages, set the source to the `main` branch, root folder. GitHub will publish it at `https://maniyathp.github.io/` within a minute or two (it may already be enabled by default given the repo name).

## Editing content

- `index.html` — your main page (about, experience, projects, skills, scope, education).
- `blog/index.html` — the blog listing page. Add a new `<div class="post-list-item">` entry (newest first) for each new post.
- `blog/aegis-zero-trust.html` — sample post. Copy this file as a template for new posts.
- `style.css` — shared styling for every page.

## Notes / things you may want to change

- The avatar is currently just your initials ("PM") in a circle. Swap in a real photo by replacing the `.avatar` div in `index.html` with an `<img>` tag.
- Phone number was left off the public site intentionally (privacy) — email + LinkedIn + GitHub are listed instead.
- The "What I Do / Don't" section is a first draft — adjust the wording to match your own boundaries.
