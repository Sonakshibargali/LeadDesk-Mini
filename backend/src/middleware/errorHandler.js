export const errorHandler = (err, req, res, next) => {
  console.error('API Error: ', err);

  const statusCode = err.statusCode || 500;
  
  // Custom message for Prisma errors (like record not found)
  if (err.code === 'P2025') {
    return res.status(404).json({
      success: false,
      message: 'Resource not found'
    });
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || 'An unexpected error occurred on the server',
    errors: err.errors || []
  });
};
