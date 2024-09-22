export interface AddProductDailyLogDTO {
    productId: number;
    quantity: number;
    date: Date;
    mealType: number;
}

export interface AddProductToDailyLogCommand {
    dto: AddProductDailyLogDTO;
}