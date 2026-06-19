'use client';

import { useEffect, useState, useMemo } from 'react';

const CURRENCIES = [
  { code: 'USD', symbol: '$', rate: 1 },
  { code: 'GBP', symbol: '£', rate: 0.79 },
  { code: 'EUR', symbol: '€', rate: 0.92 },
  { code: 'NGN', symbol: '₦', rate: 1530 },
  { code: 'GHS', symbol: 'GH₵', rate: 14.5 },
  { code: 'KES', symbol: 'KSh', rate: 129 },
  { code: 'ZAR', symbol: 'R', rate: 18.5 },
  { code: 'INR', symbol: '₹', rate: 83 },
  { code: 'CAD', symbol: 'C$', rate: 1.37 },
  { code: 'AUD', symbol: 'A$', rate: 1.52 },
];

const BASE_PRICES_USD = {
  dp: { price: 47, qty: 15 },
  cm: { price: 29, qty: 40 },
  ss: { price: 150, qty: 8 },
};

function storageGet<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem('ai-for-coaches-' + key);
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
}

function storageSet(key: string, val: unknown) {
  try { localStorage.setItem('ai-for-coaches-' + key, JSON.stringify(val)); } catch {}
}

export function Gate05Scoreboard() {
  const [currencyCode, setCurrencyCode] = useState(() => storageGet('gate5-currency', 'USD'));
  const [vals, setVals] = useState(() => storageGet('gate5-values', {
    dpPrice: BASE_PRICES_USD.dp.price,
    dpQty: BASE_PRICES_USD.dp.qty,
    cmPrice: BASE_PRICES_USD.cm.price,
    cmQty: BASE_PRICES_USD.cm.qty,
    ssPrice: BASE_PRICES_USD.ss.price,
    ssQty: BASE_PRICES_USD.ss.qty,
  }));

  useEffect(() => {
    storageSet('gate5-currency', currencyCode);
  }, [currencyCode]);

  useEffect(() => {
    storageSet('gate5-values', vals);
  }, [vals]);

  const currency = useMemo(
    () => CURRENCIES.find(c => c.code === currencyCode) || CURRENCIES[0],
    [currencyCode]
  );

  const update = (field: string, value: string) => {
    const num = parseFloat(value) || 0;
    setVals(prev => ({ ...prev, [field]: num }));
  };

  const fmt = (n: number) => currency.symbol + Math.round(n).toLocaleString();

  const dpRev = vals.dpPrice * vals.dpQty;
  const cmRev = vals.cmPrice * vals.cmQty;
  const ssRev = vals.ssPrice * vals.ssQty;
  const total = dpRev + cmRev + ssRev;

  const reset = () => {
    setVals({
      dpPrice: Math.round(BASE_PRICES_USD.dp.price * currency.rate),
      dpQty: BASE_PRICES_USD.dp.qty,
      cmPrice: Math.round(BASE_PRICES_USD.cm.price * currency.rate),
      cmQty: BASE_PRICES_USD.cm.qty,
      ssPrice: Math.round(BASE_PRICES_USD.ss.price * currency.rate),
      ssQty: BASE_PRICES_USD.ss.qty,
    });
  };

  return (
    <div>
      <div className="as-panel-head">
        <div>
          <h2 className="as-display">Revenue Projection</h2>
          <p className="as-sub">Stack your three payouts and see the monthly number.</p>
        </div>
      </div>

      <div className="as-currency-wrap">
        <span className="label">Currency</span>
        <select
          className="currency-select"
          value={currencyCode}
          onChange={e => setCurrencyCode(e.target.value)}
        >
          {CURRENCIES.map(c => (
            <option key={c.code} value={c.code}>{c.code} ({c.symbol})</option>
          ))}
        </select>
      </div>

      <div className="as-calc">
        <div className="as-calc-row head">
          <span>Stream</span>
          <span>Price</span>
          <span>Per month</span>
          <span>Revenue</span>
        </div>

        <div className="as-calc-row">
          <span className="rn">Digital product</span>
          <div className="as-price-wrap">
            <span className="cur-sym as-mono">{currency.symbol}</span>
            <input type="number" value={vals.dpPrice} min={0} onChange={e => update('dpPrice', e.target.value)} />
          </div>
          <input type="number" value={vals.dpQty} min={0} onChange={e => update('dpQty', e.target.value)} />
          <span className="rtotal">{fmt(dpRev)}</span>
        </div>
        <div className="as-calc-row">
          <span className="rn">Community members</span>
          <div className="as-price-wrap">
            <span className="cur-sym as-mono">{currency.symbol}</span>
            <input type="number" value={vals.cmPrice} min={0} onChange={e => update('cmPrice', e.target.value)} />
          </div>
          <input type="number" value={vals.cmQty} min={0} onChange={e => update('cmQty', e.target.value)} />
          <span className="rtotal">{fmt(cmRev)}</span>
        </div>
        <div className="as-calc-row">
          <span className="rn">1:1 sessions</span>
          <div className="as-price-wrap">
            <span className="cur-sym as-mono">{currency.symbol}</span>
            <input type="number" value={vals.ssPrice} min={0} onChange={e => update('ssPrice', e.target.value)} />
          </div>
          <input type="number" value={vals.ssQty} min={0} onChange={e => update('ssQty', e.target.value)} />
          <span className="rtotal">{fmt(ssRev)}</span>
        </div>
      </div>

      <div className="as-scoreboard">
        <span className="sl">Projected monthly revenue</span>
        <span className="sv as-display">{fmt(total)}</span>
      </div>
      <p className="as-disclaimer">
        A projection based on the numbers you enter, not a guarantee. Most people start with one stream, prove it, then stack the next.
      </p>
      <div style={{ padding: '0 32px' }}>
        <button type="button" className="as-reset" onClick={reset}>Reset to starter defaults</button>
      </div>
    </div>
  );
}
