import AppError from '@shared/errors/appError'
import { verify } from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import authConfig from '@config/auth'

export default function isAuthenticated(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    throw new AppError('JWT Token is missing.')
  }

  //Bearer fdsfmjsnfjfsdjfnsd
  const [, token] = authHeader.split(' ')

  try {
    const decodedToken = verify(token, authConfig.jwt.secret)

    //console.log(decodedToken)

    const { sub } = decodedToken

    req.user = {
      id: sub as string,
    }

    return next()
  } catch {
    throw new AppError('Invalid JWT Token.')
  }
}
