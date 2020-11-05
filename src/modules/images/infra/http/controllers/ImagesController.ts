import { Request, Response } from 'express';
import dockerApi from '@shared/services/DockerApi';

export default class ContainersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { all } = request.query;

    const imagesResponse = await dockerApi.get('/images/json', {
      params: { all },
    });

    return response.json(imagesResponse.data);
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const imageResponse = await dockerApi.post(
      '/images/create',
      {},
      {
        params: {
          fromImage: name,
        },
      }
    );

    return response.json(imageResponse.data);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const imageResponse = await dockerApi.get(`/images/${id}/json`);

    return response.json(imageResponse.data);
  }

  public async destroy(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id } = request.params;

    await dockerApi.delete(`/images/${id}`);

    return response.status(204).send();
  }
}
