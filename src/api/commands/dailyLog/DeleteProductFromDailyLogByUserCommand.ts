export interface DeleteProductDTO {
    productId: number;
    userId?: number;
    mealType: number;
    creationDate: Date;
}

export interface DeleteProductFromDailyLogByUserCommand {
    dto: DeleteProductDTO;
}