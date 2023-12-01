export class DuplicateThingyError extends Error {
  readonly code = 'DUPLICATE_THINGY'
  readonly status = 409

  constructor() {
    super('Thingy already exists')
  }
}
