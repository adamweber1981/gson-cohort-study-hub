# GSON Study Hub Push Service (deployment required)

This is an **optional, separately hosted** Node.js service. GitHub Pages cannot run it.

## Setup
1. Provision a PostgreSQL database and run `schema.sql`.
2. Run `npm install` in this directory. Generate VAPID keys locally using `npx web-push generate-vapid-keys`.
3. Configure server secrets: `DATABASE_URL`, `VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`, `VAPID_SUBJECT=mailto:your-admin-email`, `ADMIN_TOKEN` (long random string), `ALLOWED_ORIGIN=https://adamweber1981.github.io`. `PGSSL=false` only for a trusted local database.
4. Deploy the Node server over HTTPS (e.g., Render, Railway, Fly.io). Do **not** put private keys, admin tokens or database credentials in GitHub Pages or client JS.
5. Set public values in `assets/js/push-config.js`: `vapidPublicKey` and `subscriptionEndpoint` (e.g. `https://YOUR-SERVICE/subscriptions`). Add `preferencesEndpoint` and `unsubscribeEndpoint` pointing to the service.
6. Set GitHub Actions repository secrets `PUSH_SERVER_URL` and `PUSH_ADMIN_TOKEN` to enable hourly scheduled dispatch. It only sends during 9 AM America/Chicago and deduplicates by device, exam, offset, and exam date.

## Supported notifications
- Exam reminders at 7, 3 and 1 days, from `assets/notifications/course-exams.json`.
- Administrator announcements: POST `/admin/announce` with Bearer token and JSON `{ "category": "updatedExams"|"newSources"|"majorUpdates", "id": "unique-release-id", "title": "...", "body": "...", "url": "./index.html" }`.
- Student device preferences and unsubscribe.

## Important limitations
- The server reads the exam calendar **from its deployment checkout**. Redeploy the backend after calendar changes; consider a deployment pipeline for synchronized releases.
- Existing calendar entries marked `term` containing `verify` are excluded from automatic reminders.
- Push is **not enabled** until deployment and secret configuration are complete.
- For a production public rollout, add request rate limiting and abuse prevention at the hosting edge. CORS and Origin checks are not authentication; subscription endpoints are public by design.
- A failed push may be retried on the next scheduled run. Delivery timing depends on device/browser settings and the push provider.
