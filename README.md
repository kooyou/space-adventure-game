# Space Adventure

Space Adventure is a static child-friendly browser game for ages 4-8.

Children clear meteors, collect star fuel, unlock space knowledge cards, and learn simple AI ideas such as examples, classification, and human guidance.

## Features

- Static HTML, CSS, and JavaScript.
- No server required.
- No account, login, chat, uploads, purchases, camera, microphone, or child profile.
- Parent, privacy, advertising, and terms pages included.
- Prepared for Cloudflare Pages hosting.

## Local Preview

```powershell
python -m http.server 5192 --bind 127.0.0.1
```

Then open:

```text
http://127.0.0.1:5192/
```

## Cloudflare Pages

Recommended settings:

- Framework preset: `None`
- Build command: leave blank
- Build output directory: `/`
- Root directory: `SpaceAdventure` if this folder stays inside a larger repository

See `CLOUDFLARE_DEPLOY.md` for the full checklist.

## Advertising

This local version does not load Google ad scripts. Before enabling ads, complete `ADSENSE_SETUP.md`, add the real domain, add the real AdSense publisher ID, create `ads.txt`, and configure child-directed, non-personalized ads where required.
