/* eslint-disable import/no-duplicates */
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IContainerStatsRepository from '../repositories/IContainerStatsRepository';

import ContainerStats from '../infra/typeorm/schemas/ContainerStats';

interface IRequest {
  container_id: string;
  memory_stats: {
    limit: number;
    usage: number;
    stats: {
      cache: number;
    };
  };
  cpu_stats: {
    cpu_usage: {
      total_usage: number;
    };
    online_cpus: number;
    system_cpu_usage: number;
  };
  precpu_stats: {
    cpu_usage: {
      total_usage: number;
    };
    system_cpu_usage: number;
  };
}

@injectable()
class CreateContainerStatsService {
  constructor(
    @inject('ContainerStatsRepository')
    private containerStatsRepository: IContainerStatsRepository
  ) {}

  public async execute({
    container_id,
    cpu_stats,
    precpu_stats,
    memory_stats,
  }: IRequest): Promise<ContainerStats[]> {
    const usedMemory = memory_stats.usage - memory_stats.stats.cache;
    const availableMemory = memory_stats.limit;

    const memory_usage = (usedMemory / availableMemory) * 100.0;

    const cpuDelta =
      cpu_stats.cpu_usage.total_usage - precpu_stats.cpu_usage.total_usage;

    const systemCpuDelta =
      cpu_stats.system_cpu_usage - precpu_stats.system_cpu_usage;

    const numberCpus = cpu_stats.online_cpus;

    const cpu_usage = (cpuDelta / systemCpuDelta) * numberCpus * 100.0;

    await this.containerStatsRepository.create({
      container_id,
      memory_usage,
      cpu_usage,
    });

    const containerStats = await this.containerStatsRepository.findByContainerId(
      container_id
    );

    return containerStats;
  }
}

export default CreateContainerStatsService;
