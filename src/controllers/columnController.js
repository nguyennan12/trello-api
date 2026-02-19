import { StatusCodes } from 'http-status-codes'
import { columnService } from '~/services/columnService'

const creatnew = async (req, res, next) => {
  try {
    const createColumn = await columnService.createNew(req.body)
    res.status(StatusCodes.CREATED).json(createColumn)
  } catch (error) { next(error) }
}
const update = async (req, res, next) => {
  try {
    const columndId = req.params.id
    const updatedColumn = await columnService.update(columndId, req.body)
    res.status(StatusCodes.OK).json(updatedColumn)
  } catch (error) { next(error) }
}

export const columnController = {
  creatnew,
  update
}