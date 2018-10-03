module.exports = {
    "extends": "google",
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
    },
    "rules": {
        "new-cap": ["error", { "capIsNewExceptions": ["Router"] }]
    }
};