export const normalizePostcode = raw =>
    String(raw).replace(/\D/g, '')

export const isValidPostcode = postcode =>
    /^\d{8}$/.test(postcode)