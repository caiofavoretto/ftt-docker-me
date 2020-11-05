import { Router } from 'express';
import ContainersRouter from '@modules/containers/infra/http/routes/containers.routes';
import ImagesRouter from '@modules/images/infra/http/routes/images.routes';

const routes = Router();

routes.use('/containers', ContainersRouter);
routes.use('/images', ImagesRouter);

export default routes;
