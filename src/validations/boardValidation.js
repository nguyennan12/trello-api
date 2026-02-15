import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

const creatNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict(),
    description: Joi.string().required().min(3).max(256).trim().strict()
  })
  try {
    //json data
    //console.log(req.body)
    //abortEarly: dung som khi co loi, false de tra ve het loi
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    //next()
    res.status(StatusCodes.CREATED).json({ message: 'POST from validation: API create new board' })
  } catch (error) {
    //console.log(error)
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: new Error(error).message
    })
  }

}

export const boardValidation = {
  creatNew
}