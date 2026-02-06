import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient({ errorFormat: "pretty" });
export const getAllOrders = async (request: Request, response: Response) => {
  try {
    /** get requested data (data has been sent from request) */
    const { search } = request.query;

    /** process to get order, contains means search name or table number of customer's order based on sent keyword */
    const allOrders = await prisma.order.findMany({
      where: {
        OR: [{ customer: { contains: search?.toString() || "" } }],
      },
      orderBy: { createdAt: "desc" },
      include: {
        user: true,
        transaction_detail: {
          include: { menu: true },
        },
      },
    });
    return response
      .json({
        status: true,
        data: allOrders,
        message: `Order list has retrieved`,
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

export const createOrder = async (request: Request, response: Response) => {
  try {
    /** get requested data (data has been sent from request) */
    const {
      customer,
      transaction_details,
      note,
      dine_in,
      user_id,
      admin_stan_id,
      siswa_id,
    } = request.body;
    console.log(request.body);

    // const user = request.body.user;
    const uuid = uuidv4();
    /**
     * assume that "transaction_details" is an array of object that has keys:
     * menuId, quantity, note
     * */

    /** loop details of order to check menu and count the total price */
    let total_price = 0;
    for (let index = 0; index < transaction_details.length; index++) {
      const { id, price } = transaction_details[index];
      const detailMenu = await prisma.menu.findFirst({
        where: {
          id,
        },
      });
      if (!detailMenu)
        return response
          .status(200)
          .json({ status: false, message: `Menu with id ${id} is not found` });
      total_price += price * transaction_details[index].qty;
    }

    /** process to save new order */
    const newOrder = await prisma.order.create({
      data: {
        uuid,
        customer,
        total_price,
        note,
        dine_in: parseInt(dine_in),
        status: "PENDING",
        tanggal: new Date(),
        location: "Kantin A",

        user: {
          connect: { id: user_id },
        },
        
        admin_stan: {
          connect: { id: admin_stan_id },
        },

        siswa: {
          connect: { id: siswa_id },
        },
      },
    });

    // NOTE BELUM
    /** loop details of Order to save in database */
    for (let index = 0; index < transaction_details.length; index++) {
      const uuid = uuidv4();
      const { id, qty, price } = transaction_details[index];
      let subTotal = price * qty;
      await prisma.transaction_detail.create({
        data: {
          uuid,
          orderId: newOrder.id,
          menuId: Number(id),
          quantity: Number(qty),
          subTotal: Number(subTotal),
          price: Number(price),
        },
      });
    }
    return response
      .json({
        status: true,
        data: newOrder,
        message: `New Order has created`,
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

export const updateStatusOrder = async (
  request: Request,
  response: Response,
) => {
  try {
    /** get id of order's id that sent in parameter of URL */
    const { id } = request.params;
    /** get requested data (data has been sent from request) */
    const { status } = request.body;
    const user = request.body.user;

    /** make sure that data is exists in database */
    const findOrder = await prisma.order.findFirst({
      where: { id: Number(id) },
    });
    if (!findOrder)
      return response
        .status(200)
        .json({ status: false, message: `Order is not found` });

    /** process to update menu's data */
    const updatedStatus = await prisma.order.update({
      data: {
        status: status || findOrder.status,
        userId: user.id ? user.id : findOrder.userId,
      },
      where: { id: Number(id) },
    });

    return response
      .json({
        status: true,
        data: updatedStatus,
        message: `Order has updated`,
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

export const deleteOrder = async (request: Request, response: Response) => {
  try {
    /** get id of order's id that sent in parameter of URL */
    const { id } = request.params;

    /** make sure that data is exists in database */
    const findOrder = await prisma.order.findFirst({
      where: { id: Number(id) },
    });
    if (!findOrder)
      return response
        .status(200)
        .json({ status: false, message: `Order is not found` });

    /** process to delete details of order */
    let deletetransaction_detail = await prisma.transaction_detail.deleteMany({
      where: { orderId: Number(id) },
    });
    /** process to delete of Order */
    let deleteOrder = await prisma.order.delete({ where: { id: Number(id) } });

    return response
      .json({
        status: true,
        data: deleteOrder,
        message: `Order has deleted`,
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

export const getOrderById = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;

    const order = await prisma.order.findUnique({
      where: { id: Number(id) },
      include: {
        user: true,
        transaction_detail: {
          include: { menu: true },
        },
      },
    });

    if (!order) {
      return response.status(404).json({
        status: false,
        message: "Order not found",
      });
    }

    return response.status(200).json({
      status: true,
      data: order,
      message: `Order with ID ${id} has been retrieved`,
    });
  } catch (error) {
    return response.status(400).json({
      status: false,
      message: `There is an error. ${error}`,
    });
  }
};

export const getAllHistory = async (req: Request, res: Response) => {
  try {
    const { id, id_stan } = req.query;
    let orders;
    const whereClause: any = {}

if (id) {
  whereClause.id_siswa = Number(id)
}

if (id_stan) {
  whereClause.id_stan = Number(id_stan)
}
    orders = await prisma.order.findMany({
      where: whereClause,
      include: {
        user: { select: { id: true, name: true, email: true } },
        transaction_detail: {
          include: {
            menu: {
              select: { id: true, name: true, price: true, category: true },
            },
          },
        },
        // nomor_meja: {
        //   select: { id: true, nomor: true },
        // },
        PaymentOrder: {
          include: {
            paymentMethod: {
              select: { id: true, nama: true, tipe: true, logo: true },
            },
          },
        },
      },
    });
    // if (id) {
    //   console.log(orders);
    // } else {
    //   orders = await prisma.order.findMany({
    //     include: {
    //       user: { select: { id: true, name: true, email: true } },
    //       transaction_detail: {
    //         include: {
    //           menu: {
    //             select: { id: true, name: true, price: true, category: true },
    //           },
    //         },
    //       },
    //       // nomor_meja: {
    //       //   select: { id: true, nomor: true },
    //       // },
    //       PaymentOrder: {
    //         include: {
    //           paymentMethod: {
    //             select: { id: true, nama: true, tipe: true, logo: true },
    //           },
    //         },
    //       },
    //     },
    //   });
    // }

    res.status(200).json({
      status: true,
      data: orders,
      message: "All orders retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: `Error retrieving orders: ${error}`,
    });
  }
};

export const getHistoryById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const orders = await prisma.order.findFirst({
      include: {
        user: { select: { id: true, name: true, email: true } }, // Data user
        transaction_detail: {
          include: {
            menu: {
              select: { id: true, name: true, category: true },
            }, // Data menu
          },
        },
        // nomor_meja: {
        //   select: {
        //     id: true,
        //     nomor: true,
        //   },
        // },
        PaymentOrder: {
          include: {
            paymentMethod: {
              select: { id: true, nama: true, tipe: true, logo: true },
            }, // Metode pembayaran
          },
        },
      },
      where: {
        OR: [{ id: parseInt(id) }],
      },
    });

    res.status(200).json({
      status: true,
      data: orders,
      message: "All orders retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: `Error retrieving orders: ${error}`,
    });
  }
};

export const updateStatusById = async (
  request: Request,
  response: Response,
) => {
  try {
    /** get id of menu's id that sent in parameter of URL */
    const { id } = request.params;
    /** get requested data (data has been sent from request) */
    const { order_status, payment_status } = request.body;

    /** make sure that data is exists in database */
    const findPayOrder = await prisma.order.findFirst({
      where: { id: Number(id) },
    });
    if (!findPayOrder)
      return response
        .status(200)
        .json({ status: false, message: `PayOrder is not found` });

    /** default value filename of saved data */

    /** process to update menu's data */
    const updatedOrderStatus = await prisma.order.update({
      data: {
        status: order_status,
      },
      where: { id: findPayOrder.id },
    });
    const updatedPayOrder = await prisma.paymentOrder.update({
      data: {
        status: payment_status,
      },
      where: { id_order: findPayOrder.id },
    });

    return response
      .json({
        status: true,
        message: `Order has updated`,
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
