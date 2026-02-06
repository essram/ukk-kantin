import { Request, Response } from "express";
import { $Enums, PrismaClient } from "@prisma/client";
import { BASE_URL } from "../global";
import fs from "fs";

const prisma = new PrismaClient({ errorFormat: "pretty" });
export const getAllCategory = async (request: Request, response: Response) => {
  try {
    /** get requested data (data has been sent from request) */
    const { search } = request.query;

    /** process to get menu, contains means search name of menu based on sent keyword */
    const allCategory = await prisma.category.findMany({
      where: { name: { contains: search?.toString() || "" } },
    });

    return response
      .json({
        status: true,
        data: allCategory,
        message: `Payment Category has retrieved`,
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

// export const getByType = async (request: Request, response: Response) => {
//     try {
//         /** get requested data (data has been sent from request) */
//         const { type } = request.query

//         /** process to get menu, contains means search name of menu based on sent keyword */
//         const allCategory = await prisma.category.findMany({
//             where: { tipe: type as $Enums.paymentmethod_tipe }
//         })

//         return response.json({
//             status: true,
//             data: allCategory,
//             message: `Payment Category has retrieved`
//         }).status(200)
//     } catch (error) {
//         return response
//             .json({
//                 status: false,
//                 message: `There is an error. ${error}`
//             })
//             .status(400)
//     }
// }

export const createCategory = async (request: Request, response: Response) => {
  try {
    /** get requested data (data has been sent from request) */
    const { name, icon } = request.body;
    /** variable filename use to define of uploaded file name */
    // let filename = ""
    // if (request.file) filename = request.file.filename /** get file name of uploaded file */

    /** process to save new menu, price and stock have to convert in number type */
    const newCategory = await prisma.category.create({
      data: { name, icon },
    });

    return response
      .json({
        status: true,
        data: newCategory,
        message: `New Payment Category has created`,
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

export const updateCategory = async (request: Request, response: Response) => {
  try {
    /** get id of menu's id that sent in parameter of URL */
    const { id } = request.params;
    /** get requested data (data has been sent from request) */
    const { name, icon } = request.body;

    /** make sure that data is exists in database */
    const findCategory = await prisma.category.findFirst({
      where: { id: Number(id) },
    });
    if (!findCategory)
      return response
        .status(200)
        .json({ status: false, message: `Category is not found` });

    /** default value filename of saved data */

    /** process to update menu's data */
    const updatedCategory = await prisma.category.update({
      data: {
        name: name || findCategory.name,
        icon: icon || findCategory.icon,
      },
      where: { id: Number(id) },
    });

    return response
      .json({
        status: true,
        data: updatedCategory,
        message: `Category has updated`,
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

export const deleteCategory = async (request: Request, response: Response) => {
  try {
    /** get id of menu's id that sent in parameter of URL */
    const { id } = request.params;

    /** make sure that data is exists in database */
    const findCategory = await prisma.category.findFirst({
      where: { id: Number(id) },
    });
    if (!findCategory)
      return response
        .status(200)
        .json({ status: false, message: `Payment is not found` });

    /** check the old picture in the folder */
    // let path = `${BASE_URL}/../public/logoPayment/${findCategory.logo}`
    // let exists = fs.existsSync(path)
    // /** delete the old exists picture if reupload new file */
    // if(exists && findCategory.logo !== ``) fs.unlinkSync(path)

    /** process to delete menu's data */
    const deletedCategory = await prisma.category.delete({
      where: { id: Number(id) },
    });
    return response
      .json({
        status: true,
        data: deletedCategory,
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

export const TotalItems = async (request: Request, response: Response) => {
  try {
    const { search, id_stan } = request.query;

    const allCategory = await prisma.category.findMany({
      where: {
        name: {
          contains: search?.toString() || "",
        },
      },
      include: {
        _count: {
          select: {
            menu: {
              where: {
                id_stan: id_stan ? Number(id_stan) : undefined,
              },
            },
          },
        },
      },
    });

    const formatted = allCategory.map((cat) => ({
      id: cat.id,
      name: cat.name,
      icon: cat.icon,
      menuCount: cat._count.menu,
    }));

    return response.status(200).json({
      status: true,
      data: formatted,
      message: `Category list retrieved`,
    });
  } catch (error) {
    return response.status(400).json({
      status: false,
      message: `There is an error. ${error}`,
    });
  }
};

