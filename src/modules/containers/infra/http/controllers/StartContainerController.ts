import { Request, Response } from 'express';
import dockerApi from '@shared/services/DockerApi';

export default class StartContainerController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { name } = request.params;

    await dockerApi.post(`/containers/${name}/start`);

    return response.status(204).send();
  }
}
