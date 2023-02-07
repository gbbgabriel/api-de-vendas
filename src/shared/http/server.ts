import 'reflect-metadata'
import 'dotenv/config'
import express, { NextFunction, Request, Response } from 'express'
import { pagination } from 'typeorm-pagination'
import 'express-async-errors'
//import dotenv from 'dotenv'
import cors from 'cors'
import { errors } from 'celebrate'
import router from './routes/index'
import AppError from '@shared/errors/appError'
import '@shared/typeorm'
import uploadConfig from '@config/upload'
import rateLimiter from '@shared/http/middlewares/rateLimiter'

const app = express()

//dotenv.config()

app.use(cors())
app.use(express.json())

app.use(rateLimiter)

app.use(pagination)

app.use('/files', express.static(uploadConfig.directory))
app.use(router)

app.use(errors())

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    })
  }

  console.log(error)

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  })
})

app.listen(process.env.PORT, () => {
  console.log('Server started on port 1000! 🏆')
})
