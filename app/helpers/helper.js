// String Helper Functions

/**
 * Capitalizes the first letter of a string.
 * @param {string} str - The string to capitalize.
 * @returns {string} The capitalized string.
 */
function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Converts a string to kebab-case.
 * @param {string} str - The string to convert.
 * @returns {string} The kebab-cased string.
 */
function toKebabCase(str) {
    return str
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
}

// Export the helper functions
module.exports = {
    capitalize,
    toKebabCase
};
