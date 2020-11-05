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
    const imagesResponse = await _DockerApi.default.get('/images/json', {
      params: {
        all
      }
    });
    return response.json(imagesResponse.data);
  }

  async store(request, response) {
    const {
      name
    } = request.body;
    const imageResponse = await _DockerApi.default.post('/images/create', {}, {
      params: {
        fromImage: name
      }
    });
    return response.json(imageResponse.data);
  }

  async show(request, response) {
    const {
      id
    } = request.params;
    const imageResponse = await _DockerApi.default.get(`/images/${id}/json`);
    return response.json(imageResponse.data);
  }

  async destroy(request, response) {
    const {
      id
    } = request.params;
    await _DockerApi.default.delete(`/images/${id}`);
    return response.status(204).send();
  }

}

exports.default = ContainersController;