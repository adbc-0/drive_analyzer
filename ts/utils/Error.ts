/**
 * @param error the error object.
 * @returns if given error object is a NodeJS error.
 */
export function isNodeError(error: unknown): error is NodeJS.ErrnoException {
  return error instanceof Error;
}

export const allowedErrorCodes = new Set(['EACCES', 'EPERM']);
