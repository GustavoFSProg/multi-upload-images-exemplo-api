// import { Request, Response } from "express";
// import { PrismaClient } from "../generated/prisma/client";
// import { convertBufferToString, uploader } from "../config/uploader";

// var cloudinary = require("cloudinary");

// const prismaDB = new PrismaClient();

// async function createProduct(req: Request, res: Response) {
//   try {
//     cloudinary.config({
//       cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//       api_key: process.env.CLOUDINARY_API_KEY,
//       api_secret: process.env.CLOUDINARY_API_SECRET,
//     });

//     const file = convertBufferToString(req);
//     if (file === undefined)
//       return res
//         .status(400)
//         .json({ error: "Error converting buffer to string" });

//     const { secure_url } = await uploader.upload(file);

//     // console.log(secure_url);

//     const data = await prismaDB.produto.create({
//       data: {
//         name: req.body.name,
//         image: secure_url,
//         description: req.body.description,
//         price: req.body.price,
//       },
//     });

//     return res.status(201).send({ msg: "Success!", data });
//   } catch (error) {
//     return res.status(400).send({ msg: "Error!", error });
//   }
// }

// async function getOneProduct(req: Request, res: Response) {
//   try {
//     const data = await prismaDB.produto.findUnique({
//       where: { id: req.params.id },
//     });

//     return res.status(201).json(data);
//   } catch (error) {
//     return res.status(201).json({ message: "error!", error });
//   }
// }

// async function getProducts(req: Request, res: Response) {
//   try {
//     const data = await prismaDB.produto.findMany();

//     return res.status(201).send(data);
//   } catch (error) {
//     return res.status(400).send({ msg: "Error!", error });
//   }
// }

// export default { createProduct, getProducts, getOneProduct };
