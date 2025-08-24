import Router from "koa-router"
import { fetchPostcode } from "../services/api.js"
import { situationalDebug } from "../utils/lib.js"
import { addressesContextSetter } from "../utils/context-setter.js"
import { isValidPostcode, normalizePostcode } from "../utils/validator.js"

const router = new Router()
const { ok, badRequest, notFound, badGateway } = addressesContextSetter()

// GET /addresses/:postcode
router.get('/:postcode', async ctx => {
    try {
        const raw = ctx.params.postcode || ''
        const postcode = normalizePostcode(raw)

        if (!isValidPostcode(postcode))
            return badRequest(ctx)

        const result = await fetchPostcode(postcode)

        if (result === null)
            return notFound(ctx)

        ok(ctx, result)
    } catch (err) {
        situationalDebug(err)
        badGateway(ctx)
    }
})

export default router