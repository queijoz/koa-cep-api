import Koa from "koa"
import Router from "koa-router"
import addressesRouter from "./routes/addresses.js"

export const app = new Koa()
const router = new Router()

router.use('/addresses', addressesRouter.routes(), addressesRouter.allowedMethods())

app.use(router.routes())
app.use(router.allowedMethods())