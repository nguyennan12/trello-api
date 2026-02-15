import { StatusCodes } from 'http-status-codes'
import { boardService } from '~/services/boardService'


//controller nhan body, query, params, files, cookies, jwtDecoded de dieu huong sang tan service
const creatnew = async (req, res, next) => {
  try {
    //json data
    // console.log(req.body)

    //dieu huong sang service
    const createBoard = await boardService.createNew(req.body)
    //co ket qua thi tra ve client
    res.status(StatusCodes.CREATED).json(createBoard)
  } catch (error) { next(error) }
}

export const boardController = {
  creatnew
}