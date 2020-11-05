"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DockerApi = _interopRequireDefault(require("../../../../../shared/services/DockerApi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ContainersController {
  async index(request, response) {
    const {
      all
    } = request.query;
    const containersResponse = await _DockerApi.default.get('/containers/json', {
      params: {
        all
      }
    });
    return response.json(containersResponse.data);
  }

  async store(request, response) {
    const {
      name
    } = request.query;
    const {
      Image,
      ExposedPorts,
      HostConfig
    } = request.body;
    const containerResponse = await _DockerApi.default.post('/containers/create', {
      Image,
      ExposedPorts,
      HostConfig
    }, {
      params: {
        name
      }
    });
    await _DockerApi.default.post(`/containers/${name}/start`);
    return response.json(containerResponse.data);
  }

  async show(request, response) {
    const {
      id
    } = request.params;
    const containerResponse = await _DockerApi.default.get(`/containers/${id}/json`);
    return response.json(containerResponse.data);
  }

  async destroy(request, response) {
    const {
      id
    } = request.params;
    await _DockerApi.default.delete(`/containers/${id}`);
    return response.status(204).send();
  }

}

exports.default = ContainersController;