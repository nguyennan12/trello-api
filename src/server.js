/* eslint-disable no-console */

import cookieParser from 'cookie-parser'
import express from 'express'
import cors from 'cors'
import { corsOptions } from './config/cors'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/environment'
import { APIs_V1 } from '~/routes/v1'
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware'

const START_SERVER = () => {
  const app = express()

  //fix Cache form disk cua expressjs
  app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store')
    next()
  })

  //cau hinh cookie parser
  app.use(cookieParser())

  //xu ly cors
  app.use(cors(corsOptions))

  //bat req.body
  app.use(express.json())

  //use APIs in v1
  app.use('/v1', APIs_V1)

  //middleware xu ly loi tap trung
  app.use(errorHandlingMiddleware)

  if (env.BUILD_MODE === 'production') {
    app.listen(process.env.PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Hello ${env.AUTHOR}, I am running at Port: ${process.env.PORT}`)

    })
  } else {
    app.listen(env.LOCAL_DEV_APP_PORT, env.LOCAL_DEV_APP_HOST, () => {
      // eslint-disable-next-line no-console
      console.log(`Hello ${env.AUTHOR}, I am running at http://${env.LOCAL_DEV_APP_HOST}:${env.LOCAL_DEV_APP_PORT}`)

    })
  }


  exitHook(() => {
    console.log('Exitting')
    CLOSE_DB()
  })
}

CONNECT_DB()
  .then(() => console.log('connect mongoDb success'))
  .then(() => START_SERVER())
  .catch(error => {
    console.error(error)
    process.exit(0)
  })


