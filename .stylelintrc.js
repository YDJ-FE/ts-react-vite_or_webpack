// @ts-nocheck
module.exports = {
    extends: [
        'stylelint-prettier/recommended',
        'stylelint-config-css-modules',
        'stylelint-config-standard',
        'stylelint-config-ydj/scss'
    ],
    rules: {
        'prettier/prettier': true,
        'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['global', 'local'] }],
        'property-no-unknown': [true, { ignoreProperties: ['composes'] }]
    }
}
