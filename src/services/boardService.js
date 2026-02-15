/* eslint-disable no-useless-catch */
import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'

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

export const boardService = {
  createNew
}