export class UnauthorizedError extends Error {
  readonly code = 'UNAUTHORIZED'
  readonly status = 401

  constructor() {
    super('Unauthorized')
  }
}

export class DuplicateUserError extends Error {
  readonly code = 'DUPLICATE_USER'
  readonly status = 409

  constructor() {
    super('User already exists')
  }
}

export class EmailNotFoundError extends Error {
  readonly code = 'EMAIL_NOT_FOUND'
  readonly status = 400

  constructor() {
    super('Email not found')
  }
}

export class InvalidPasswordError extends Error {
  readonly code = 'INVALID_PASSWORD'
  readonly status = 400

  constructor() {
    super('Invalid password')
  }
}
