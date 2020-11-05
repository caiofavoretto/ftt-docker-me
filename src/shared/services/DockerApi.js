"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const dockerApi = _axios.default.create({
  baseURL: process.env.DOCKER_API_URL
});

var _default = dockerApi;
exports.default = _default;