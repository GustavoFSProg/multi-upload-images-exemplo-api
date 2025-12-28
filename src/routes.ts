import express, { Router, Request, Response } from "express";
import userController from "./Controllers/userController";
import productsControllermulti from "./Controllers/productsControllermulti";
// import productController from "./Controllers/productController";
import { multerConfig } from "./config/uploader_multi";

const routes = Router();

routes.get("/", (req: Request, res: Response) => {
  return res.json({ msg: "Api Rodando bem !!" });
});

//users
routes.post("/create-user", userController.CreateUser);
routes.get("/get-users", userController.GetUsers);
routes.put("/update-user/:id", userController.UpdateUser);
routes.delete("/delete-user/:id", userController.DeleteUser);
routes.post("/login", userController.Login);

// products
// routes.post("/create-product", multerConfig, productController.createProduct);
// routes.get("/get-products", productController.getProducts);
// routes.get("/get-product/:id", productController.getOneProduct);

//products multi upload
routes.post("/create-product", multerConfig, productsControllermulti.create);
routes.get("/get-products", productsControllermulti.getProducts);
routes.get("/get-images", productsControllermulti.getImages);
routes.get(
  "/get-product-images/:id",
  productsControllermulti.showProductImages
);

export default routes;
