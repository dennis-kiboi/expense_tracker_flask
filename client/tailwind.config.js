import { nextui } from '@nextui-org/react';

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
		'./src/components/**/*.{js,ts,jsx,tsx}',
		'./src/layouts/**/*.{js,ts,jsx,tsx}',
		'./src/pages/**/*.{js,ts,jsx,tsx}',
		// add nextui
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: '#646CFF',
					100: '#E0E2FF',
					300: '#A2A7FF',
					500: '#646CFF',
					700: '#3237B7',
					900: '#13167A',
				},
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
			},
		},
	},
	darkMode: 'class',
	plugins: [nextui()],
};
