import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
				// Brand Colors - Digital Blue + Black/White/Gray
				offwhite: {
					DEFAULT: '#FAFAFA',
					dark: '#F5F5F5',
					light: '#FFFFFF',
				},
				blue: {
					DEFAULT: '#0000FF',
					light: '#3333FF',
					dark: '#0000CC',
				},
				black: {
					DEFAULT: '#000000',
					light: '#1F1F1F',
					dark: '#000000',
				},
				// Legacy aliases for compatibility
				cream: {
					DEFAULT: '#FAFAFA',
					dark: '#F5F5F5',
					light: '#FFFFFF',
				},
				terracotta: {
					DEFAULT: '#0000FF',
					light: '#3333FF',
					dark: '#0000CC',
				},
				charcoal: {
					DEFAULT: '#000000',
					light: '#1F1F1F',
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
				'custom-gradient': 'linear-gradient(90deg, #FFFFFF -7.54%, #ABFFFF 60.87%, #F1A3A1 100%)',
				'blue-gradient': 'linear-gradient(135deg, #0000FF 0%, #0000BB 100%)',
				'blue-radial': 'radial-gradient(ellipse at center, #3333FF 0%, #0000FF 100%)',
				'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
      },
			boxShadow: {
				'blue-glow': '0 0 30px 0 rgba(0, 0, 255, 0.25)',
				'blue-glow-lg': '0 0 50px 0 rgba(0, 0, 255, 0.35)',
				'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.08)',
				'glass-hover': '0 12px 40px 0 rgba(0, 0, 0, 0.12)',
				'subtle': '0 1px 3px 0 rgb(0 0 0 / 0.08)',
				'card': '0 4px 20px -2px rgb(0 0 0 / 0.06)',
			},
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
