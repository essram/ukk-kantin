import { Request, Response } from "express";
import { $Enums, PrismaClient } from "@prisma/client";
import { BASE_URL } from "../global";
import fs from "fs"

const prisma = new PrismaClient({ errorFormat: "pretty" })
export const getAllMethod = async (request: Request, response: Response) => {
    try {
        /** get requested data (data has been sent from request) */
        const { search } = request.query

        /** process to get menu, contains means search name of menu based on sent keyword */
        const allMethod = await prisma.paymentmethod.findMany({
            where: { nama: { contains: search?.toString() || "" } }
        })

        return response.json({
            status: true,
            data: allMethod,
            message: `Payment Method has retrieved`
        }).status(200)
    } catch (error) {
        return response
            .json({
                status: false,
                message: `There is an error. ${error}`
            })
            .status(400)
    }
}

export const getByType = async (request: Request, response: Response) => {
    try {
        /** get requested data (data has been sent from request) */
        const { type } = request.query

        /** process to get menu, contains means search name of menu based on sent keyword */
        const allMethod = await prisma.paymentmethod.findMany({
            where: { tipe: type as $Enums.paymentmethod_tipe }
        })

        return response.json({
            status: true,
            data: allMethod,
            message: `Payment Method has retrieved`
        }).status(200)
    } catch (error) {
        return response
            .json({
                status: false,
                message: `There is an error. ${error}`
            })
            .status(400)
    }
}

export const createMethod = async (request: Request, response: Response) => {
    try {
        /** get requested data (data has been sent from request) */
        const { nama, tipe } = request.body
        /** variable filename use to define of uploaded file name */
        let filename = ""
        if (request.file) filename = request.file.filename /** get file name of uploaded file */

        /** process to save new menu, price and stock have to convert in number type */
        const newMethod = await prisma.paymentmethod.create({
            data: { nama, tipe, logo: filename }
        })

        return response.json({
            status: true,
            data: newMethod,
            message: `New Payment Method has created`
        }).status(200)
    } catch (error) {
        return response
            .json({
                status: false,
                message: `There is an error. ${error}`
            })
            .status(400)
    }
}

export const updateMethod = async (request: Request, response: Response) => {
    try {
        /** get id of menu's id that sent in parameter of URL */
        const { id } = request.params
        /** get requested data (data has been sent from request) */
        const { nama, tipe } = request.body

        /** make sure that data is exists in database */
        const findMethod = await prisma.paymentmethod.findFirst({ where: { id: Number(id) } })
        if (!findMethod) return response
            .status(200)
            .json({ status: false, message: `Method is not found` })

        /** default value filename of saved data */
        let filename = findMethod.logo
        if (request.file) {
            /** update filename by new uploaded picture */
            filename = request.file.filename
            /** check the old picture in the folder */
            let path = `${BASE_URL}/../public/logoPayment/${findMethod.logo}`
            let exists = fs.existsSync(path)
            /** delete the old exists picture if reupload new file */
            if(exists && findMethod.logo !== ``) fs.unlinkSync(path)
        }

        /** process to update menu's data */
        const updatedMethod = await prisma.paymentmethod.update({
            data: {
                nama: nama || findMethod.nama,
                tipe: tipe || findMethod.tipe,
                logo: filename
            },
            where: { id: Number(id) }
        })

        return response.json({
            status: true,
            data: updatedMethod,
            message: `Method has updated`
        }).status(200)
    } catch (error) {
        return response
            .json({
                status: false,
                message: `There is an error. ${error}`
            })
            .status(400)
    }
}

export const deleteMethod = async (request: Request, response: Response) => {
    try {
        /** get id of menu's id that sent in parameter of URL */
        const { id } = request.params
        
        /** make sure that data is exists in database */
        const findMethod = await prisma.paymentmethod.findFirst({ where: { id: Number(id) } })
        if (!findMethod) return response
            .status(200)
            .json({ status: false, message: `Payment is not found` })

        /** check the old picture in the folder */
        let path = `${BASE_URL}/../public/logoPayment/${findMethod.logo}`
        let exists = fs.existsSync(path)
        /** delete the old exists picture if reupload new file */
        if(exists && findMethod.logo !== ``) fs.unlinkSync(path)

        /** process to delete menu's data */
        const deletedMethod = await prisma.paymentmethod.delete({
            where: { id: Number(id) }
        })
        return response.json({
            status: true,
            data: deletedMethod,
            message: `Payment has deleted`
        }).status(200)
    } catch (error) {
        return response
            .json({
                status: false,
                message: `There is an error. ${error}`
            })
            .status(400)
    }
}