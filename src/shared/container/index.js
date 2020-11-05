"use strict";

var _tsyringe = require("tsyringe");

var _ContainerStatsRepository = _interopRequireDefault(require("../../modules/containers/infra/typeorm/repositories/ContainerStatsRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.registerSingleton('ContainerStatsRepository', _ContainerStatsRepository.default);