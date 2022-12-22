import { Category } from "../model/Category";

// DTO => Data transfer object
interface ICreateCategoryDTO {
  name: string;
  description: string;
}

class CategoriesRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  // void => tipo void não retorna nada

  create({ name, description}: ICreateCategoryDTO): void {
    const category = new Category();

  // Object.assing(destion, ...origens) => copiar os valores de um ou mais objetos de origem p/ objeto destino
    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
    });

    this.categories.push(category);
  }

  list(): Category[] {
    return this.categories;
  }

  findByName(name: string): Category | undefined {
    const category = this.categories.find((category) => category.name === name);
    return category;
  }
}

export { CategoriesRepository }