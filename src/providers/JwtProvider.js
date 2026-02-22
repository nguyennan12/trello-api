import JWT from 'jsonwebtoken'


//userInfo: thông tin muốn đính kèm vào token
//secretSignature: chữ ký bí mật
//tokenLife: thời gian sống của token

const genderateToken = async (userInfo, secretSignature, tokenLife) => {
  try {
    return JWT.sign(userInfo, secretSignature, { algorithm: 'HS256', expiresIn: tokenLife })
  } catch (error) { throw new Error(error) }
}

const verifyToken = async (token, secretSignature) => {
  try {
    return JWT.verify(token, secretSignature)
  } catch (error) { throw new Error(error) }
}

export const JwtProvider = {
  genderateToken,
  verifyToken
}