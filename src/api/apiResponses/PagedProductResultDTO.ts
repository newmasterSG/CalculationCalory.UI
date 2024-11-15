import { ProductDTO } from "../../models/product";

export interface PagedProductResultDTO {
  products: ProductDTO[];
  totalPages: number;
}
