// @ts-nocheck
module.exports = {
    extends: ['prettier-stylelint/config.js', 'stylelint-prettier/recommended'],
    plugins: ['stylelint-order'],
    rules: {
        'prettier/prettier': true,
        'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['global', 'local'] }],
        'property-no-unknown': [true, { ignoreProperties: ['composes'] }],
        'order/order': ['custom-properties', 'declarations'],
        'order/properties-alphabetical-order': true
    }
}
