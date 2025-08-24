import { app } from "./app.js"
import { log } from "./utils/lib.js"

const PORT = 3000

app.listen(PORT, () => {
    log(`Server listening at localhost:${PORT}`)
})