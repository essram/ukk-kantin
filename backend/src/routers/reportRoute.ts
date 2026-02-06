import express from "express"
import { getDashboard, getFavourite } from "../controllers/reportController"
import { verifyRole, verifyToken } from "../middlewares/authorization"

const app = express()
app.use(express.json())

app.get(`/dashboard`, [verifyToken, verifyRole(["SISWA", "ADMIN_STAN"])], getDashboard)
app.get(`/favorite`, [verifyToken, verifyRole(["SISWA", "ADMIN_STAN"])], getFavourite)

export default app