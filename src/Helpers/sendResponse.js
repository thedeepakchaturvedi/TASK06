const sendResponse = (req, res, configObject) => {
  const { statusCode, message, payload } = configObject;
  res.status(statusCode).json({
    message: message,
    data: payload,
  });
};

module.exports = sendResponse;
