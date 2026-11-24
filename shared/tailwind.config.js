window.BB = (function () {
    const scrollbarPlugin = function ({ addUtilities }) {
        addUtilities({
            '.scrollbar-thin': {
                scrollbarWidth: 'thin',
                scrollbarColor: '#c8c5cb transparent',
                '&::-webkit-scrollbar': { width: '6px', height: '6px' },
                '&::-webkit-scrollbar-track': { background: 'transparent' },
                '&::-webkit-scrollbar-thumb': { background: '#c8c5cb', borderRadius: '9999px' },
            },
            '.scrollbar-none': {
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': { display: 'none' },
            },
        });
    };

    function extendTailwindConfig(config) {
        const next = config || {};
        next.darkMode = 'class';
        next.theme = next.theme || {};
        next.theme.extend = next.theme.extend || {};
        const extend = next.theme.extend;

        extend.colors = Object.assign({}, extend.colors, {
            brand: {
                50: '#fff8ec',
                100: '#ffedd0',
                200: '#ffd79e',
                300: '#ffbc65',
                400: '#f2a93b',
                500: '#e58f1a',
                600: '#c67212',
                700: '#9e5511',
                800: '#7f4514',
                900: '#6a3a14',
            },
            semantic: {
                success: '#16a34a',
                warning: '#f59e0b',
                info: '#0ea5e9',
                danger: '#dc2626',
            },
        });

        extend.keyframes = Object.assign({}, extend.keyframes, {
            'fade-in-up': {
                '0%': { opacity: '0', transform: 'translateY(16px)' },
                '100%': { opacity: '1', transform: 'translateY(0)' },
            },
        });
        extend.animation = Object.assign({}, extend.animation, {
            'fade-in-up': 'fade-in-up .6s ease-out both',
            'fade-in-up-delay': 'fade-in-up .6s ease-out .15s both',
        });

        next.plugins = (next.plugins || []).concat([scrollbarPlugin]);
        return next;
    }

    function toggleTheme() {
        const root = document.documentElement;
        const isDark = root.classList.toggle('dark');
        localStorage.setItem('bb-theme', isDark ? 'dark' : 'light');
        document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
            button.setAttribute('aria-pressed', String(isDark));
            const icon = button.querySelector('[data-theme-icon]');
            if (icon) icon.textContent = isDark ? 'light_mode' : 'dark_mode';
        });
    }

    function initTheme() {
        const stored = localStorage.getItem('bb-theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (stored === 'dark' || (!stored && prefersDark)) {
            document.documentElement.classList.add('dark');
        }
        document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
            button.addEventListener('click', toggleTheme);
            const icon = button.querySelector('[data-theme-icon]');
            if (icon) icon.textContent = document.documentElement.classList.contains('dark') ? 'light_mode' : 'dark_mode';
        });
    }

    return { extendTailwindConfig, initTheme, toggleTheme };
})();
