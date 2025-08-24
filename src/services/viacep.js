import axios from "axios"
import { getCache, setCache } from "./cache.js"
import { viaCepNormalizer } from "./normalizer.js"

/**
 * @typedef {{
 *  erro?: true,
 *  cep?: string
 *  logradouro?: string
 *  complemento?: string
 *  unidade?: string
 *  bairro?: string
 *  localidade?: string
 *  uf?: string
 *  estado?: string
 *  regiao?: string
 *  ibge?: string
 *  gia?: string
 *  ddd?: string
 *  siafi?: string
 * }} ViacepResponseData
 */

const BASE_URL = 'https://viacep.com.br/ws'
const CACHE_PREFIX = 'viacep:'
const REQUEST_TIMEOUT = 8 * 1000 // 8 seconds

const normalizer = viaCepNormalizer()

/**
 * @param {string} postcode
 * @throws {Error}
 * @returns {Promise<import("./normalizer.js").NormalizedFetchPostcode | null>}
*/
export async function fetchPostcode (postcode) {
    const cacheKey = CACHE_PREFIX + postcode
    const cached = getCache(cacheKey)
    if (cached !== false) return cached

    const url = `${BASE_URL}/${postcode}/json/`

    /** @type {{ data: ViacepResponseData }} */
    const { data } = await axios.get(url, { timeout: REQUEST_TIMEOUT })

    if (data?.erro) {

        setCache(cacheKey, null)
        return null
    }

    const normalizedData = normalizer.fetchPostcode(postcode, data)

    setCache(cacheKey, normalizedData)
    return normalizedData
}