import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { BASE_URL } from "../global";
import fs from "fs";

const prisma = new PrismaClient({ errorFormat: "pretty" });
const now = new Date();

export const getAllMenus = async (req: Request, res: Response) => {
  try {
    const { search, category, id_stan } = req.query;
    const filters: any[] = [];

    filters.push({
      name: { contains: search?.toString() || "" },
    });

    if (category && category !== "all") {
      filters.push({ id_category: Number(category) });
    }

    if (id_stan) {
      filters.push({ id_stan: Number(id_stan) });
    }

    const now = new Date();

    const menus = await prisma.menu.findMany({
      where: { AND: filters },
      include: {
        category: true,
        stan: true,
        menu_diskon: {
          include: { diskon: true },
        },
      },
    });

    const result = menus.map((menu) => {
      const activeDiskons = menu.menu_diskon
        .filter(
          (md) =>
            md.diskon.tanggal_awal <= now &&
            md.diskon.tanggal_akhir >= now
        )
        .map((md) => md.diskon);

      const bestDiskon =
        activeDiskons.length > 0
          ? activeDiskons.reduce((max, curr) =>
              curr.persentase_diskon > max.persentase_diskon ? curr : max
            )
          : null;

      const finalPrice = bestDiskon
        ? menu.price -
          (menu.price * bestDiskon.persentase_diskon) / 100
        : menu.price;

      return {
        ...menu,
        diskon: bestDiskon,
        finalPrice,
      };
    });

    const totalMenus = await prisma.menu.count({
      where: { AND: filters },
    });

    res.status(200).json({
      status: true,
      data: result,
      totalMenus,
      message: "Menus has retrieved",
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: `${error}`,
    });
  }
};


export const createMenu = async (request: Request, response: Response) => {
  try {
    /** get requested data (data has been sent from request) */
    const { name, price, category, description, stan_id } = request.body;
    const uuid = uuidv4();

    /** variable filename use to define of uploaded file name */
    let filename = "";
    if (request.file)
      filename = request.file.filename; /** get file name of uploaded file */

    /** process to save new menu, price and stock have to convert in number type */
    const newMenu = await prisma.menu.create({
      data: {
        uuid,
        name,
        price: Number(price),
        id_category: parseInt(category),
        description,
        picture: filename,
        id_stan: parseInt(stan_id),
      },
    });

    return response
      .json({
        status: true,
        data: newMenu,
        message: `New Menu has created`,
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

export const updateMenu = async (request: Request, response: Response) => {
  try {
    /** get id of menu's id that sent in parameter of URL */
    const { id } = request.params;
    /** get requested data (data has been sent from request) */
    const { name, price, category, description } = request.body;

    /** make sure that data is exists in database */
    const findMenu = await prisma.menu.findFirst({ where: { id: Number(id) } });
    if (!findMenu)
      return response
        .status(200)
        .json({ status: false, message: `Menu is not found` });

    /** default value filename of saved data */
    let filename = findMenu.picture;
    if (request.file) {
      /** update filename by new uploaded picture */
      filename = request.file.filename;
      /** check the old picture in the folder */
      let path = `${BASE_URL}/../public/menu_picture/${findMenu.picture}`;
      let exists = fs.existsSync(path);
      /** delete the old exists picture if reupload new file */
      if (exists && findMenu.picture !== ``) fs.unlinkSync(path);
    }

    /** process to update menu's data */
    const updatedMenu = await prisma.menu.update({
      data: {
        name: name || findMenu.name,
        price: price ? Number(price) : findMenu.price,
        id_category: parseInt(category) || findMenu.id_category,
        description: description || findMenu.description,
        picture: filename,
      },
      where: { id: Number(id) },
    });

    return response
      .json({
        status: true,
        data: updatedMenu,
        message: `Menu has updated`,
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

export const deleteMenu = async (request: Request, response: Response) => {
  try {
    /** get id of menu's id that sent in parameter of URL */
    const { id } = request.params;

    /** make sure that data is exists in database */
    const findMenu = await prisma.menu.findFirst({ where: { id: Number(id) } });
    if (!findMenu)
      return response
        .status(200)
        .json({ status: false, message: `Menu is not found` });

    /** check the old picture in the folder */
    let path = `${BASE_URL}/../public/menu_picture/${findMenu.picture}`;
    let exists = fs.existsSync(path);
    /** delete the old exists picture if reupload new file */
    if (exists && findMenu.picture !== ``) fs.unlinkSync(path);

    /** process to delete menu's data */
    const deletedMenu = await prisma.menu.delete({
      where: { id: Number(id) },
    });
    return response
      .json({
        status: true,
        data: deletedMenu,
        message: `Menu has deleted`,
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
