# Hashika Madusankha — Blue Technology Portfolio

A responsive technology-themed personal portfolio built with plain HTML, CSS and JavaScript. No npm or build step needed.

## What's included
- Light/dark mode toggle (preference saved in browser)
- Responsive mobile navigation
- Formal portrait from the provided photo
- About, technology skills, selected projects, education and contact sections
- Five certificates with compact thumbnail cards, hover animations, category filters and full-image modal viewer
- Relative local assets for two newly provided Cisco certificates and the portrait

## Start locally

Option A: Double-click `index.html` in a browser.

Option B (recommended): Open a terminal in this directory and run:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Certificate images

Two certificates (Computer Hardware Basics, Introduction to Cybersecurity) are included as local image files under `assets/`.

The three pre-existing certificates (Networking Basics, Network Defense and Security Operations Fundamentals) are referenced by their actual public image links from the current live portfolio at:

https://hashika-madusankha.brainyteal64.chatgpt.site/

**These three images need internet access** and depend on that original site remaining publicly accessible. For completely offline hosting, download those three original images from the URLs in `index.html` and replace their `src` and `data-img` values with local asset paths.

## Publishing

The existing `chatgpt.site` address has **not** been overwritten or updated by creating this ZIP. It remains the current, published portfolio.

To publish these site files, you can upload the folder's contents to a static host, such as GitHub Pages, Netlify or Cloudflare Pages. To replace the exact existing `chatgpt.site` site instead, open its original ChatGPT site editing workflow and apply the new code/content there, if available. Simply uploading the ZIP here does not modify that live website.

## Customize

- Contact email in `index.html`: search `mailto:`
- Github link: search `github.com`
- Add LinkedIn: add the **verified profile URL** to the contact section (none was assumed)
- Credentials: edit cards under `#certificate-grid`
- Colors: adjust CSS custom properties at the beginning of `styles.css`

All coursework and in-development projects are described as such; no production-ready claims or unverifiable proficiency scores are used.
