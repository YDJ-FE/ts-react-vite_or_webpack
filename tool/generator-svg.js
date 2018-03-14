const generator = require('typescript-react-svg-icon-generator')

const config = {
    svgDir: './src/assets/svg/',
    destination: './src/components/Icons/index.tsx',
    tslintDisable: false
}
generator(config)
