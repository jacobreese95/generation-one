async function sha256hex(value) {
  const normalized = value.trim().toLowerCase();
  const encoded = new TextEncoder().encode(normalized);
  const hashBuffer = await crypto.subtle.digest('SHA-256', encoded);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export default {
  async fetch(request, env) {
    const { META_PIXEL_ID, META_CAPI_ACCESS_TOKEN } = env;

    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ received: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const submissionEntry = Array.isArray(body.submission_data)
      ? body.submission_data[0]
      : (body.submission_data || {});

    const rawEmail = submissionEntry?.email?.value || '';
    const rawPhone = submissionEntry?.phone_number?.value || '';

    const userData = {};
    if (rawEmail) userData.em = await sha256hex(rawEmail);
    if (rawPhone) userData.ph = await sha256hex('1' + rawPhone.replace(/\D/g, ''));

    if (META_PIXEL_ID && META_CAPI_ACCESS_TOKEN && Object.keys(userData).length > 0) {
      const capiPayload = {
        data: [{
          event_name: 'CompleteRegistration',
          event_time: Math.floor(Date.now() / 1000),
          action_source: 'website',
          event_source_url: 'https://generationoneict.com',
          user_data: userData,
        }],
        access_token: META_CAPI_ACCESS_TOKEN,
      };

      try {
        const capiRes = await fetch(
          `https://graph.facebook.com/v20.0/${META_PIXEL_ID}/events`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(capiPayload),
          }
        );
        if (!capiRes.ok) {
          console.error('Meta CAPI error:', await capiRes.text());
        }
      } catch (err) {
        console.error('Meta CAPI fetch failed:', err.message);
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  },
};
