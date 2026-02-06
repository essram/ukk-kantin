import express from "express"
import { getAllStans, getStanById } from "../controllers/stanController"
import uploadFile from "../middlewares/profilUpload"
import { verifyToken, verifyRole } from "../middlewares/authorization"

const app = express()
app.use(express.json())

app.get(`/list-stan`, getAllStans)
app.get(`/profile`, [verifyToken, verifyRole(["SISWA", "ADMIN_STAN"])], getStanById)
// app.put(`/:id`, [verifyToken, verifyRole(["SISWA", "ADMIN_STAN"]), uploadFile.single("profil_picture"), verifyEditUser], updateUser)
// app.put(`/profile/:id`, [verifyToken, verifyRole(["SISWA", "ADMIN_STAN"]), uploadFile.single("profil_picture")], changePicture)
// app.delete(`/:id`, [verifyToken, verifyRole(["ADMIN_STAN"])], deleteUser)
// app.post(`/login`, [verifyAuthentication], authentication)

export default app