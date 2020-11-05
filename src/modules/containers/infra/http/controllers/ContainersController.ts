import { Request, Response } from 'express';
import dockerApi from '@shared/services/DockerApi';

export default class ContainersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { all } = request.query;

    const containersResponse = await dockerApi.get('/containers/json', {
      params: { all },
    });

    return response.json(containersResponse.data);
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const { name } = request.query;

    const { Image, ExposedPorts, HostConfig } = request.body;

    const containerResponse = await dockerApi.post(
      '/containers/create',
      {
        Image,
        ExposedPorts,
        HostConfig,
      },
      {
        params: {
          name,
        },
      }
    );

    await dockerApi.post(`/containers/${name}/start`);

    return response.json(containerResponse.data);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const containerResponse = await dockerApi.get(`/containers/${id}/json`);

    return response.json(containerResponse.data);
  }

  public async destroy(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id } = request.params;

    await dockerApi.delete(`/containers/${id}`);

    return response.status(204).send();
  }
}
