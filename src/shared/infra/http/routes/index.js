"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _containers = _interopRequireDefault(require("../../../../modules/containers/infra/http/routes/containers.routes"));

var _images = _interopRequireDefault(require("../../../../modules/images/infra/http/routes/images.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();
routes.use('/containers', _containers.default);
routes.use('/images', _images.default);
var _default = routes;
exports.default = _default;