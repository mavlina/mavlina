function capitalize(string) {
    if (typeof string !== 'string') return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatDate(date) {
    if (!(date instanceof Date)) return '';
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

module.exports = {
    capitalize,
    formatDate,
};
