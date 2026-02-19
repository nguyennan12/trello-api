/* eslint-disable no-useless-catch */
import { columnModel } from '~/models/columnModel'
  

const createNew = async (reqBody) => {
  try {
    const newColumn = {
      ...reqBody,
    }
    const createdColumn = await columnModel.createNew(newColumn)
    const getNewColumn = await columnModel.findOneById(createdColumn.insertedId)

    if (getNewColumn) {
      getNewColumn.cards = []
      await columndModel.pushColumnOrderIds(getNewColumn)
    }

    return getNewColumn
  } catch (error) { throw error }
}

const update = async (columndId, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updateAt: Date.now()
    }
    const updatedColumn = await columnModel.update(columndId, updateData)
    return updatedColumn
  } catch (error) { throw error }

}

export const columnService = {
  createNew,
  update
}