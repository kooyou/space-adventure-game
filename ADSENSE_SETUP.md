# Google AdSense Launch Checklist

This site is child-directed. Do not add live Google ad code until every item below is complete.

## Required Before Public Launch

1. Confirm `sitemap.xml` uses the final production domain `https://yapiyapi.fun`.
2. Add the final business/operator mailing address to `privacy.html`.
3. Get the real AdSense publisher ID, for example `pub-1234567890123456`.
4. Create `ads.txt` at the site root using the real publisher ID:

```txt
google.com, pub-1234567890123456, DIRECT, f08c47fec0942fa0
```

5. Configure Google ads for child-directed treatment and non-personalized ads where required.
6. Use a Google-certified CMP for EEA, UK, and Switzerland traffic where Google requires it.
7. Do not use personalized ads, remarketing, interest-based targeting, or audience lists on child-directed areas.
8. Place ads only between levels or outside gameplay controls.
9. Review and block ad categories unsuitable for young children.
10. Verify the privacy policy is visible from the homepage.
11. Ask a qualified privacy/ad lawyer to review COPPA, GDPR/UK GDPR, AADC, and AdSense compliance before launch.

## Current Local Status

- No Google ad script is loaded.
- No analytics script is loaded.
- No account, chat, upload, purchase, or server-side child profile exists.
