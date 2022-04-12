const errors = {
  badRequest: 400,
  conflict: 409,
  unexpected: 500,
};

module.exports = (err, _req, res, _next) => {
  res.status(errors[err.status]).json({ message: err.message });
};