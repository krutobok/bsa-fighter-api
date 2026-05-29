import { Router } from 'express'
import { fightService } from '../services/fightService.js'
import { responseMiddleware } from '../middlewares/response.middleware.js'

const router = Router()

router.get(
  '/',
  (req, res, next) => {
    try {
      res.data = fightService.getAll()
    } catch (err) {
      res.err = err
    } finally {
      next()
    }
  },
  responseMiddleware,
)

router.post(
  '/',
  (req, res, next) => {
    try {
      res.data = fightService.create(req.body)
    } catch (err) {
      res.err = err
    } finally {
      next()
    }
  },
  responseMiddleware,
)

export { router }
