import * as dotenv from 'dotenv';

/**
 * Get the value of key from env.
 * @param key string
 * @param defaultValue any
 * @returns any
 */
export const env = (key: string, defaultValue: any = null): any => {
    dotenv.config();
    let value = process.env[key] || defaultValue;

    value = +value || value;

    switch (value) {
        case 'true':
        case '(true)':
            return true;
        case 'false':
        case '(false)':
            return false;
        case 'null':
        case '(null)':
            return null;
        case 'undefined':
        case '(undefined)':
            return undefined;
        default:
            return value;
    }
};
