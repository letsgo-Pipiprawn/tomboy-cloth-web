import fs from 'node:fs';

const pid = process.argv[2];
if (!pid) {
  console.error('Usage: node scripts/fetch-cj-product.mjs <cj_product_id>');
  process.exit(1);
}

const envPath = new URL('../.env.local', import.meta.url);
const env = fs.readFileSync(envPath, 'utf8');
const key = env.match(/CJ_API_KEY=(.+)/)?.[1]?.trim();
if (!key) throw new Error('CJ_API_KEY missing');

const authRes = await fetch('https://developers.cjdropshipping.com/api2.0/v1/authentication/getAccessToken', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ apiKey: key }),
});
const authJson = await authRes.json();
const token = authJson?.data?.accessToken;
if (!token) throw new Error(`Auth failed: ${JSON.stringify(authJson)}`);

const res = await fetch(`https://developers.cjdropshipping.com/api2.0/v1/product/query?pid=${encodeURIComponent(pid)}`, {
  headers: { 'CJ-Access-Token': token },
});
const json = await res.json();
console.log(JSON.stringify(json, null, 2));
