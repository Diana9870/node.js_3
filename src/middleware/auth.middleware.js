import jwt from 'jsonwebtoken'
import createHttpError from 'http-errors'

export const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader?.startsWith('Bearer ')) {
      throw new Error()
    }

    const token = authHeader.split(' ')[1]

    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET
    )

    req.user = payload

    next()
  } catch {
    next(
      createHttpError(
        401,
        'Invalid or expired token'
      )
    )
  }
}