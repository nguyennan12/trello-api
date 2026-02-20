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

const getDetail = async (req, res, next) => {
  try {
    const boardID = req.params.id
    const board = await boardService.getDetail(boardID)
    res.status(StatusCodes.OK).json(board)
  } catch (error) { next(error) }
}

const update = async (req, res, next) => {
  try {
    const boardId = req.params.id
    const updatedBoard = await boardService.update(boardId, req.body)
    res.status(StatusCodes.OK).json(updatedBoard)
  } catch (error) { next(error) }
}


const moveCardToDifferentColumn = async (req, res, next) => {
  try {
    const result = await boardService.moveCardToDifferentColumn(req.body)

    res.status(StatusCodes.OK).json(result)
  } catch (error) { next(error) }
}

export const boardController = {
  creatnew,
  getDetail,
  update,
  moveCardToDifferentColumn
}