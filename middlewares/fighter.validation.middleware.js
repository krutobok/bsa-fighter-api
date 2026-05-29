import { FIGHTER } from '../models/fighter.js'

const validateFighter = (data, isUpdate = false) => {
  const allowedFields = Object.keys(FIGHTER).filter((key) => key !== 'id')
  const dataKeys = Object.keys(data)

  if (data.id) return 'Id in the request body should NOT be present'

  const hasExtraFields = dataKeys.some((key) => !allowedFields.includes(key))
  if (hasExtraFields) return 'The presence of any extra fields is not allowed'

  if (!isUpdate) {
    const requiredFields = allowedFields.filter((key) => key !== 'health')
    const missingFields = requiredFields.filter(
      (key) => !dataKeys.includes(key),
    )
    if (missingFields.length > 0) {
      return `Missing required fields: ${missingFields.join(', ')}`
    }
  } else {
    if (dataKeys.length === 0)
      return 'At least one field from the model must be present'
  }

  if (data.power !== undefined) {
    if (typeof data.power !== 'number' || data.power < 1 || data.power > 100) {
      return 'Power must be a number between 1 and 100'
    }
  }

  if (data.defense !== undefined) {
    if (
      typeof data.defense !== 'number' ||
      data.defense < 1 ||
      data.defense > 10
    ) {
      return 'Defense must be a number between 1 and 10'
    }
  }

  if (data.health !== undefined) {
    if (
      typeof data.health !== 'number' ||
      data.health < 80 ||
      data.health > 120
    ) {
      return 'Health must be a number between 80 and 120'
    }
  }

  return null
}

const createFighterValid = (req, res, next) => {
  const error = validateFighter(req.body, false)
  if (error) {
    return res.status(400).json({ error: true, message: error })
  }
  next()
}

const updateFighterValid = (req, res, next) => {
  const error = validateFighter(req.body, true)
  if (error) {
    return res.status(400).json({ error: true, message: error })
  }
  next()
}

export { createFighterValid, updateFighterValid }
