import { Request, Response } from 'express';
import dockerApi from '@shared/services/DockerApi';

export default class UnusedImagesController {
  public async destroy(
    request: Request,
    response: Response
  ): Promise<Response> {
    await dockerApi.post('/images/prune');

    return response.status(204).send();
  }
}
