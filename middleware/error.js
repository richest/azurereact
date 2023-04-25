const winston = require('winston');

module.exports = (err, req, res, next) => {
  winston.error(err.message, err);

  res.status(500).send({ msg: 'Something went wrong!' });
};

module.exports.error = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: 'Something went wrong' });
};
