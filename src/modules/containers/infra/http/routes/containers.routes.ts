import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ContainersController from '../controllers/ContainersController';
import StartContainerController from '../controllers/StartContainerController';
import StopContainerController from '../controllers/StopContainerController';
import InactiveContainersController from '../controllers/InactiveContainersController';
import ContainerStatsController from '../controllers/ContainerStatsController';

const containersController = new ContainersController();
const startContainerController = new StartContainerController();
const stopContainerController = new StopContainerController();
const inactiveContainersController = new InactiveContainersController();
const containerStatsController = new ContainerStatsController();

const containersRouter = Router();

containersRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      all: Joi.boolean().optional(),
    },
  }),
  containersController.index
);

containersRouter.post(
  '/',
  celebrate({
    [Segments.QUERY]: {
      name: Joi.string().required(),
    },
    [Segments.BODY]: {
      Image: Joi.string().required(),
      ExposedPorts: Joi.object().required(),
      HostConfig: Joi.object().required(),
    },
  }),
  containersController.store
);

containersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  containersController.show
);

containersRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  containersController.destroy
);

// Actions
containersRouter.get(
  '/:id/stats',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  containerStatsController.show
);

containersRouter.post(
  '/:name/start',
  celebrate({
    [Segments.PARAMS]: {
      name: Joi.string().required(),
    },
  }),
  startContainerController.store
);

containersRouter.post(
  '/:name/stop',
  celebrate({
    [Segments.PARAMS]: {
      name: Joi.string().required(),
    },
  }),
  stopContainerController.store
);

containersRouter.delete('/', inactiveContainersController.destroy);

export default containersRouter;
