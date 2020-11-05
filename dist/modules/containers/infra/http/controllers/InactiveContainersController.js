"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DockerApi = _interopRequireDefault(require("../../../../../shared/services/DockerApi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class InactiveContainersController {
  async destroy(request, response) {
    await _DockerApi.default.post('/containers/prune');
    return response.status(204).send();
  }

}

exports.default = InactiveContainersController;