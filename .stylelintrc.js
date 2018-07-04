// @ts-nocheck
module.exports = {
    ignoreFiles: [
        'node_modules/**/*.scss',
        '**/*.md',
        '**/*.ts',
        '**/*.tsx',
        '**/*.js'
    ],
    extends: [
        'stylelint-config-standard',
        'stylelint-config-ydj/scss',
        'stylelint-config-css-modules'
    ]
}
