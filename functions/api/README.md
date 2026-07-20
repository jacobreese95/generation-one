# Elvanto → Meta Conversions API Webhook

## Deployment: Cloudflare Worker (standalone)

Since Cloudflare Pages Functions are not supported on this account, deploy the webhook
as a standalone **Cloudflare Worker**. The code in `functions/api/elvanto-webhook.js`
uses the Workers ES module format and deploys directly to Workers.

### One-time setup

1. Go to **Workers & Pages → Create → Worker**
2. Name it something like `gen1-elvanto-webhook`
3. Click **Edit code**, paste the contents of `functions/api/elvanto-webhook.js`, and **Save & Deploy**
4. Your webhook URL will be: `https://gen1-elvanto-webhook.YOUR-ACCOUNT.workers.dev`

### Environment variables

In the Worker dashboard: **Settings → Variables and Secrets → Add variable**

| Variable | Value |
|---|---|
| `META_PIXEL_ID` | `877284301688229` |
| `META_CAPI_ACCESS_TOKEN` | Meta Events Manager → your pixel → Settings → Conversions API → Generate access token |

### Elvanto webhook setup

In Elvanto: **Settings → Integrations → Webhooks → Add Webhook**
- Event: Form Submission Created
- URL: `https://gen1-elvanto-webhook.YOUR-ACCOUNT.workers.dev`
- Method: POST

### Test with curl

Replace the URL with your actual Worker URL:

```bash
curl -X POST https://gen1-elvanto-webhook.YOUR-ACCOUNT.workers.dev \
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

Then check **Meta Events Manager → Test Events** for a `CompleteRegistration` event.

### Phone number format note

Meta expects phone in E.164 format — country code + digits, no `+` sign
(e.g. `13165550100` not `3165550100`). If Elvanto submits numbers without
the country code, prepend `1` in the `rawPhone` line of the Worker code.
