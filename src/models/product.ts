export interface BaseProductDTO {
    name: string;
    protein: number;
    fat: number;
    carb: number;
}

export interface ProductDTO extends BaseProductDTO {
    id: number;
    calories: number;
}

export interface CreateProductDTO extends BaseProductDTO { }

export interface CreateProductCommand {
    productDTO: CreateProductDTO;
  }