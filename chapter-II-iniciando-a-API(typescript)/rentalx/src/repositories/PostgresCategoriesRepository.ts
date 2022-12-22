import { Category } from "../model/Category";
import { ICategoriesRepository } from "./ICategoriesRepository";


class PostgresCategoriesRepository implements ICategoriesRepository {
  findByName(name: string): Category {
    console.log(name);
    throw new Error ('');
  };
  list(): Category[] {
    throw new Error ('');
  };
  create(name: string, description: string): void {
    console.log(name, description);
  };
}

export { PostgresCategoriesRepository };