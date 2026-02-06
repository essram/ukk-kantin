import express from "express"
import { getAllCategory, createCategory, updateCategory, deleteCategory, TotalItems } from "../controllers/categoryController"
import { verifyAddCategory, verifyEditCategory } from "../middlewares/categoryValidation"
import { verifyRole, verifyToken } from "../middlewares/authorization"
import uploadFile from "../middlewares/menuUpload"

const app = express()
app.use(express.json())

app.get(`/`, [verifyToken, verifyRole(["SISWA", "ADMIN_STAN"])], getAllCategory)
app.get(`/items`, [verifyToken, verifyRole(["SISWA", "ADMIN_STAN"])], TotalItems)
app.post(`/`, [verifyToken, verifyRole(["ADMIN_STAN", "SISWA"]),  verifyAddCategory], createCategory)
app.put(`/:id`, [verifyToken, verifyRole(["ADMIN_STAN", "SISWA"]),  verifyEditCategory], updateCategory )
app.delete(`/:id`, [verifyToken, verifyRole(["ADMIN_STAN", "SISWA"])], deleteCategory)

export default app