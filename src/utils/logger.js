const colors = {
    blue: '\x1b[34m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    reset: '\x1b[0m',
};

const log = (message) => {
    console.log(`${colors.blue}[LOG]${colors.reset} ${message}`);
};

const error = (message) => {
    console.error(`${colors.red}[ERROR]${colors.reset} ${message}`);
};

const warn = (message) => {
    console.warn(`${colors.yellow}[WARN]${colors.reset} ${message}`);
};

module.exports = {
    log,
    error,
    warn,
};
