require('dotenv').config();
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import i18n from 'i18n';
import { HttpError } from 'http-errors';

import { standardUserRouter, adminRouter, unauthenticatedRouter } from './routes';

const app = express()

i18n.configure({
  locales: ['en'],
  directory: path.join(__dirname, '../config/locales'),
  objectNotation: true
})

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  res.header('Access-Control-Allow-Credentials', 'true')
  if (req.method === 'OPTIONS') {
    res.sendStatus(200)
  }
  next()
})

app.use(i18n.init)
app.use(logger('dev', { skip: () => { return process.env.NODE_ENV === 'test' } }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/', unauthenticatedRouter.core())
app.use('/', standardUserRouter.core())
app.use('/admin', adminRouter.core())

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found')
  next(err)
})

// error handler
app.use((
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.json({ error: err })
})

module.exports = app
