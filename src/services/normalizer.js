import { stateToRegion } from "../utils/regions.js"

/**
 * @typedef {{
 *  postcode: string,
 *  line1: string,
 *  line2: string,
 *  neighborhood: string,
 *  city: string,
 *  state: string,
 *  meta: {
 *      phoneCode: string,
 *      ibgeCode: string,
 *      region: string
 *  }
 * }} NormalizedFetchPostcode
 */

/**
 * @returns {{
 *  fetchPostcode: (postcode: string, data: any) => NormalizedFetchPostcode
 * }}
 */
export const viaCepNormalizer = () => ({
    fetchPostcode: (postcode, data) => ({
        postcode,
        line1: data?.logradouro || null,
        line2: data?.complemento || null,
        neighborhood: data?.bairro || null,
        city: data?.localidade || null,
        state: data?.uf || null,
        meta: {
            phoneCode: data?.ddd || null,
            ibgeCode: data?.ibge || null,
            region: data?.uf ? stateToRegion(data.uf) : null,
        },
    })
})