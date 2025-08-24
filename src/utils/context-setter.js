/** @typedef {import('koa').ParameterizedContext} Ctx */

/**
 * @returns {{
 *  ok: (ctx: Ctx, result: any) => void,
 *  badRequest: (ctx: Ctx, message?: string) => void,
 *  badGateway: (ctx: Ctx, message?: string) => void,
 *  notFound: (ctx: Ctx, message?: string) => void
 * }}
 */
export const addressesContextSetter = () => ({
    ok: (ctx, result) => {
        ctx.status = 200
        ctx.body = result
    },
    badRequest: (ctx, message = 'Invalid postcode format. Use 8 digits (e.g. 01001000).') => {
        ctx.status = 400
        ctx.body = { error: message }
    },
    notFound: (ctx, message = 'Postcode not found') => {
        ctx.status = 404
        ctx.body = { error: message }
    },
    badGateway: (ctx, message = 'Failed to query upstream service.') => {
        ctx.status = 502
        ctx.body = { error: message }
    }
})
