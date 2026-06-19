"use client";

/**
 * Track a GA4 event safely — no-ops if gtag isn't loaded.
 */
export function trackEvent(
	eventName: string,
	params?: Record<string, string | number | boolean>,
) {
	if (
		typeof window !== "undefined" &&
		typeof (window as any).gtag === "function"
	) {
		(window as any).gtag("event", eventName, params);
	}
}

// ── Batched analytics ──────────────────────────────────────────
// Events are buffered client-side and flushed to /api/track in a
// single request every FLUSH_INTERVAL_MS or when the buffer
// reaches MAX_BATCH_SIZE.  This reduces KV write costs at scale
// by amortising the per-event overhead across multiple events.

interface PendingEvent {
	event: string;
	data?: Record<string, unknown>;
	page: string;
	ts: number;
}

const MAX_BATCH_SIZE = 10;
const FLUSH_INTERVAL_MS = 30_000; // 30 s

let buffer: PendingEvent[] = [];
let flushTimer: ReturnType<typeof setTimeout> | null = null;

function scheduleFlush() {
	if (flushTimer) return; // already scheduled
	flushTimer = setTimeout(() => {
		flushTimer = null;
		flushBuffer();
	}, FLUSH_INTERVAL_MS);
}

function flushBuffer() {
	if (buffer.length === 0) return;
	const batch = buffer.splice(0); // take all pending events

	try {
		const payload = JSON.stringify(batch);
		if (navigator?.sendBeacon) {
			navigator.sendBeacon(
				"/api/track",
				new Blob([payload], { type: "application/json" }),
			);
		} else {
			fetch("/api/track", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: payload,
				keepalive: true,
			});
		}
	} catch {
		// silently ignore tracking errors
	}
}

// Flush on page hide (tab close, navigation) so we don't lose buffered events.
if (typeof document !== "undefined") {
	document.addEventListener("visibilitychange", () => {
		if (document.visibilityState === "hidden") flushBuffer();
	});
}

/**
 * Track an analytics event.
 *
 * Events are buffered client-side and flushed to /api/track in
 * batches.  GA4 events are sent immediately via gtag.
 *
 * @param event - The event name (e.g. "quiz_start")
 * @param data  - Optional event-specific data
 * @param page  - Optional page override; defaults to current pathname
 */
/**
 * Track a Facebook Pixel event safely — no-ops if fbq isn't loaded.
 */
export function trackFBEvent(
	eventName: string,
	params?: Record<string, string | number>,
) {
	if (
		typeof window !== "undefined" &&
		typeof (window as any).fbq === "function"
	) {
		(window as any).fbq("track", eventName, params);
	}
}

export function track(
	event: string,
	data?: Record<string, unknown>,
	page?: string,
) {
	// Also send to GA4 so every tracked event appears in the GA4 dashboard.
	trackEvent(
		event,
		data as Record<string, string | number | boolean> | undefined,
	);

	buffer.push({
		event,
		data,
		page: page ?? window.location.pathname,
		ts: Date.now(),
	});

	if (buffer.length >= MAX_BATCH_SIZE) {
		flushBuffer();
	} else {
		scheduleFlush();
	}
}
