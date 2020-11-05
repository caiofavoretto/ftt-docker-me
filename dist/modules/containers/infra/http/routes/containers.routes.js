"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _ContainersController = _interopRequireDefault(require("../controllers/ContainersController"));

var _StartContainerController = _interopRequireDefault(require("../controllers/StartContainerController"));

var _StopContainerController = _interopRequireDefault(require("../controllers/StopContainerController"));

var _InactiveContainersController = _interopRequireDefault(require("../controllers/InactiveContainersController"));

var _ContainerStatsController = _interopRequireDefault(require("../controllers/ContainerStatsController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const containersController = new _ContainersController.default();
const startContainerController = new _StartContainerController.default();
const stopContainerController = new _StopContainerController.default();
const inactiveContainersController = new _InactiveContainersController.default();
const containerStatsController = new _ContainerStatsController.default();
const containersRouter = (0, _express.Router)();
containersRouter.get('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.QUERY]: {
    all: _celebrate.Joi.boolean().optional()
  }
}), containersController.index);
containersRouter.post('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.QUERY]: {
    name: _celebrate.Joi.string().required()
  },
  [_celebrate.Segments.BODY]: {
    Image: _celebrate.Joi.string().required(),
    ExposedPorts: _celebrate.Joi.object().required(),
    HostConfig: _celebrate.Joi.object().required()
  }
}), containersController.store);
containersRouter.get('/:id', (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().required()
  }
}), containersController.show);
containersRouter.delete('/:id', (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().required()
  }
}), containersController.destroy); // Actions

containersRouter.get('/:id/stats', (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().required()
  }
}), containerStatsController.show);
containersRouter.post('/:name/start', (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    name: _celebrate.Joi.string().required()
  }
}), startContainerController.store);
containersRouter.post('/:name/stop', (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    name: _celebrate.Joi.string().required()
  }
}), stopContainerController.store);
containersRouter.delete('/', inactiveContainersController.destroy);
var _default = containersRouter;
exports.default = _default;