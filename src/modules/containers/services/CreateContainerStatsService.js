"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IContainerStatsRepository = _interopRequireDefault(require("../repositories/IContainerStatsRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateContainerStatsService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ContainerStatsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IContainerStatsRepository.default === "undefined" ? Object : _IContainerStatsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreateContainerStatsService {
  constructor(containerStatsRepository) {
    this.containerStatsRepository = containerStatsRepository;
  }

  async execute({
    container_id,
    cpu_stats,
    precpu_stats,
    memory_stats
  }) {
    const usedMemory = memory_stats.usage - memory_stats.stats.cache;
    const availableMemory = memory_stats.limit;
    const memory_usage = usedMemory / availableMemory * 100.0;
    const cpuDelta = cpu_stats.cpu_usage.total_usage - precpu_stats.cpu_usage.total_usage;
    const systemCpuDelta = cpu_stats.system_cpu_usage - precpu_stats.system_cpu_usage;
    const numberCpus = cpu_stats.online_cpus;
    const cpu_usage = cpuDelta / systemCpuDelta * numberCpus * 100.0;
    await this.containerStatsRepository.create({
      container_id,
      memory_usage,
      cpu_usage
    });
    const containerStats = await this.containerStatsRepository.findByContainerId(container_id);
    return containerStats;
  }

}) || _class) || _class) || _class) || _class);
var _default = CreateContainerStatsService;
exports.default = _default;