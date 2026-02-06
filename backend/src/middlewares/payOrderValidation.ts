import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

/** create schema when add new menu's data, all of fileds have to be required */
const addDataSchema= Joi.object({
    id_order: Joi.number().required(),
    id_method: Joi.number().optional(),
    uang_masuk: Joi.number().optional(),
    va: Joi.string().optional(),
    user:Joi.optional(),
    nomor_kartu: Joi.string().optional(),
    status: Joi.string().valid('BELUM_DIBAYAR','LUNAS','CANCELED', 'BELUM_LUNAS').uppercase().required(),

})

/** create schema when edit new menu's data, all of fileds have to be required */
const editDataSchema = Joi.object({
    id_order: Joi.number().optional(),
    id_method: Joi.optional(),
    uang_masuk: Joi.number().optional(),
    user:Joi.optional(),
    va: Joi.string().optional(),
    email: Joi.string().optional(),
    nomor_kartu: Joi.string().optional(),
    status: Joi.string().valid('BELUM_DIBAYAR','LUNAS','CANCELED', 'BELUM_LUNAS').uppercase().optional(),
})


export const verifyAddPayOrder = (request: Request, response: Response, next: NextFunction) => {
    /** validate a request body and grab error if exist */
    const { error } = addDataSchema.validate(request.body, { abortEarly: false })

    if (error) {
        /** if there is an error, then give a response like this */
        return response.status(400).json({
            status: false,
            message: error.details.map(it => it.message).join()
        })
    }
    return next()
}

export const verifyEditPayOrder = (request: Request, response: Response, next: NextFunction) => {
    /** validate a request body and grab error if exist */
    const { error } = editDataSchema.validate(request.body, { abortEarly: false })

    if (error) {
        /** if there is an error, then give a response like this */
        return response.status(400).json({
            status: false,
            message: error.details.map(it => it.message).join()
        })
    }
    return next()
}