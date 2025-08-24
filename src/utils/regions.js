/** @typedef {'Norte'|'Nordeste'|'Centro-Oeste'|'Sudeste'|'Sul'} RegionName */

const REGIONS = {
    ac: 'Norte',
    al: 'Nordeste',
    ap: 'Norte',
    am: 'Norte',
    ba: 'Nordeste',
    ce: 'Nordeste',
    df: 'Centro-Oeste',
    es: 'Sudeste',
    go: 'Centro-Oeste',
    ma: 'Nordeste',
    mt: 'Centro-Oeste',
    ms: 'Centro-Oeste',
    mg: 'Sudeste',
    pa: 'Norte',
    pb: 'Nordeste',
    pr: 'Sul',
    pe: 'Nordeste',
    pi: 'Nordeste',
    rj: 'Sudeste',
    rn: 'Nordeste',
    rs: 'Sul',
    ro: 'Norte',
    rr: 'Norte',
    sc: 'Sul',
    sp: 'Sudeste',
    to: 'Norte'
}

/**
 * @param {string} state
 * @returns {RegionName | undefined}
 */
export const stateToRegion = state => REGIONS[state.toLowerCase().trim()]