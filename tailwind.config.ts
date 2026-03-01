import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	screens: {
  		sm: '640px',
  		md: '768px',
  		lg: '1024px',
  		xl: '1280px',
  		'2xl': '1536px',
  		'3xl': '1920px',
  	},
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
				// Brand Colors
				aquamarine: {
					DEFAULT: '#5DFDCB',
					light: '#8FFEDD',
					dark: '#3DDAA8',
				},
				'maya-blue': {
					DEFAULT: '#7CC6FE',
					light: '#A6D8FF',
					dark: '#5BB0F0',
				},
				'alice-blue': {
					DEFAULT: '#F4FAFF',
					dark: '#E8F2FB',
					light: '#FFFFFF',
				},
				blue: {
					DEFAULT: '#0008FF',
					light: '#3338FF',
					dark: '#0006CC',
				},
				black: {
					DEFAULT: '#08090A',
					light: '#1A1C1E',
					dark: '#000000',
				},
				// Legacy aliases for compatibility
				offwhite: {
					DEFAULT: '#F4FAFF',
					dark: '#E8F2FB',
					light: '#FFFFFF',
				},
				cream: {
					DEFAULT: '#F4FAFF',
					dark: '#E8F2FB',
					light: '#FFFFFF',
				},
				terracotta: {
					DEFAULT: '#0008FF',
					light: '#3338FF',
					dark: '#0006CC',
				},
				charcoal: {
					DEFAULT: '#08090A',
					light: '#1A1C1E',
					dark: '#000000',
				},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          hover: "hsl(var(--primary-hover))",
          focus: "hsl(var(--primary-focus))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          hover: "hsl(var(--accent-hover))",
          focus: "hsl(var(--accent-focus))",
        },
        whiteButton: {
          DEFAULT: "hsl(var(--white-button))",
          hover: "hsl(var(--white-button-hover))",
          focus: "hsl(var(--white-button-focus))",
        },
        tertiary: "hsl(var(--tertiary))",
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			'gradient-shift': {
  				'0%, 100%': {
  					backgroundPosition: '0% 50%'
  				},
  				'50%': {
  					backgroundPosition: '100% 50%'
  				}
  			},
  			'scroll': {
  				'0%': {
  					transform: 'translateX(0)'
  				},
  				'100%': {
  					transform: 'translateX(-33.333%)'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'gradient-shift': 'gradient-shift 8s ease infinite',
  			'scroll': 'scroll 20s linear infinite'
  		},
			fontFamily: {
        sans: ['Geist', 'sans-serif'],
        mono: ['Geist Mono', 'monospace'],
        display: ['Instrument Sans', 'sans-serif'],
      },
      lineHeight: {
        '56': '56px',
      },
			backgroundImage: {
				'custom-gradient': 'linear-gradient(90deg, #F4FAFF -7.54%, #5DFDCB 50%, #7CC6FE 100%)',
				'blue-gradient': 'linear-gradient(135deg, #0008FF 0%, #0006CC 100%)',
				'blue-radial': 'radial-gradient(ellipse at center, #3338FF 0%, #0008FF 100%)',
				'aqua-gradient': 'linear-gradient(135deg, #5DFDCB 0%, #7CC6FE 100%)',
				'glass-gradient': 'linear-gradient(135deg, rgba(244,250,255,0.9) 0%, rgba(244,250,255,0.7) 100%)',
      },
			boxShadow: {
				'blue-glow': '0 0 30px 0 rgba(0, 8, 255, 0.25)',
				'blue-glow-lg': '0 0 50px 0 rgba(0, 8, 255, 0.35)',
				'aqua-glow': '0 0 30px 0 rgba(93, 253, 203, 0.3)',
				'aqua-glow-lg': '0 0 50px 0 rgba(93, 253, 203, 0.4)',
				'glass': '0 8px 32px 0 rgba(8, 9, 10, 0.08)',
				'glass-hover': '0 12px 40px 0 rgba(8, 9, 10, 0.12)',
				'subtle': '0 1px 3px 0 rgb(8 9 10 / 0.08)',
				'card': '0 4px 20px -2px rgb(8 9 10 / 0.06)',
			},
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
