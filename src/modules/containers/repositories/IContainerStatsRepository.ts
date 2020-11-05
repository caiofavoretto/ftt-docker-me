import ICreateContainerStatsDTO from '../dtos/ICreateContainerStatsDTO';
import ContainerStats from '../infra/typeorm/schemas/ContainerStats';

export default interface IContainerStatsRepository {
  create(data: ICreateContainerStatsDTO): Promise<ContainerStats>;
  findByContainerId(container_id: string): Promise<ContainerStats[]>;
}
