import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma/client";
import md5 from "md5";
import { generateToken } from "../Token";

const prismaDB = new PrismaClient();

async function CreateUser(req: Request, res: Response) {
  try {
    const user = await prismaDB.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: String(
          md5(
            req.body.password,
            process.env.SECRET as string & { asBytes: true }
          )
        ),
      },
    });

    return res.status(201).send({ msg: "Success!!", user });
  } catch (error) {
    return res.status(201).send({ error });
  }
}

async function GetUsers(req: Request, res: Response) {
  try {
    const data = await prismaDB.user.findMany();

    return res.status(201).send(data);
  } catch (error) {
    return res.status(201).send({ error });
  }
}

async function UpdateUser(req: Request, res: Response) {
  try {
    const user = await prismaDB.user.update({
      where: { id: req.params.id },
      data: {
        name: req.body.name,
        email: req.body.email,
        password: String(
          md5(
            req.body.password,
            process.env.SECRET as string & { asBytes: true }
          )
        ),
      },
    });

    return res.status(201).send({ msg: "Success!!", user });
  } catch (error) {
    return res.status(201).send({ error });
  }
}

async function DeleteUser(req: Request, res: Response) {
  try {
    const user = await prismaDB.user.delete({
      where: { id: req.params.id },
    });

    return res.status(201).send({ msg: "Success!!", user });
  } catch (error) {
    return res.status(201).send({ error });
  }
}

async function Login(req: Request, res: Response) {
  try {
    const data = await prismaDB.user.findFirst({
      where: {
        name: req.body.name,
        email: req.body.email,
        password: String(
          md5(
            req.body.password,
            process.env.SECRET as string & { asBytes: true }
          )
        ),
      },
    });

    const dados = {
      email: req.body.email,
      name: req.body.email,
    };

    if (!data) {
      return res.json({ msg: "EMAIL OU SENHA INVALIDAS!" });
    }

    const token = await generateToken(dados);

    return res.status(201).send({ msg: "LOGIN SUCESSO!!", token });
  } catch (error) {
    return res.status(201).send({ error });
  }
}

export default { CreateUser, Login, UpdateUser, DeleteUser, GetUsers };
