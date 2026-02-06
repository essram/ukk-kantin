import express from "express"
import { getAllOrders, createOrder, updateStatusOrder, deleteOrder, getOrderById, getAllHistory, getHistoryById, updateStatusById } from "../controllers/orderController"
import { verifyAddOrder, verifyEditStatus } from "../middlewares/orderValidation"
import { verifyRole, verifyToken } from "../middlewares/authorization"

const app = express()
app.use(express.json())

app.get(`/`, [verifyToken, verifyRole(["SISWA", "ADMIN_STAN"])], getAllOrders)
app.get(`/history`, [verifyToken, verifyRole(["SISWA", "ADMIN_STAN"])], getAllHistory)
app.get(`/history/:id`, [verifyToken, verifyRole(["SISWA", "ADMIN_STAN"])], getHistoryById)
app.post(`/`, [verifyToken, verifyRole(["SISWA"]), verifyAddOrder], createOrder)
app.put(`/:id`, [verifyToken, verifyRole(["SISWA"])], updateStatusById)
app.get(`/:id`, [verifyToken, verifyRole(["SISWA"])], getOrderById)
app.delete(`/:id`, [verifyToken, verifyRole(["ADMIN_STAN"])], deleteOrder)

export default app