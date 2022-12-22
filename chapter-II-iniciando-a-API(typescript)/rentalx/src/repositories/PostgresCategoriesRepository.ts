import { Category } from "../model/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "./ICategoriesRepository";


class PostgresCategoriesRepository implements ICategoriesRepository {
  findByName(name: string): Category {
    console.log(name);
    throw new Error ('');
  };
  list(): Category[] {
    throw new Error ('');
  };
  create({name, description}: ICreateCategoryDTO): void {
    console.log(name, description);
  };
}

export { PostgresCategoriesRepository };