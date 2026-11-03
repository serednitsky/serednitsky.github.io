(() => {
    const root = document.documentElement;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
    let parentRoot;

    try {
        if (window.parent !== window) {
            parentRoot = window.parent.document.documentElement;
        }
    } catch {
        // A standalone or cross-origin demo follows the system theme.
    }

    const syncTheme = () => {
        const parentTheme = parentRoot?.getAttribute('data-theme');
        root.dataset.theme = parentTheme === 'dark' || (!parentTheme && systemTheme.matches)
            ? 'dark'
            : 'light';
    };

    syncTheme();

    if (parentRoot) {
        new MutationObserver(syncTheme).observe(parentRoot, {
            attributes: true,
            attributeFilter: ['data-theme'],
        });
    } else {
        systemTheme.addEventListener('change', syncTheme);
    }
})();
