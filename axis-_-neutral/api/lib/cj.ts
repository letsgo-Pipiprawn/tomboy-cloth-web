type CjTokenState = {
  accessToken: string;
  expiresAt: number;
};

let cachedToken: CjTokenState | null = null;

function getCjBaseUrl(): string {
  return (process.env.CJ_API_BASE_URL || 'https://developers.cjdropshipping.com').replace(/\/$/, '');
}

function asObject(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' ? (value as Record<string, unknown>) : {};
}

function readString(value: unknown): string | null {
  return typeof value === 'string' && value.trim() ? value.trim() : null;
}

function readNumber(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim()) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

function extractTokenPayload(raw: unknown): { accessToken: string; ttlSeconds: number } | null {
  const body = asObject(raw);
  const data = asObject(body.data);

  const accessToken =
    readString(data.accessToken) ??
    readString(data['access_token']) ??
    readString(body.accessToken) ??
    readString(body['access_token']);

  if (!accessToken) return null;

  const ttlSeconds =
    readNumber(data.expiresIn) ??
    readNumber(data['expires_in']) ??
    readNumber(body.expiresIn) ??
    readNumber(body['expires_in']) ??
    12 * 60 * 60;

  return { accessToken, ttlSeconds };
}

export async function getCjAccessToken(forceRefresh = false): Promise<string> {
  const now = Date.now();
  if (!forceRefresh && cachedToken && cachedToken.expiresAt > now + 60_000) {
    return cachedToken.accessToken;
  }

  const apiKey = process.env.CJ_API_KEY;
  if (!apiKey) {
    throw new Error('Missing CJ_API_KEY');
  }

  const endpoint = `${getCjBaseUrl()}/api2.0/v1/authentication/getAccessToken`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ apiKey }),
  });

  const json = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(`CJ auth failed (${response.status}): ${JSON.stringify(json)}`);
  }

  const parsed = extractTokenPayload(json);
  if (!parsed) {
    throw new Error(`CJ auth payload missing access token: ${JSON.stringify(json)}`);
  }

  cachedToken = {
    accessToken: parsed.accessToken,
    expiresAt: now + Math.max(parsed.ttlSeconds, 300) * 1000,
  };

  return parsed.accessToken;
}

export type CjCreateOrderProduct = {
  vid: string;
  quantity: number;
  storeLineItemId?: string;
};

export type CjCreateOrderPayload = {
  orderNumber: string;
  shippingZip?: string;
  shippingCountry: string;
  shippingCountryCode: string;
  shippingProvince: string;
  shippingCity: string;
  shippingCounty?: string;
  shippingPhone?: string;
  shippingCustomerName: string;
  shippingAddress: string;
  shippingAddress2?: string;
  email?: string;
  logisticName: string;
  fromCountryCode: string;
  platform?: string;
  payType?: number;
  shopLogisticsType?: number;
  products: CjCreateOrderProduct[];
};

function extractOrderId(raw: unknown): string | null {
  const body = asObject(raw);
  const data = asObject(body.data);
  return (
    readString(data.orderId) ??
    readString(data['order_id']) ??
    readString(data.orderNo) ??
    readString(body.orderId) ??
    readString(body['order_id']) ??
    null
  );
}

export async function cjCreateOrder(payload: CjCreateOrderPayload): Promise<{
  ok: boolean;
  orderId: string | null;
  raw: unknown;
}> {
  const endpoint = `${getCjBaseUrl()}/api2.0/v1/shopping/order/createOrderV2`;
  const platformToken = process.env.CJ_PLATFORM_TOKEN || '';

  const token = await getCjAccessToken();
  let response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'CJ-Access-Token': token,
      ...(platformToken ? { platformToken } : {}),
    },
    body: JSON.stringify(payload),
  });

  if (response.status === 401 || response.status === 403) {
    const refreshed = await getCjAccessToken(true);
    response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'CJ-Access-Token': refreshed,
        ...(platformToken ? { platformToken } : {}),
      },
      body: JSON.stringify(payload),
    });
  }

  const json = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(`CJ createOrderV2 failed (${response.status}): ${JSON.stringify(json)}`);
  }

  const body = asObject(json);
  const code = readNumber(body.code);
  const successFlag =
    (typeof body.result === 'boolean' ? body.result : true) && (code === null || code === 200);

  return {
    ok: successFlag,
    orderId: extractOrderId(json),
    raw: json,
  };
}
