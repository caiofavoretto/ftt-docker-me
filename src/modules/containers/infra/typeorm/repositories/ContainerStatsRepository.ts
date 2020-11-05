import { getMongoRepository, MongoRepository } from 'typeorm';

import IContainerStatsRepository from '@modules/containers/repositories/IContainerStatsRepository';
import ICreateContainerStatsDTO from '@modules/containers/dtos/ICreateContainerStatsDTO';

import ContainerStats from '../schemas/ContainerStats';

class ContainerStatsRepository implements IContainerStatsRepository {
  private ormRepository: MongoRepository<ContainerStats>;

  constructor() {
    this.ormRepository = getMongoRepository(ContainerStats);
  }

  public async create({
    container_id,
    cpu_usage,
    memory_usage,
  }: ICreateContainerStatsDTO): Promise<ContainerStats> {
    const containerStats = this.ormRepository.create({
      container_id,
      cpu_usage,
      memory_usage,
    });

    await this.ormRepository.save(containerStats);

    return containerStats;
  }

  public async findByContainerId(
    container_id: string
  ): Promise<ContainerStats[]> {
    const containerStats = await this.ormRepository.find({
      where: {
        container_id,
      },
    });

    return containerStats;
  }
}

export default ContainerStatsRepository;
