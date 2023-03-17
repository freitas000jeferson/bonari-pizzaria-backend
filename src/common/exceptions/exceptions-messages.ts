export const exceptionMessages = {
  notFound: (resource: string) => `${resource}-not-found`,
  alreadyExists: (param: string) => `${param}-already-registered`,
  invalidFields: 'invalid-fields',
  invalidPassword: 'invalid-password',
  expiredToken: 'expired-token',
  invalidAuthFormat: 'invalid-authorization-format',
  authMissing: 'missing-authorization-header',
  internalError: 'internal-server-error',
};
