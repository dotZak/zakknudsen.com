# zakknudsen.com

Plain HTML and CSS. No JavaScript. No build step.

## Layout

- `index.html`: home
- `work/`: index, plus one folder per case study
- `about/`, `labs/`, `404.html`
- `css/style.css`: all styles and design tokens
- `img/`: favicon and three SVG diagrams (the SVG files are the source)
- `robots.txt`, `sitemap.xml`, `CNAME`, `.nojekyll`

## Preview

    python3 serve.py

Open http://localhost:8000/. Do not open the HTML files directly from disk. Links use root-relative paths, so they need a web root.

`serve.py` mimics GitHub Pages. Folder URLs serve `index.html`. Missing pages serve `404.html` with a 404 status. Pass a port to change it: `python3 serve.py 9000`.

## Host on GitHub Pages

1. Push the repository to GitHub.
2. In Settings, Pages, deploy from the `main` branch, root folder.
3. The `CNAME` file sets the custom domain `zakknudsen.com`.
4. At Cloudflare, add four A records for the apex pointing to GitHub's Pages IPs, and a CNAME for `www`. Set them to DNS only. Do not touch the MX, SPF, DKIM, or DMARC records.
5. Turn on "Enforce HTTPS" once the certificate is issued.

## Editing

- Dark mode follows the visitor's system setting.
- Update `sitemap.xml` when a page is added.
- Hidden until a fact is confirmed: LinkedIn link, CV PDF link, Smallchat lab, Spanish pages.
