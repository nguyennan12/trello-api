/* eslint-disable no-useless-catch */
import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'
import { boardModel } from '~/models/boardModel'
import { cardModel } from '~/models/cardModel'
import { columnModel } from '~/models/columnModel'
import ApiError from '~/utils/ApiError'
import { DEFAULT_ITEMS_PER_PAGE, DEFAULT_PAGE } from '~/utils/constants'
import { slugify } from '~/utils/formatters'

//xu ly logic, chi nhan du lieu de xu ly logic, k can dua het req res qua
const createNew = async (reqBody) => {
  try {
    //xu ly logic du lieu
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }

    //goi to tang model de luu ban ghi du lieu vao database
    const createdBoard = await boardModel.createNew(newBoard)
    // console.log(createdBoard)

    //xuat toan bo ban ghi cua board ra (neu can)
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)
    //xu ly logic voi cac collection khac

    //ban email, notification cho admin khi 1 baard moi dc tao

    //tra ket qua ve
    return getNewBoard
  } catch (error) { throw error }
}

const getDetail = async (boardId) => {
  try {
    const board = await boardModel.getDetail(boardId)
    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'board not found')
    }

    const resBoard = cloneDeep(board)

    resBoard.columns.forEach(column => {
      column.cards = resBoard.cards.filter(card => card.columnId.equals(column._id))
      // column.cards = resBoard.cards.filter(card => card.columnId.toString() === column._id.toString())
    })

    delete resBoard.cards

    return resBoard
  } catch (error) { throw error }

}

const update = async (boardId, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updateAt: Date.now()
    }
    const updatedBoard = await boardModel.update(boardId, updateData)
    return updatedBoard
  } catch (error) { throw error }
}

const moveCardToDifferentColumn = async (reqBody) => {
  try {
    await columnModel.update(reqBody.prevColumnId, {
      cardOrderIds: reqBody.prevCardOrderIds,
      updateAt: Date.now()
    })

    await columnModel.update(reqBody.nextColumnId, {
      cardOrderIds: reqBody.nextCardOrderIds,
      updateAt: Date.now()
    })

    await cardModel.update(reqBody.currentCardId, {
      columnId: reqBody.nextColumnId

    })

    return { updateResult: 'Successfully' }
  } catch (error) { throw error }
}

const getBoards = async (userId, page, itemsPerPage) => {
  try {
    if (!page) page = DEFAULT_PAGE
    if (!itemsPerPage) itemsPerPage = DEFAULT_ITEMS_PER_PAGE

    const result = await boardModel.getBoards(userId, parseInt(page, 10), parseInt(itemsPerPage, 10))
    return result
  } catch (error) { throw error }
}


export const boardService = {
  createNew,
  getDetail,
  update,
  moveCardToDifferentColumn,
  getBoards
}