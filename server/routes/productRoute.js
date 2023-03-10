import express from 'express';
import { getAllProducts } from '../controllers/productsControllers.js';

const productRouter = express.Router();

productRouter.get('/api/products', getAllProducts);

export default productRouter;
