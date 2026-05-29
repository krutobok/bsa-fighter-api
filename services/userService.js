import { userRepository } from '../repositories/userRepository.js'

class UserService {
  getAll() {
    return userRepository.getAll()
  }

  getOne(id) {
    const user = userRepository.getOne({ id })
    if (!user) {
      throw { status: 404, message: 'User not found' }
    }
    return user
  }

  create(userData) {
    const existingEmail = userRepository.getOne({ email: userData.email })
    if (existingEmail) {
      throw { status: 400, message: 'User with this email already exists' }
    }

    const existingPhone = userRepository.getOne({ phone: userData.phone })
    if (existingPhone) {
      throw { status: 400, message: 'User with this phone already exists' }
    }

    return userRepository.create(userData)
  }

  update(id, userData) {
    this.getOne(id)

    if (userData.email) {
      const existingEmail = userRepository.getOne({ email: userData.email })
      if (existingEmail && existingEmail.id !== id) {
        throw {
          status: 400,
          message: 'This email is already taken by another user',
        }
      }
    }

    if (userData.phone) {
      const existingPhone = userRepository.getOne({ phone: userData.phone })
      if (existingPhone && existingPhone.id !== id) {
        throw {
          status: 400,
          message: 'This phone is already taken by another user',
        }
      }
    }

    return userRepository.update(id, userData)
  }

  delete(id) {
    this.getOne(id)
    return userRepository.delete(id)
  }
}

const userService = new UserService()
export { userService }
