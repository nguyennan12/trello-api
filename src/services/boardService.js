/* eslint-disable no-useless-catch */
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

    //xu ly logic voi cac collection khac

    //ban email, notification cho admin khi 1 baard moi dc tao

    //tra ket qua ve
    return newBoard
  } catch (error) { throw error }
}

export const boardService = {
  createNew
}