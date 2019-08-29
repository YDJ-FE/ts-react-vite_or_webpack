// @ts-nocheck
module.exports = {
    extends: ['stylelint-config-css-modules', 'stylelint-config-standard', 'stylelint-config-ydj/scss'],
    rules: {
        'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['global', 'local'] }],
        'property-no-unknown': [true, { ignoreProperties: ['composes'] }],
    }
}
