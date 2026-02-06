import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient({ errorFormat: "pretty" })

export const getAllDiskon = async (req: Request, res: Response) => {
  const diskon = await prisma.diskon.findMany({
    orderBy: { tanggal_awal: "desc" },
  });

  res.json({
    status: true,
    data: diskon,
  });
};

export const createDiskon = async (req: Request, res: Response) => {
  try {
    const { nama_diskon, persentase_diskon, tanggal_awal, tanggal_akhir } =
      req.body;

    const diskon = await prisma.diskon.create({
      data: {
        nama_diskon,
        persentase_diskon: Number(persentase_diskon),
        tanggal_awal: new Date(tanggal_awal),
        tanggal_akhir: new Date(tanggal_akhir),
      },
    });

    res.status(200).json({
      status: true,
      data: diskon,
      message: "Diskon berhasil dibuat",
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: err,
    });
  }
};

export const addDiskonToMenu = async (req: Request, res: Response) => {
  try {
    const { id_menu, id_diskon } = req.body

    const exists = await prisma.menu_diskon.findFirst({
      where: {
        id_menu: Number(id_menu),
        id_diskon: Number(id_diskon)
      }
    })

    if (exists) {
      return res.json({
        status: false,
        message: "Diskon sudah diterapkan ke menu ini"
      })
    }

    const data = await prisma.menu_diskon.create({
      data: {
        id_menu: Number(id_menu),
        id_diskon: Number(id_diskon)
      }
    })

    res.json({
      status: true,
      data,
      message: "Diskon berhasil ditambahkan ke menu"
    })
  } catch (err) {
    res.status(400).json({
      status: false,
      message: err
    })
  }
}

