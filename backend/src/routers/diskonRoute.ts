import express from "express"
import {
  createDiskon,
  getAllDiskon
} from "../controllers/diskonController"

const router = express.Router()

router.post("/", createDiskon)
router.get("/", getAllDiskon)

export default router
    