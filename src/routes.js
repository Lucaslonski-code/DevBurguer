import { Router } from 'express';
import UserController from './app/controllers/UserController.js';
import SessionController from './app/controllers/SessionController.js';
import ProductController from './app/controllers/ProductController.js';
import multer from 'multer';
import multerConfig from './config/multer.cjs';
import authMiddleware from './middlewares/auth.js';
import CategoryController from './app/controllers/CategoryController.js';
import adminAuthMiddleware from './middlewares/admin.js';

const routes = new Router();

const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store); 

routes.use(authMiddleware);
routes.post('/products', adminAuthMiddleware, upload.single('file'), ProductController.store);
routes.get('/products', adminAuthMiddleware, ProductController.index);
routes.put('/products/:id', adminAuthMiddleware, upload.single('file'), ProductController.update);

routes.post('/categories', adminAuthMiddleware, upload.single('file'), CategoryController.store);
routes.get('/categories', adminAuthMiddleware, CategoryController.index);
routes.put('/categories/:id', adminAuthMiddleware, upload.single('file'), CategoryController.update);
routes.delete('/categories/:id', adminAuthMiddleware, CategoryController.delete);

export default routes;
