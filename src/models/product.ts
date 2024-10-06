export interface BaseProductDTO {
    name: string;
    protein: number;
    fat: number;
    carb: number;
    quantity?: number;
}

export interface ProductDTO extends BaseProductDTO {
    id: number;
    calories: number;
}

export interface CreateProductDTO extends BaseProductDTO { 
    perGram?: number;
}

export interface CreateProductCommand {
    productDTO: CreateProductDTO;
}