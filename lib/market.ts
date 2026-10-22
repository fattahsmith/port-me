/**
 * Market data fetching library.
 *
 * Providers:
 * - CoinGecko (free, no API key): BTC/USD, ETH/USD
 * - Yahoo Finance (free, unofficial): S&P 500, Nasdaq, Gold futures, USD/IDR, IHSG
 *
 * Both providers are free and require no API key. Yahoo Finance is an
 * unofficial endpoint used widely for personal projects — it may rate-limit
 * or change without notice. All data is labelled "delayed" since neither
 * provider guarantees real-time quotes.
 */

export type MarketItem = {
  symbol: string;
  name: string;
  price: number;
  change: number;      // absolute change
  changePercent: number; // percentage change
  currency: string;
  source: string;
};

export type MarketData = {
  items: MarketItem[];
  timestamp: string; // ISO string of last fetch
  source: string;
  delayed: boolean;
};

// ---------------------------------------------------------------------------
// CoinGecko — crypto prices (BTC, ETH)
// ---------------------------------------------------------------------------

const COINGECKO_IDS: Record<string, { id: string; symbol: string; name: string }> = {
  BTC: { id: "bitcoin", symbol: "BTC/USD", name: "Bitcoin" },
  ETH: { id: "ethereum", symbol: "ETH/USD", name: "Ethereum" },
};

async function fetchCoinGecko(): Promise<MarketItem[]> {
  const ids = Object.values(COINGECKO_IDS)
    .map((c) => c.id)
    .join(",");

  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`;

  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    next: { revalidate: 300 },
  });

  if (!res.ok) throw new Error(`CoinGecko API error (${res.status})`);

  const data = (await res.json()) as Record<
    string,
    { usd: number; usd_24h_change: number }
  >;

  const items: MarketItem[] = [];

  for (const [key, config] of Object.entries(COINGECKO_IDS)) {
    const entry = data[config.id];
    if (!entry || typeof entry.usd !== "number") continue;

    const changePercent = entry.usd_24h_change ?? 0;
    const price = entry.usd;
    const change = (price * changePercent) / 100;

    items.push({
      symbol: config.symbol,
      name: config.name,
      price,
      change,
      changePercent,
      currency: "USD",
      source: "CoinGecko",
    });
  }

  return items;
}

// ---------------------------------------------------------------------------
// Yahoo Finance — indices, gold, FX (unofficial endpoint)
// ---------------------------------------------------------------------------

const YAHOO_SYMBOLS: Record<string, { yahoo: string; symbol: string; name: string; currency: string }> = {
  SP500:  { yahoo: "^GSPC",  symbol: "S&P 500",    name: "S&P 500",          currency: "USD" },
  NASDAQ: { yahoo: "^IXIC",  symbol: "NASDAQ",     name: "Nasdaq Composite",  currency: "USD" },
  GOLD:   { yahoo: "GC=F",   symbol: "XAU/USD",    name: "Gold",             currency: "USD" },
  USDAIDR:{ yahoo: "IDR=X",  symbol: "USD/IDR",    name: "USD / IDR",        currency: "IDR" },
  IHSG:   { yahoo: "^JKSE",  symbol: "IHSG",       name: "IDX Composite",    currency: "IDR" },
};

type YahooChartResponse = {
  chart?: {
    result?: Array<{
      meta?: {
        regularMarketPrice?: number;
        chartPreviousClose?: number;
        previousClose?: number;
      };
    }>;
    error?: { description?: string };
  };
};

async function fetchYahooOne(
  yahooSymbol: string,
): Promise<{ price: number; previousClose: number } | null> {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(yahooSymbol)}?interval=1d&range=2d`;

  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0" },
    next: { revalidate: 300 },
  });

  if (!res.ok) return null;

  const data = (await res.json()) as YahooChartResponse;
  const meta = data.chart?.result?.[0]?.meta;
  if (!meta) return null;

  const price = meta.regularMarketPrice;
  const previousClose = meta.chartPreviousClose ?? meta.previousClose;

  if (typeof price !== "number" || typeof previousClose !== "number") return null;

  return { price, previousClose };
}

async function fetchYahoo(): Promise<MarketItem[]> {
  const items: MarketItem[] = [];

  for (const [, config] of Object.entries(YAHOO_SYMBOLS)) {
    try {
      const result = await fetchYahooOne(config.yahoo);
      if (!result) continue;

      const change = result.price - result.previousClose;
      const changePercent = result.previousClose
        ? (change / result.previousClose) * 100
        : 0;

      items.push({
        symbol: config.symbol,
        name: config.name,
        price: result.price,
        change,
        changePercent,
        currency: config.currency,
        source: "Yahoo Finance",
      });
    } catch {
      // Skip individual failures
    }
  }

  return items;
}

// ---------------------------------------------------------------------------
// Combined fetch
// ---------------------------------------------------------------------------

export async function fetchMarketData(): Promise<MarketData> {
  const [cryptoItems, yahooItems] = await Promise.allSettled([
    fetchCoinGecko(),
    fetchYahoo(),
  ]);

  const items: MarketItem[] = [];

  if (cryptoItems.status === "fulfilled") {
    items.push(...cryptoItems.value);
  }

  if (yahooItems.status === "fulfilled") {
    items.push(...yahooItems.value);
  }

  // If we got nothing, throw so the API route returns an error
  if (items.length === 0) {
    throw new Error("All market data providers failed.");
  }

  return {
    items,
    timestamp: new Date().toISOString(),
    source: "CoinGecko + Yahoo Finance",
    delayed: true, // Neither provider guarantees real-time data
  };
}
