# Deployment

The site is a static Astro build served by a Cloudflare Worker with static assets
(see `wrangler.jsonc`), on the custom domain `samnicholls.co.uk`.

Every push to `main` runs `.github/workflows/deploy.yml`, which builds the site with Bun and
deploys it with `wrangler deploy`. You can also run it by hand from the GitHub Actions tab, or deploy
from your machine with `bun run deploy`.

## One-time Cloudflare setup

1. **Put the domain on Cloudflare.** In the Cloudflare dashboard, add `samnicholls.co.uk`
   (Free plan is fine) and change the nameservers at your registrar to the two Cloudflare gives you.
   Wait until the domain shows as **Active**.
2. **Clear the apex record.** In **DNS → Records**, delete any existing `A`, `AAAA` or `CNAME`
   record for `samnicholls.co.uk` itself. Cloudflare creates its own record for the Worker and will
   refuse if one exists. Leave `MX`/`TXT` records (email) alone.
3. **Create an API token.** Go to **My Profile → API Tokens → Create Token**, start from the
   **Edit Cloudflare Workers** template, and under _Zone Resources_ pick `samnicholls.co.uk`.
   Also add the permission **Zone → DNS → Edit**, so Wrangler can attach the custom domain.
4. **Find your Account ID.** It is shown in the dashboard's account home, or under
   **Workers & Pages** in the right-hand sidebar.
5. **Add GitHub secrets.** In the GitHub repo, go to **Settings → Secrets and variables → Actions**
   and add:
   - `CLOUDFLARE_API_TOKEN`: the token from step 3
   - `CLOUDFLARE_ACCOUNT_ID`: the ID from step 4
6. **Push to `main`.** The first run creates the `portfolio` Worker and attaches
   `samnicholls.co.uk`. Check the run in the **Actions** tab, then open https://samnicholls.co.uk.

Optional: to make `www.samnicholls.co.uk` work, add a proxied DNS record for `www` and a
**Rules → Redirect Rule** sending it to `https://samnicholls.co.uk`.
