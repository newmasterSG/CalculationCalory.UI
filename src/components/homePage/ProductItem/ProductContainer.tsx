import { MealItem } from "../../../models/mealItem";
import CalculationHelper from "../../../helpers/calculationHelper";

interface ProductContainerProps {
  product: MealItem;
}

export const ProductContainer: React.FC<ProductContainerProps> = ({
  product,
}) => {
  return (
    <div
      style={{
        color: "#e0e0e0",
        border: "2px solid #00ffff",
        padding: "10px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <span>{product.name}</span>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <span>{product.quantity + " g"}</span>
        <span>
          {CalculationHelper.calculateCalories(product).toFixed(2) + " kcal"}
        </span>
      </div>
    </div>
  );
};
