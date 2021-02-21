const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    purge: ["./src/components/*.vue"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                sans: ['Lato', ...defaultTheme.fontFamily.sans]
            }
        },
    },
    variants: {

    },
    plugins: [],
};
