/* eslint-disable max-classes-per-file */
const {
  NOT_FOUND, BAD_REQUEST, NOT_AUTHORIZED, FORBIDDEN, CONFLICT,
} = require('./constants');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_FOUND;
  }
}

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = BAD_REQUEST;
  }
}

class NotAuthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_AUTHORIZED;
  }
}

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = FORBIDDEN;
  }
}
class ConflictUserError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CONFLICT;
  }
}

module.exports = {
  NotFoundError,
  BadRequestError,
  NotAuthorizedError,
  ForbiddenError,
  ConflictUserError,
};
