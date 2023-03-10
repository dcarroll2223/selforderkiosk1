import express from 'express';
import { getAllCategories } from '../controllers/categoriesControllers.js';

const categoriesRouter = express.Router();

categoriesRouter.get('/api/categories', getAllCategories);

export default categoriesRouter;
