import type {Config} from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            backgroundColor: {
                'error': "var(--bg-error)",
                'warning': "var(--bg-warning)",
                'success': "var(--bg-success)",
                'grey-fade': "var(--clr-grey-fade)",
                'grey': "var(--clr-grey)",
            },
            fontSize: {
                'title-lg': '32px'
            },
            textColor: {
                'default': '#3d3d3d',
            },
            padding: {
                'y-body': '20px',
                'x-body': '30px',
            }
        },
    },
    plugins: [],
}
export default config
