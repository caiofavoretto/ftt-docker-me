"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _ImagesController = _interopRequireDefault(require("../controllers/ImagesController"));

var _UnusedImagesController = _interopRequireDefault(require("../controllers/UnusedImagesController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const imagesController = new _ImagesController.default();
const unusedImagesController = new _UnusedImagesController.default();
const imagesRouter = (0, _express.Router)();
imagesRouter.get('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.QUERY]: {
    all: _celebrate.Joi.boolean().optional()
  }
}), imagesController.index);
imagesRouter.post('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    name: _celebrate.Joi.string().required()
  }
}), imagesController.store);
imagesRouter.get('/:id', (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().required()
  }
}), imagesController.show);
imagesRouter.delete('/:id', (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().required()
  }
}), imagesController.destroy); // Actions

imagesRouter.delete('/', unusedImagesController.destroy);
var _default = imagesRouter;
exports.default = _default;