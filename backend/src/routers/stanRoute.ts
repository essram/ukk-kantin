import express from "express"
import { getAllStans, getStanById, updateStanProfile } from "../controllers/stanController"
import uploadFile from "../middlewares/profilUpload"
import { verifyToken, verifyRole } from "../middlewares/authorization"

const app = express()
app.use(express.json())

app.get(`/list-stan`, getAllStans)
app.get(`/profile`, [verifyToken, verifyRole(["SISWA", "ADMIN_STAN"])], getStanById)
app.put(`/profile`, [verifyToken, verifyRole(["ADMIN_STAN"])], updateStanProfile)


export default app