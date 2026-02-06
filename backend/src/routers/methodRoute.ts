import express from "express"
import { getAllMethod, createMethod, updateMethod, deleteMethod, getByType } from "../controllers/paymentMethodController"
import { verifyAddMethod, verifyEditMethod } from "../middlewares/methodValidation"
import { verifyRole, verifyToken } from "../middlewares/authorization"
import uploadFile from "../middlewares/menuUpload"

const app = express()
app.use(express.json())

app.get(`/`, [verifyToken, verifyRole(["SISWA", "ADMIN_STAN"])], getAllMethod)
app.get(`/tipe`, [verifyToken, verifyRole(["SISWA", "ADMIN_STAN"])], getByType)
app.post(`/`, [verifyToken, verifyRole(["ADMIN_STAN", "SISWA"]), uploadFile.single("logo"), verifyAddMethod], createMethod)
app.put(`/:id`, [verifyToken, verifyRole(["ADMIN_STAN", "SISWA"]), uploadFile.single("logo"), verifyEditMethod], updateMethod )
app.delete(`/:id`, [verifyToken, verifyRole(["ADMIN_STAN", "SISWA"])], deleteMethod)

export default app