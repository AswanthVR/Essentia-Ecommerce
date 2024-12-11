/** @type {import('tailwindcss').Config} */
module.exports = {
  content: {
    files: ["./src/**/*.{js,jsx,ts,tsx}","./node_modules/tw-elements/dist/js/**/*.js"],
    relative: true,
    transform: (content) => content.replace(/taos:/g, ''),
  },
  rules: [
    // ... other rules
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    },
  ],
  safelist: [
    '!duration-[0ms]',
    '!delay-[0ms]',
    'html.js :where([class*="taos:"]:not(.taos-init))'
  ],

  darkMode:"class",
  theme: {
    extend: {},
    fontFamily:{
      lexend:['Lexend', 'sans-serif']
    }
  },
  plugins: [require("tw-elements/dist/plugin.cjs" )],
  plugins: [
    require('taos/plugin')
  ],
  theme: {
    fontWeight: {
      thin: '100',
      hairline: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      'extra-bold': '800',
      black: '900',
    }
  },
   

  zoomIn : ['animate-[fade-in_1s_ease-in-out]', 'animate-[fade-in-down_1s_ease-in-out]']

}

 