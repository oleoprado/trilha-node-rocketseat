import { Router } from 'express';
import { CategoriesRepository } from '../modules/cars/repositories/CategoriesRepository';
import { CreateCategoryService } from '../modules/cars/services/CreateCategoryService';

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post('/', (req, res) => {

});

categoriesRoutes.get('/', (req, res) => {
  const allCategories = categoriesRepository.list();

  return res.status(200).json(allCategories);
});

export { categoriesRoutes };