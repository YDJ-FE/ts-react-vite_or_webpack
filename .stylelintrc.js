// @ts-nocheck
module.exports = {
    extends: ['stylelint-prettier/recommended', 'stylelint-config-ydj/scss', 'stylelint-config-ydj/prettier'],
    rules: {
        'prettier/prettier': true,
        'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['global', 'local'] }],
        'property-no-unknown': [true, { ignoreProperties: ['composes'] }]
    }
}
