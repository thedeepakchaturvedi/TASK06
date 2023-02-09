const sendErrorResponse = (error, req, res) => {
  res.status(error.statusCode).json({
    message: error.message,
  });
};

module.exports = sendErrorResponse;
