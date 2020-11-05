import { Request, Response } from 'express';
import dockerApi from '@shared/services/DockerApi';

export default class SttopContainerController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { name } = request.params;

    await dockerApi.post(`/containers/${name}/stop`);

    return response.status(204).send();
  }
}
