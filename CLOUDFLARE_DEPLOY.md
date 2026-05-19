# Cloudflare Pages Deployment Guide

## Recommended: GitHub + Cloudflare Pages

1. Use the GitHub repository `kooyou/space-adventure-game`.
2. Upload only the files inside this `SpaceAdventure` folder, or set this folder as the Pages root directory if using a monorepo.
3. In Cloudflare Dashboard, open **Workers & Pages**.
4. Choose **Create application**.
5. Choose **Pages**.
6. Choose **Connect to Git**.
7. Select your GitHub repository.
8. Use these build settings:

```text
Framework preset: None
Build command: leave blank
Build output directory: /
Root directory: leave blank
```

9. Deploy.
10. Open the generated `*.pages.dev` URL and test:
    - Game start
    - Meteor clicks
    - Knowledge card transition
    - Privacy, Parents, Advertising, and Terms pages

## Alternative: Direct Upload

Cloudflare Pages also supports Direct Upload. Upload all files in this folder:

```text
index.html
game.js
styles.css
privacy.html
parents.html
ads.html
terms.html
robots.txt
sitemap.xml
_headers
```

## Custom Domain

After the Pages project works:

1. Add `yapiyapi.fun` as the custom domain in Cloudflare Pages.
2. Confirm every sitemap URL uses `https://yapiyapi.fun`.
3. Keep `robots.txt` pointing to `/sitemap.xml`.

## Before Google Ads

Do not enable live ads until:

1. AdSense site approval is complete.
2. `ads.txt` uses your real publisher ID.
3. Child-directed treatment and non-personalized ads are configured where required.
4. A Google-certified CMP is configured for EEA, UK, and Switzerland traffic where required.
5. The Content Security Policy in `_headers` is updated to allow the required Google ad domains.

## GitHub Account Safety

Do not publish or share your GitHub password. Use GitHub browser login, GitHub Desktop, or a personal access token if command-line authentication is needed.
