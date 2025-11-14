# Panamerican Taekwondo Academy — Static Landing

This repository previously contained a WordPress-generated site. This pull request replaces the WordPress-heavy index.html with a simple static landing page and adds instructions for deploying via GitHub Pages.

How to publish with GitHub Pages:

1. Merge this pull request into the branch you want to publish (commonly `main`).
2. In the repository Settings → Pages, choose to publish the site from the branch root (e.g. `main` / `/ (root)`).
3. The site will be served at `https://<your-github-username>.github.io/<repo>/` or (if using an organization/user site) at the root domain.

Notes:
- This PR only replaces `index.html` at the repository root and adds `.nojekyll` so GitHub Pages serves files without Jekyll processing.
- There may still be other WordPress files and folders (`wp-content`, `wp-includes`, `wp-admin`, plugin files). Removing them is optional but recommended if you no longer intend to host WordPress in this repo. Removing them should be done with care.
- Customize `index.html` (styles, images, content) as needed. If you want I can add an `assets/` folder and move inline CSS into a separate file.
