module.exports = {
    "extends": "google",
    "parserOptions": {
        "ecmaVersion": 6,
    },
    "rules": {
        "new-cap": ["error", { "capIsNewExceptions": ["Router"] }]
    }
};