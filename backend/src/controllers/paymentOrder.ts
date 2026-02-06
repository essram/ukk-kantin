import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { BASE_URL } from "../global";
import fs from "fs";

const prisma = new PrismaClient({ errorFormat: "pretty" });
export const getAllPayOrder = async (request: Request, response: Response) => {
  try {
    /** get requested data (data has been sent from request) */

    /** process to get menu, contains means search name of menu based on sent keyword */
    const allPayOrder = await prisma.paymentOrder.findMany();

    return response
      .json({
        status: true,
        data: allPayOrder,
        message: `Payment Order has retrieved`,
      })
      .status(200);
  } catch (error) {
    return response
      .json({
        status: false,
        message: `There is an error. ${error}`,
      })
      .status(400);
  }
};

export const createPayOrder = async (request: Request, response: Response) => {
  try {
    /** get requested data (data has been sent from request) */
    const { id_order, status } = request.body;
    /** variable filename use to define of uploaded file name */

    /** process to save new menu, price and stock have to convert in number type */
    const newPayOrder = await prisma.paymentOrder.create({
      data: {
        status,
        order: {
          connect: {
            id: Number(id_order),
          },
        },
      },
    });

    return response
      .json({
        status: true,
        data: newPayOrder,
        message: `New Payment PayOrder has created`,
      })
      .status(200);
  } catch (error) {
    return response
      .json({
        status: false,
        message: `There is an error. ${error}`,
      })
      .status(400);
  }
};

export const updatePayOrder = async (request: Request, response: Response) => {
  try {
    /** get id of menu's id that sent in parameter of URL */
    const { id } = request.params;
    /** get requested data (data has been sent from request) */
    const { id_order, id_method, uang_masuk, status } = request.body;

    /** make sure that data is exists in database */
    const findPayOrder = await prisma.paymentOrder.findFirst({
      where: { id: Number(id) },
    });
    if (!findPayOrder)
      return response
        .status(200)
        .json({ status: false, message: `PayOrder is not found` });

    /** default value filename of saved data */

    /** process to update menu's data */
    const updatedPayOrder = await prisma.paymentOrder.update({
      data: {
        id_order: id_order || findPayOrder.id_order,
        id_method: id_method || findPayOrder.id_method,
        uang_masuk: uang_masuk || findPayOrder.uang_masuk,
        status: status || findPayOrder.status,
        va: request.body.va || findPayOrder.va,
        nomor_kartu: request.body.nomor_kartu || findPayOrder.nomor_kartu,
      },
      where: { id: Number(id) },
    });

    return response
      .json({
        status: true,
        data: updatedPayOrder,
        message: `PayOrder has updated`,
      })
      .status(200);
  } catch (error) {
    return response
      .json({
        status: false,
        message: `There is an error. ${error}`,
      })
      .status(400);
  }
};

export const updateByOrderId = async (request: Request, response: Response) => {
  try {
    /** get id of menu's id that sent in parameter of URL */
    const { id } = request.params;
    /** get requested data (data has been sent from request) */
    const { id_order, id_method, uang_masuk, status, email } = request.body;

    /** make sure that data is exists in database */
    const findPayOrder = await prisma.paymentOrder.findFirst({
      where: { id_order: Number(id) },
    });
    if (!findPayOrder)
      return response
        .status(200)
        .json({ status: false, message: `PayOrder is not found` });

    /** default value filename of saved data */

    /** process to update menu's data */
    const updatedPayOrder = await prisma.paymentOrder.update({
      data: {
        id_order: id_order || findPayOrder.id_order,
        id_method: parseInt(id_method) || findPayOrder.id_method,
        uang_masuk: uang_masuk || findPayOrder.uang_masuk,
        status: status || findPayOrder.status,
        va: request.body.va || findPayOrder.va,
        nomor_kartu: request.body.nomor_kartu || findPayOrder.nomor_kartu,
        email: request.body.email || findPayOrder.email,
      },
      where: { id: findPayOrder.id },
    });

    return response
      .json({
        status: true,
        data: updatedPayOrder,
        message: `PayOrder has updated`,
      })
      .status(200);
  } catch (error) {
    return response
      .json({
        status: false,
        message: `There is an error. ${error}`,
      })
      .status(400);
  }
};

export const deletePayOrder = async (request: Request, response: Response) => {
  try {
    /** get id of menu's id that sent in parameter of URL */
    const { id } = request.params;

    /** make sure that data is exists in database */
    const findPayOrder = await prisma.paymentOrder.findFirst({
      where: { id: Number(id) },
    });
    if (!findPayOrder)
      return response
        .status(200)
        .json({ status: false, message: `Payment is not found` });

    /** process to delete menu's data */
    const deletedPayOrder = await prisma.paymentOrder.delete({
      where: { id: Number(id) },
    });
    return response
      .json({
        status: true,
        data: deletedPayOrder,
        message: `Payment has deleted`,
      })
      .status(200);
  } catch (error) {
    return response
      .json({
        status: false,
        message: `There is an error. ${error}`,
      })
      .status(400);
  }
};
