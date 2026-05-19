# YapiYapi Fun

YapiYapi Fun is a static child-friendly web game collection for ages 4-8.

The first game is Space Adventure. Children clear meteors, collect star fuel, unlock space knowledge cards, and learn simple AI ideas such as examples, classification, and human guidance.

## Features

- Static HTML, CSS, and JavaScript.
- No server required.
- No account, login, chat, uploads, purchases, camera, microphone, or child profile.
- Parent, privacy, advertising, and terms pages included.
- Homepage for a growing game collection.
- Prepared for Cloudflare Pages hosting at `yapiyapi.fun`.

## Local Preview

```powershell
python -m http.server 5192 --bind 127.0.0.1
```

Then open:

```text
http://127.0.0.1:5192/
```

Space Adventure is available at:

```text
http://127.0.0.1:5192/space-adventure.html
```

## Cloudflare Pages

Recommended settings:

- Framework preset: `None`
- Build command: leave blank
- Build output directory: `/`
- Root directory: leave blank when this repository root is deployed

See `CLOUDFLARE_DEPLOY.md` for the full checklist.

## Advertising

This local version does not load Google ad scripts. Before enabling ads, complete `ADSENSE_SETUP.md`, add the real domain, add the real AdSense publisher ID, create `ads.txt`, and configure child-directed, non-personalized ads where required.
