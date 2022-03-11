import { resolve } from 'path'
import { defineConfig } from 'windicss/helpers'
import colors from 'windicss/colors'

export default defineConfig({
  darkMode: 'class',
  // https://windicss.org/posts/v30.html#attributify-mode
  attributify: true,
  theme: {
    extend: {
      colors: {
        zinc: colors.zinc,
      },
    },
  },
  extract: {
    include: [
      resolve(__dirname, 'src/**/*.{vue,html}'),
    ],
  },
})
