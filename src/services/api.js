import { fetchPostcode as viacepFetchPostcode } from "./viacep.js"


const FETCH_POSTCODE_STRATEGIES = [
    viacepFetchPostcode
]


/** @returns {Promise<import("./normalizer.js").NormalizedFetchPostcode | null>} */
export const fetchPostcode = postcode =>
    Promise.any(FETCH_POSTCODE_STRATEGIES.map(fetch => fetch(postcode)))