document.addEventListener('DOMContentLoaded', () => {
    // Safe wrapper: calls window.clarity only if available
    const clarityReady = () => typeof window.clarity === 'function';

    // Track a named custom event
    const trackEvent = (name) => {
        if (clarityReady()) {
            window.clarity('event', name);
        }
    };

    // Set a custom tag (key/value metadata)
    const setTag = (key, value) => {
        if (clarityReady()) {
            window.clarity('set', key, value);
        }
    };

    // Consent V2 hook — call this when user consent state is known
    // adStorage: 'granted' | 'denied'
    // analyticsStorage: 'granted' | 'denied'
    const setConsent = (adStorage, analyticsStorage) => {
        if (clarityReady()) {
            window.clarity('consentv2', {
                'ad_Storage': adStorage,
                'analytics_Storage': analyticsStorage
            });
        }
    };

    // Set page-level metadata tags from body data attributes
    const body = document.body;
    if (body) {
        const page = body.getAttribute('data-clarity-page');
        const locale = body.getAttribute('data-clarity-locale');
        if (page) { setTag('page', page); }
        if (locale) { setTag('locale', locale); }
    }

    // Delegated click handler for elements with data-clarity-event attribute
    document.addEventListener('click', (e) => {
        const target = e.target.closest('[data-clarity-event]');
        if (target) {
            const eventName = target.getAttribute('data-clarity-event');
            if (eventName) {
                trackEvent(eventName);
            }
        }
    });

    // Expose consent hook globally for external use
    window.setClarityConsent = setConsent;
});
