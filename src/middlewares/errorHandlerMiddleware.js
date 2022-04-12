const errors = {
  badRequest: 400,
  unauthorized: 401,
  notFound: 404,
  conflict: 409,
  unexpected: 500,
};

module.exports = (err, _req, res, _next) => {
  res.status(errors[err.status || 'badRequest']).json({ message: err.message });
};