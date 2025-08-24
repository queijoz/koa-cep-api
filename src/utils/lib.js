import { ENVIRONMENT } from "./env-parser.js"

export const log = (...args) =>
    // eslint-disable-next-line no-console
    console.log(new Date().toLocaleString(), ...args)

export const error = (...args) =>
    // eslint-disable-next-line no-console
    console.error(new Date().toLocaleString(), ...args)

export const situationalDebug = (...args) =>
    ENVIRONMENT === 'development'
    ? log(...args)
    : void 0