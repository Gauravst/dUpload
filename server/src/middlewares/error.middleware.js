// This piece of code is responsible for the consistancy of error responses.

import { ApiError } from '../utils/ApiError.js';

export const errorHandler = (err, req, res, next) => {
  // comparing if the error instance is not related to custom defined API error
  if (!(err instanceof ApiError)) {
    const statusCode =
      err.statusCode || err instanceof mongoose.Error ? 400 : 500;

    const message = err.message || 'Something went wrong';
    err = new ApiError(statusCode, message, err?.errors || []);
  }

  return res.status(err.statusCode).json({
    ...err,
    message: err.message,
  });
};
