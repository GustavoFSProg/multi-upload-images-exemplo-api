import { PrismaClient } from "../generated/prisma/client";
import { Request, Response } from "express";
import { convertBufferToString, uploader } from "../config/uploader_multi";
import { v2 } from "cloudinary";

const db = new PrismaClient();

async function getProducts(_req: Request, res: Response) {
  try {
    const data = await db.produto.findMany();

    return res.json(data);
  } catch (error) {
    return res.json(error);
  }
}

async function getImages(_req: Request, res: Response) {
  try {
    const data = await db.images.findMany();

    return res.json(data);
  } catch (error) {
    return res.json(error);
  }
}

async function showOne(req: Request, res: Response) {
  try {
    const produtos = await db.produto.findFirst({
      where: { id: req.params.id },
      select: {
        name: true,
        id: true,
      },
    });

    return res.status(200).json(produtos);
  } catch (error) {
    return res.status(200).json({ error });
  }
}

async function showProductImages(req: Request, res: Response) {
  try {
    const data = await db.images.findMany({
      where: { idProduto: req.params.id },
    });

    return res.status(200).json(data);
  } catch (error) {
    return res.status(200).json({ error });
  }
}

async function createOneImageForProduct(req: Request, res: Response) {
  try {
    v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    if (req.files === undefined)
      return res
        .status(400)
        .json({ error: "Error converting buffer to string" });

    const products = [];
    for (const file of req.files as unknown as any[]) {
      const bufferToString = convertBufferToString(file);
      const { secure_url, buffr } = await uploader.upload(bufferToString || "");
      console.log(req.files);
      const product = await db.produto.create({
        data: {
          name: "nome",
          price: req.body.price,
          image: secure_url,
          description: req.body.description,
        },
      });

      products.push(product);
    }
    return res.json({ msg: "Sucesso!" });
  } catch (error) {
    return res.status(400).json({ error });
  }
}

async function create(req: Request, res: Response) {
  try {
    v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const product = await db.produto.create({
      data: {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        image:
          "https://res.cloudinary.com/my-owne/image/upload/v1702736622/udqvrd9dwrzt88too60y.jpg",
      },
    });

    if (req.files === undefined)
      return res
        .status(400)
        .json({ error: "Error converting buffer to string" });

    const products = [];
    for (const file of req.files as unknown as any[]) {
      const bufferToString = convertBufferToString(file);
      const { secure_url, buffr } = await uploader.upload(bufferToString || "");
      console.log(req.files);

      const figures = await db.images.create({
        data: {
          idProduto: product.id,
          images: secure_url,
        },
      });
      products.push(figures);
    }

    res.json({ msg: "Sucesso!", product });
  } catch (error) {
    return res.status(400).json({ error });
  }
}

function update(req: Request, res: Response) {
  const data = {
    where: { id: req.params.id },
    data: { name: req.body.name, price: req.body.price },
  };
  db.produto
    .update(data)
    .then(() =>
      res.status(201).json({ message: "Produto atualizado com sucesso!" })
    )
    .catch((error: any) => res.status(400).json({ error }));
}

function destroy(req: Request, res: Response) {
  db.produto
    .delete({ where: { id: req.params.id } })
    .then(() => res.status(201).json({ msg: "Produto removido com sucesso!" }))
    .catch((error: any) => res.status(400).json({ error }));
}

export default { create, getProducts, getImages, showProductImages };
