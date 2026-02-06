import express from "express"
import { getPesanan } from "../controllers/statistikController"
import { verifyRole, verifyToken } from "../middlewares/authorization"

const app = express()
app.use(express.json())

app.get(`/total-pesanan`, [verifyToken, verifyRole(["SISWA", "ADMIN_STAN"])], getPesanan)

export default app      