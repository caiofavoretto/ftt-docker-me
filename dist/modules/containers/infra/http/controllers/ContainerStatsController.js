"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _DockerApi = _interopRequireDefault(require("../../../../../shared/services/DockerApi"));

var _CreateContainerStatsService = _interopRequireDefault(require("../../../services/CreateContainerStatsService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ContainerStatsController {
  async show(request, response) {
    const {
      id
    } = request.params; // const { stream } = request.query;

    const containerStatsResponse = await _DockerApi.default.get(`/containers/${id}/stats`, {
      params: {
        stream: false
      }
    });

    const createContainerStats = _tsyringe.container.resolve(_CreateContainerStatsService.default);

    const containerStats = await createContainerStats.execute({
      container_id: id,
      ...containerStatsResponse.data
    });
    return response.json(containerStats);
  }

}

exports.default = ContainerStatsController;