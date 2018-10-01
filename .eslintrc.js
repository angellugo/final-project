module.exports = {
    "extends": "google",
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "parser": "babel-eslint"
    },
    "rules": {
        "new-cap": ["error", { "capIsNewExceptions": ["Router"] }]
    }
};