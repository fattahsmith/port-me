"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

type MarketItem = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  currency: string;
};

type MarketData = {
  items: MarketItem[];
  timestamp: string;
  delayed: boolean;
};

type MarketDataResponse =
  | MarketData
  | { error: string; timestamp: string };

function formatPrice(price: number, currency: string): string {
  if (currency === "IDR") {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  }

  if (price >= 1000) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

function formatPercent(pct: number): string {
  const sign = pct >= 0 ? "+" : "";
  return `${sign}${pct.toFixed(2)}%`;
}

function TickerItem({ item }: { item: MarketItem }) {
  const isPositive = item.change >= 0;
  const changeColor = isPositive
    ? "var(--ticker-up, #16a34a)"
    : "var(--ticker-down, #dc2626)";

  return (
    <div className="ticker-item">
      <span className="ticker-symbol">{item.symbol}</span>
      <span className="ticker-price">
        {formatPrice(item.price, item.currency)}
      </span>
      <span className="ticker-change" style={{ color: changeColor }}>
        <span
          className="ticker-dot"
          style={{ backgroundColor: changeColor }}
          aria-hidden
        />
        {formatPercent(item.changePercent)}
      </span>
      <span className="ticker-sep" aria-hidden>
        |
      </span>
    </div>
  );
}

function SkeletonTicker() {
  return (
    <div className="ticker-content ticker-skeleton">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="ticker-item">
          <span className="ticker-symbol">···</span>
          <span className="ticker-price">···</span>
          <span className="ticker-change">···</span>
          <span className="ticker-sep">|</span>
        </div>
      ))}
    </div>
  );
}

export function MarketTicker() {
  const reduceMotion = useReducedMotion();
  const [data, setData] = useState<MarketData | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  async function fetchData() {
    try {
      const res = await fetch("/api/market", { cache: "no-store" });
      if (!res.ok) throw new Error("API error");
      const json = (await res.json()) as MarketDataResponse;
      if ("error" in json) {
        setError(true);
      } else {
        setData(json);
        setError(false);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();

    // Poll every 5 minutes
    if (!reduceMotion) {
      intervalRef.current = setInterval(fetchData, 5 * 60 * 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion]);

  // Don't render anything if error and no data
  if (error && !data) {
    return (
      <div className="ticker-bar" role="status" aria-label="Market data unavailable">
        <div className="ticker-content ticker-error">
          <span className="ticker-symbol">MARKET DATA UNAVAILABLE</span>
        </div>
      </div>
    );
  }

  // Render nothing if no data yet — skeleton will show
  const items = data?.items ?? [];

  // Duplicate items for seamless marquee
  const displayItems = items.length > 0 ? [...items, ...items] : [];

  return (
    <div
      className="ticker-bar"
      role="marquee"
      aria-label="Live market ticker"
      data-reduce-motion={reduceMotion ? "true" : "false"}
    >
      <div className="ticker-label">LIVE</div>
      <div className="ticker-track-wrapper">
        {loading ? (
          <SkeletonTicker />
        ) : (
          <div
            className={`ticker-track ${reduceMotion ? "" : "ticker-scroll"}`}
            style={{ animationPlayState: "running" }}
            onMouseEnter={(e) => {
              if (!reduceMotion) {
                e.currentTarget.style.animationPlayState = "paused";
              }
            }}
            onMouseLeave={(e) => {
              if (!reduceMotion) {
                e.currentTarget.style.animationPlayState = "running";
              }
            }}
          >
            {displayItems.map((item, i) => (
              <TickerItem key={`${item.symbol}-${i}`} item={item} />
            ))}
          </div>
        )}
      </div>
      {data && (
        <div className="ticker-updated">
          {data.delayed ? "DELAYED" : "LIVE"} ·{" "}
          {new Date(data.timestamp).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      )}
    </div>
  );
}
