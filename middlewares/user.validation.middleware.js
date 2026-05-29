import { USER } from '../models/user.js'

const validateUser = (data, isUpdate = false) => {
  const allowedFields = Object.keys(USER).filter((key) => key !== 'id')
  const dataKeys = Object.keys(data)

  if (data.id) return 'Id in the request body should NOT be present'

  const hasExtraFields = dataKeys.some((key) => !allowedFields.includes(key))
  if (hasExtraFields) return 'The presence of any extra fields is not allowed'

  if (!isUpdate) {
    const missingFields = allowedFields.filter((key) => !dataKeys.includes(key))
    if (missingFields.length > 0) {
      return `Missing required fields: ${missingFields.join(', ')}`
    }
  } else {
    if (dataKeys.length === 0)
      return 'At least one field from the model must be present'
  }

  if (data.email !== undefined) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/
    if (!emailRegex.test(data.email))
      return 'Email must be a valid @gmail.com domain'
  }

  if (data.phone !== undefined) {
    const phoneRegex = /^\+380\d{9}$/
    if (!phoneRegex.test(data.phone))
      return 'Phone must be in format +380xxxxxxxxx'
  }

  if (data.password !== undefined && data.password.length < 3) {
    return 'Password must be at least 3 characters long'
  }

  return null
}

const createUserValid = (req, res, next) => {
  const error = validateUser(req.body, false)
  if (error) {
    return res.status(400).json({ error: true, message: error })
  }
  next()
}

const updateUserValid = (req, res, next) => {
  const error = validateUser(req.body, true)
  if (error) {
    return res.status(400).json({ error: true, message: error })
  }
  next()
}

export { createUserValid, updateUserValid }
