export enum Nutrients {
    PROTEIN = 'Protein',
    FAT = 'Fat',
    Carbs = 'Carbohydrates'
}

export interface NutrientData {
    name: Nutrients;
    value: number; // The value could be a percentage or a numeric amount
}