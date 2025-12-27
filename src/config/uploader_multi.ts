import { v2 } from 'cloudinary'
import multer from 'multer'
import dotenv from 'dotenv'
import { NextFunction, Request, Response } from 'express'
import Datauri from 'datauri/parser'
import path from 'path'

const dUri = new Datauri()

export const convertBufferToString = (file: any) =>
  dUri.format(path.extname(file?.originalname || '').toString(), file?.buffer || '').content

const storage = multer.memoryStorage()

export const multerConfig = multer({ storage }).array('image')
// export const multerConfigTow = multer({ storage }).single('image2')

dotenv.config()

export const uploaderConfig = (_req: Request, _res: Response, next: NextFunction) => {
  v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })
  next()
}

export const uploader = v2.uploader
