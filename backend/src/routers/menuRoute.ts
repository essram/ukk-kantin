import express from "express"
import { getAllMenus, createMenu, updateMenu, deleteMenu } from "../controllers/menuController"
import { verifyAddMenu, verifyEditMenu } from "../middlewares/menuValidation"
import { verifyAdminStan, verifyRole, verifyToken } from "../middlewares/authorization"
import uploadFile from "../middlewares/menuUpload"
import { addDiskonToMenu } from "../controllers/diskonController"

const app = express()
app.use(express.json())

app.get(`/`, [verifyToken, verifyRole(["SISWA", "ADMIN_STAN"])], getAllMenus)
app.post(`/`, [verifyToken, verifyRole(["ADMIN_STAN", "SISWA"]), uploadFile.single("picture"), verifyAddMenu], createMenu)
app.put(`/:id`, [verifyToken, verifyRole(["ADMIN_STAN", "SISWA"]), uploadFile.single("picture"), verifyEditMenu], updateMenu)
app.delete(`/:id`, [verifyToken, verifyRole(["ADMIN_STAN", "SISWA"])], deleteMenu)

app.post(`/diskon`, [verifyToken, verifyRole(["ADMIN_STAN"])], verifyAdminStan, addDiskonToMenu) 
app.post(`/add-diskon`, [verifyToken, verifyRole(["ADMIN_STAN"])], verifyAdminStan, addDiskonToMenu)
    
export default app