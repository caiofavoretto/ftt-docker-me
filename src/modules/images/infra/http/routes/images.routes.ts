import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ImagesController from '../controllers/ImagesController';
import UnusedImagesController from '../controllers/UnusedImagesController';

const imagesController = new ImagesController();
const unusedImagesController = new UnusedImagesController();

const imagesRouter = Router();

imagesRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      all: Joi.boolean().optional(),
    },
  }),
  imagesController.index
);

imagesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  imagesController.store
);

imagesRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  imagesController.show
);

imagesRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  imagesController.destroy
);

// Actions
imagesRouter.delete('/', unusedImagesController.destroy);

export default imagesRouter;
