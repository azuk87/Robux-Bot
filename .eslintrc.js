module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true
    },
    "extends": "eslint:recommended",
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "rules": {
        "prefer-readonly": "off",
        "await-promise": "off",
        "no-for-in-array": "off",
        "no-null-undefined-union": "off",
        "no-promise-as-boolean": "off",
        "no-void-expression": "off",
        "strict-string-expressions": "off",
        "strict-comparisons": "off",
        "use-default-type-parameter": "off",
        "no-boolean-literal-compare": "off",
        "no-unnecessary-qualifier": "off",
        "no-unnecessary-type-assertion": "off",
        "expect": "off",
        "no-import-default-of-export-equals": "off",
        "no-relative-import-in-test": "off",
        "no-unnecessary-generics": "off",
        "strict-export-declare-modifiers": "off",
        "no-single-declare-module": "off",
        "no-unnecessary-class": "off",
        "array-type": ["error", { "default": "array" }],
        "one-line": "off",
        "no-any-union": "off",
        "void-return": "off",
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
}