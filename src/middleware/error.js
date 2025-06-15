const errorHandler = (err, req, res, next) => {
  console.error(`❌ ERROR: ${err.message}\n`, err.stack);
  
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  res.status(statusCode).json({
    success: false,
    message: err.message || "An unexpected server error occurred",
  });
};

module.exports = errorHandler;