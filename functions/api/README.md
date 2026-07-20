# Elvanto → Meta Conversions API Webhook

## Hosting platform
**Cloudflare Pages Functions** — file at `functions/api/elvanto-webhook.js` auto-deploys as `/api/elvanto-webhook`. No extra config needed; Cloudflare detects the `functions/` directory automatically.

## Environment variables
Add these in the Cloudflare dashboard: **Pages project → Settings → Environment variables → Production**:

| Variable | Where to get it |
|---|---|
| `META_PIXEL_ID` | Your pixel ID (e.g. `877284301688229`) |
| `META_CAPI_ACCESS_TOKEN` | Meta Events Manager → Data Sources → your pixel → Settings → Conversions API → Generate access token |

## Elvanto webhook setup
In Elvanto: **Settings → Integrations → Webhooks → Add Webhook**
- Event: `Form Submission Created`
- URL: `https://generationoneict.com/api/elvanto-webhook`
- Method: POST

## Test with curl (before Elvanto is wired up)
```bash
curl -X POST https://generationoneict.com/api/elvanto-webhook \
  -H "Content-Type: application/json" \
  -d '{
    "type": "form:submission:create",
    "submission_id": "test-001",
    "submission_data": [{
      "email": {"value": "test@example.com"},
      "phone_number": {"value": "13165550100"}
    }]
  }'
```
Expected response: `{"received":true}`

Then verify in **Meta Events Manager → Test Events** — a `CompleteRegistration` event should appear within a few seconds.

## Phone number format note
Meta's Conversions API expects phone numbers with country code, digits only (E.164 without the `+`). If your Elvanto form collects US numbers without a country code (e.g. `3165550100` instead of `13165550100`), the hash won't match Meta's internal records. Either configure Elvanto's form field to collect the full number, or prepend `1` in the code at the `rawPhone` line.
