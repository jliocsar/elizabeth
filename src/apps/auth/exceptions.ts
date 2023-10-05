export class UnauthorizedError extends Error {
  readonly code = 'UNAUTHORIZED'
  readonly status = 401
}

export class DuplicateUserError extends Error {
  readonly code = 'DUPLICATE_USER'
  readonly status = 409

  constructor() {
    super('User already exists')
  }
}
