import { setCache, getCache } from '../src/services/cache.js'

jest.useFakeTimers()

test('expira após TTL', () => {
    setCache('k', 'v', 1000)
    expect(getCache('k')).toBe('v')
    jest.advanceTimersByTime(1001)
    expect(getCache('k')).toBe(false)
})
