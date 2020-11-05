require('reflect-metadata');

require('dotenv/config');

const _express = _interopRequireDefault(require('express'));

const _cors = _interopRequireDefault(require('cors'));

require('express-async-errors');

const _AppError = _interopRequireDefault(require('../../errors/AppError'));

const _routes = _interopRequireDefault(require('./routes'));

require('../typeorm');

require('../../container');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

// import rateLimiter from './middlewares/rateLimiter';
const app = (0, _express.default)();
app.use((0, _cors.default)());
app.use(_express.default.json()); // app.use(rateLimiter);

app.use(_routes.default);
app.use((err, request, response, _) => {
  if (err instanceof _AppError.default) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});
app.listen(process.env.PORT || 3333, () => {
  console.log('🚀 Server started on port 3333');
});
