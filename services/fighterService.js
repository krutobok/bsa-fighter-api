import { fighterRepository } from '../repositories/fighterRepository.js'

class FighterService {
  getAll() {
    return fighterRepository.getAll()
  }

  getOne(id) {
    const fighter = fighterRepository.getOne({ id })
    if (!fighter) {
      throw { status: 404, message: 'Fighter not found' }
    }
    return fighter
  }

  _isNameTaken(name, excludeId = null) {
    const allFighters = this.getAll()
    return allFighters.some(
      (f) => f.name.toLowerCase() === name.toLowerCase() && f.id !== excludeId,
    )
  }

  create(fighterData) {
    if (this._isNameTaken(fighterData.name)) {
      throw { status: 400, message: 'Fighter with this name already exists' }
    }

    if (fighterData.health === undefined) {
      fighterData.health = 85
    }

    return fighterRepository.create(fighterData)
  }

  update(id, fighterData) {
    this.getOne(id)

    if (fighterData.name && this._isNameTaken(fighterData.name, id)) {
      throw { status: 400, message: 'Fighter with this name already exists' }
    }

    return fighterRepository.update(id, fighterData)
  }

  delete(id) {
    this.getOne(id)
    return fighterRepository.delete(id)
  }
}

const fighterService = new FighterService()
export { fighterService }
