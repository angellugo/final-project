module.exports = {
    "extends": "google",
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
    },
    "rules": {
        "new-cap": ["error", { "capIsNewExceptions": ["Router"] }],
        "max-len": ["error", { "code": 500 }]
    }
};