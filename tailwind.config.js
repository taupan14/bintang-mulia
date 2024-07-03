/** @type {import('tailwindcss').Config} */
export default {
    content: ['./**/*.{html,js}'],
    theme: {
        extend: {
            fontFamily: {
                sans: '"Plus Jakarta Sans", sans-serif',
                // sans: '"Suisse Intl", sans-serif',
                title: '"Blacker Pro Text", serif'
            },
            colors: {
                'primary': {
                    50: '#f0f9ff',
                    100: '#e0f2fe',
                    200: '#bae6fd',
                    300: '#7dd3fc',
                    400: '#38bdf8',
                    500: '#0ea5e9',
                    600: '#0284c7',
                    700: '#0369a1',
                    800: '#075985',
                    900: '#0c4a6e',
                    950: '#082f49'
                },
                'dark': {
                    50: '#fafafa',
                    100: '#f4f4f5',
                    200: '#e4e4e7',
                    300: '#d4d4d8',
                    400: '#a1a1aa',
                    500: '#71717a',
                    600: '#52525b',
                    700: '#3f3f46',
                    800: '#27272a',
                    900: '#18181b',
                    950: '#09090b'
                },
            },
            transitionTimingFunction: {
                'custom': 'cubic-bezier(.135,.9,.15,1)',
            },
        },
    },
    plugins: [],
}

