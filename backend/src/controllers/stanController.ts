import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import { BASE_URL, SECRET } from "../global";
import { v4 as uuidv4 } from "uuid";
import md5 from "md5";
import { sign } from "jsonwebtoken";
import { profile } from "console";

const prisma = new PrismaClient({ errorFormat: "pretty" })

export const getAllStans = async (request: Request, response: Response) => {
    try {
        /** get requested data (data has been sent from request) */
        const { search } = request.query

        /** process to get user, contains means search name of user based on sent keyword */
        const allStan = await prisma.admin_stan.findMany({
            where: { nama: { contains: search?.toString() || "" } }
        })

        const totalStans = await prisma.admin_stan.count({});
        
        return response.json({
            status: true,
            data: allStan,
            message: `stan has retrieved`,
            totalStans
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

export const getStanById = async (request: Request, response: Response) => {
    try {
        /** get requested data (data has been sent from request) */
        const { id } = request.body.admin_stan

        if (!id) {
            return response
            .json({
                status: false,
                message: `Stan Not Found`
            })
            .status(400)
        }

        /** process to get user, contains means search name of user based on sent keyword */
        const allStan = await prisma.admin_stan.findFirst({
            where: { id: Number(id) }
        })

        return response.json({
            status: true,
            data: allStan,
            message: `stan has retrieved`
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