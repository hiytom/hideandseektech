const siteOrigin = 'https://hideandseektech.com';
const callbackPath = '/api/portal/callback';
const localCallback = 'http://127.0.0.1:3200' + callbackPath;
const privateHeaders = { 'Cache-Control': 'no-store', 'Referrer-Policy': 'no-referrer' };

function singleParameter(params, key, maxLength) {
  const values = params.getAll(key);
  if (values.length !== 1) return null;
  const value = values[0];
  if (!value || value.length > maxLength || /[^!-~]/.test(value)) return null;
  return value;
}

export function onRequest({ request, next }) {
  const url = new URL(request.url);
  if (url.pathname !== callbackPath) return next();
  if (url.origin !== siteOrigin) return new Response(null, { status: 404, headers: privateHeaders });
  if (request.method !== 'GET') {
    return new Response(null, { status: 405, headers: { ...privateHeaders, Allow: 'GET' } });
  }
  if (url.search.length > 8192) return new Response(null, { status: 414, headers: privateHeaders });

  const params = url.searchParams;
  const state = singleParameter(params, 'state', 128);
  if (!state || params.has('code') === params.has('error')) {
    return new Response(null, { status: 400, headers: privateHeaders });
  }
  const resultKey = params.has('code') ? 'code' : 'error';
  const result = singleParameter(params, resultKey, 2048);
  if (!result) return new Response(null, { status: 400, headers: privateHeaders });

  const destination = new URL(localCallback);
  destination.searchParams.set('state', state);
  destination.searchParams.set(resultKey, result);
  return new Response(null, { status: 303, headers: { ...privateHeaders, Location: destination.href } });
}
