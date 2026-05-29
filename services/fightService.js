import { fightRepository } from '../repositories/fightRepository.js'

class FightService {
  getAll() {
    return fightRepository.getAll()
  }

  create(fightData) {
    return fightRepository.create(fightData)
  }
}

const fightService = new FightService()
export { fightService }
