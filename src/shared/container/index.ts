import { container } from 'tsyringe';

// import './providers';

import IContainerStatsRepository from '@modules/containers/repositories/IContainerStatsRepository';
import ContainerStatsRepository from '@modules/containers/infra/typeorm/repositories/ContainerStatsRepository';

container.registerSingleton<IContainerStatsRepository>(
  'ContainerStatsRepository',
  ContainerStatsRepository
);
