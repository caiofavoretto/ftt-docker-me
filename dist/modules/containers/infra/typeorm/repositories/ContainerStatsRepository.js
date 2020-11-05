"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _ContainerStats = _interopRequireDefault(require("../schemas/ContainerStats"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ContainerStatsRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getMongoRepository)(_ContainerStats.default);
  }

  async create({
    container_id,
    cpu_usage,
    memory_usage
  }) {
    const containerStats = this.ormRepository.create({
      container_id,
      cpu_usage,
      memory_usage
    });
    await this.ormRepository.save(containerStats);
    return containerStats;
  }

  async findByContainerId(container_id) {
    const containerStats = await this.ormRepository.find({
      where: container_id
    });
    console.log(containerStats);
    return containerStats;
  }

}

var _default = ContainerStatsRepository;
exports.default = _default;