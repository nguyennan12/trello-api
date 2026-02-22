import { StatusCodes } from 'http-status-codes'
import { JwtProvider } from '~/providers/JwtProvider'
import { env } from '~/config/environment'
import ApiError from '~/utils/ApiError'


const isAuthorized = async (req, res, next) => {
  const clientAccessToken = req.cookies?.accessToken
  if (!clientAccessToken) {
    next(new ApiError(StatusCodes.UNAUTHORIZED, 'Unauthorized (token not found)'))
    return
  }


  try {
    //B1: giai ma token xem co hop le hay k
    const accessTokenDecoded = await JwtProvider.verifyToken(clientAccessToken, env.ACCESS_TOKEN_SECRET_SIGNATURE)
    //lưu thông tin giải mã  vào req, jwtDecode
    req.jwtDecoded = accessTokenDecoded
    //cho phep di tiep
    next()
  } catch (error) {
    //tooken het han thi tra ve loi cho FE refresh
    if (error?.message?.includes('jwt expired')) {
      next(new ApiError(StatusCodes.GONE, 'Need to refresh token'))
      return
    }
    next(new ApiError(StatusCodes.UNAUTHORIZED, 'Unauthorized'))
  }
}

export const authMiddleware = {
  isAuthorized
}