import { Request, Response } from 'express';
import dockerApi from '@shared/services/DockerApi';

export default class InactiveContainersController {
  public async destroy(
    request: Request,
    response: Response
  ): Promise<Response> {
    await dockerApi.post('/containers/prune');

    return response.status(204).send();
  }
}
