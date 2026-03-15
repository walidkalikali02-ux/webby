export type AnalyticsParams = Record<string, string | number | boolean | null | undefined>;

declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
        dataLayer?: Array<Record<string, unknown>>;
        plausible?: (eventName: string, options?: { props?: AnalyticsParams }) => void;
        sa_event?: (eventName: string, params?: AnalyticsParams) => void;
        analytics?: { track?: (eventName: string, params?: AnalyticsParams) => void };
        _hsq?: Array<unknown>;
        abTest?: { track?: (eventName: string, params?: AnalyticsParams) => void };
    }
}

export function trackEvent(eventName: string, params: AnalyticsParams = {}) {
    if (typeof window === 'undefined') return;

    if (typeof window.gtag === 'function') {
        window.gtag('event', eventName, params);
    }

    if (Array.isArray(window.dataLayer)) {
        window.dataLayer.push({ event: eventName, ...params });
    }

    if (typeof window.plausible === 'function') {
        window.plausible(eventName, { props: params });
    }

    if (typeof window.sa_event === 'function') {
        window.sa_event(eventName, params);
    }

    if (typeof window.analytics?.track === 'function') {
        window.analytics.track(eventName, params);
    }

    if (typeof window.abTest?.track === 'function') {
        window.abTest.track(eventName, params);
    }
}

export function trackCtaClick(ctaId: string, location: string, href?: string) {
    trackEvent('cta_click', {
        cta_id: ctaId,
        location,
        href: href || null,
    });
}

export function trackFormSubmit(formId: string, status: 'success' | 'error', params: AnalyticsParams = {}) {
    trackEvent('lead_form_submit', {
        form_id: formId,
        status,
        ...params,
    });
}

export function getUtmParams(): AnalyticsParams {
    if (typeof window === 'undefined') return {};
    const params = new URLSearchParams(window.location.search);
    return {
        utm_source: params.get('utm_source'),
        utm_medium: params.get('utm_medium'),
        utm_campaign: params.get('utm_campaign'),
        utm_term: params.get('utm_term'),
        utm_content: params.get('utm_content'),
    };
}

export function withUtm(url: string, utm: AnalyticsParams): string {
    if (typeof window === 'undefined') return url;
    try {
        const target = new URL(url, window.location.origin);
        Object.entries(utm).forEach(([key, value]) => {
            if (value && !target.searchParams.has(key)) {
                target.searchParams.set(key, String(value));
            }
        });
        return target.pathname + target.search + target.hash;
    } catch {
        return url;
    }
}
