class ApiError extends Error {
  constructor(message, statuscode) {
    super(message);
    this.statuscode = statuscode;
    this.status = `${this.statuscode}`.startsWith('4') ? 'fail' : 'error';
    this.isoperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;
