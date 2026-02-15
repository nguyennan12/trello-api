import { StatusCodes } from 'http-status-codes'


//controller nhan body, query, params, files, cookies, jwtDecoded de dieu huong sang tan service
const creatnew = async (req, res, next) => {
  try {
    //json data
    // console.log(req.body)

    //dieu huong sang service

    //co ket qua thi tra ve client
    res.status(StatusCodes.CREATED).json({ message: 'POST from controller: API create new board' })
  } catch (error) { next(error) }
}

export const boardController = {
  creatnew
}