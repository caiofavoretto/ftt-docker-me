import { Request, Response } from 'express';
import { container } from 'tsyringe';

import dockerApi from '@shared/services/DockerApi';

import CreateContainerStatsService from '@modules/containers/services/CreateContainerStatsService';

export default class ContainerStatsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    // const { stream } = request.query;

    const containerStatsResponse = await dockerApi.get(
      `/containers/${id}/stats`,
      {
        params: { stream: false },
      }
    );

    const createContainerStats = container.resolve(CreateContainerStatsService);

    const containerStats = await createContainerStats.execute({
      container_id: id,
      ...containerStatsResponse.data,
    });

    return response.json(containerStats);
  }
}
