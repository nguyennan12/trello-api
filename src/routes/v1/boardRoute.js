import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardValidation } from '~/validations/boardValidation'
import { boardController } from '~/controllers/boardController'
import { authMiddleware } from '~/middlewares/authMiddleware'

const Router = express.Router()

Router.route('/')
  .get(authMiddleware.isAuthorized, (req, res) => {
    res.status(StatusCodes.OK).json({ message: 'GET: API get list board' })
  })
  //validate -> controller
  .post(authMiddleware.isAuthorized, boardValidation.creatNew, boardController.creatnew)

Router.route('/:id')
  .get(authMiddleware.isAuthorized, boardController.getDetail)
  .put(authMiddleware.isAuthorized, boardValidation.update, boardController.update)

Router.route('/supports/moving_card')
  .put(authMiddleware.isAuthorized, boardValidation.moveCardToDifferentColumn, boardController.moveCardToDifferentColumn)

export const boardRoute = Router

