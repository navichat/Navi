import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: [
    './src/index.ts',
  ],
  noExternal: [
    '@proj-navi/font-cjkfonts-allseto',
    '@proj-navi/font-departure-mono',
    '@proj-navi/font-xiaolai',
  ],
  dts: true,
  sourcemap: true,
  fixedExtension: true,
})
