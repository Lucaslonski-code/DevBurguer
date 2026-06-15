import express from 'express';
import routes from './routes.js';
import fileRoutesConfig from './config/fileRoutes.cjs';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/product-file', fileRoutesConfig);
app.use('/category-file', fileRoutesConfig);

app.use(routes);

export default app;
