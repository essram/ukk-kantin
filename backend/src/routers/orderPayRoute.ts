import express from "express"
import { getAllPayOrder, createPayOrder, updatePayOrder, deletePayOrder, updateByOrderId } from "../controllers/paymentOrder"
import { verifyAddPayOrder, verifyEditPayOrder } from "../middlewares/payOrderValidation"
import { verifyRole, verifyToken } from "../middlewares/authorization"

const app = express()
app.use(express.json())

app.get(`/`, [verifyToken, verifyRole(["SISWA", "ADMIN_STAN"])], getAllPayOrder)
app.post(`/`, [verifyToken, verifyRole(["SISWA","ADMIN_STAN"]), verifyAddPayOrder], createPayOrder)
app.put(`/:id`, [verifyToken, verifyRole(["SISWA","ADMIN_STAN"]), verifyEditPayOrder], updatePayOrder )
app.put(`/updateByOrderId/:id`, [verifyToken, verifyRole(["SISWA","ADMIN_STAN"]), verifyEditPayOrder], updateByOrderId )
app.delete(`/:id`, [verifyToken, verifyRole(["SISWA","ADMIN_STAN"])], deletePayOrder)

export default app