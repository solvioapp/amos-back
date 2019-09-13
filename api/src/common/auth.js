import jwt from 'jsonwebtoken'

export const createToken = async (user, secret) => await jwt.sign(user, secret, {expiresIn: `7d`})
