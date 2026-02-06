import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ errorFormat: "pretty" });

export const getPesanan = async (request: Request, response: Response) => {
  try {
    const { id } = request.query;
    let totalOrderBulanIni = 0;
    let totalPesanan = 0;
    let todayOrder = 0;
    let sumTodayOrder = 0;
    let sumMonthlyOrder = 0;
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59,
      999
    );
    if (id) {
      const allPesanan = await prisma.order.count({
        where: { userId: Number(id), status: "DELIVERED" },
      });
      console.log(allPesanan);
      
      totalPesanan = allPesanan;

      const todayOrders = await prisma.order.count({
        where: {
          userId: Number(id),
          status: "DELIVERED",
          createdAt: {
            gte: startOfToday,
            lte: endOfToday, 
          },
        },
      });

      todayOrder = todayOrders;

      const monthlyOrders = await prisma.order.count({
        where: {
          userId: Number(id),
          status: "DELIVERED",
          createdAt: {
            gte: startOfMonth,
            lte: endOfMonth,
          },
        },
      });
      totalOrderBulanIni = monthlyOrders;

      const totalToday = await prisma.order.aggregate({
        _sum: {
          total_price: true,
        },
        where: {
          userId: Number(id),
          status: "DELIVERED",
          createdAt: {
            gte: startOfToday,
            lte: endOfToday,
          },
        },
      });
      const totalPriceToday = totalToday._sum.total_price || 0;
      sumTodayOrder = totalPriceToday;

      const monthlyTotal = await prisma.order.aggregate({
        _sum: {
          total_price: true,
        },
        where: {
          userId: Number(id),
          status: "DELIVERED",
          createdAt: {
            gte: startOfMonth,
            lte: endOfMonth,
          },
        },
      });
      const totalPriceMonthly = monthlyTotal._sum.total_price || 0;
      sumMonthlyOrder = totalPriceMonthly;
    } else {
      const allPesanan = await prisma.order.count({
        where: { status: "DELIVERED" },
      });
      totalPesanan = allPesanan;
      const todayOrders = await prisma.order.count({
        where: {
          status: "DELIVERED",
          createdAt: {
            gte: startOfToday,
            lte: endOfToday,
          },
        },
      });

      todayOrder = todayOrders;

      const monthlyOrders = await prisma.order.count({
        where: {
          status: "DELIVERED",
          createdAt: {
            gte: startOfMonth,
            lte: endOfMonth,
          },
        },
      });
      totalOrderBulanIni = monthlyOrders;

      const totalToday = await prisma.order.aggregate({
        _sum: {
          total_price: true,
        },
        where: {
          status: "DELIVERED",
          createdAt: {
            gte: startOfToday,
            lte: endOfToday,
          },
        },
      });
      const totalPriceToday = totalToday._sum.total_price || 0;
      sumTodayOrder = totalPriceToday;

      const monthlyTotal = await prisma.order.aggregate({
        _sum: {
          total_price: true,
        },
        where: {
          status: "DELIVERED",
          createdAt: {
            gte: startOfMonth,
            lte: endOfMonth,
          },
        },
      });
      const totalPriceMonthly = monthlyTotal._sum.total_price || 0;
      sumMonthlyOrder = totalPriceMonthly;
    }

    const data = {
      totalPesanan,
      todayOrder,
      totalOrderBulanIni,
      sumTodayOrder,
      sumMonthlyOrder,
    };
    return response.status(200).json({
      status: true,
      data,
      message: `Nomor Meja has been retrieved`,
    });
  } catch (error) {
    return response.status(400).json({
      status: false,
      message: `There is an error. ${error}`,
    });
  }
};
