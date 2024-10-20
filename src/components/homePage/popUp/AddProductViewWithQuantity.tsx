import React, { useState } from "react";
import { MealItem } from "../../../models/mealItem";
import { Button, TextField, Typography } from "@mui/material";

interface AddProductViewWithQuantityProps {
  product: MealItem;
  onSubmit: (product: MealItem, quantity: number) => void;
  onBack?: () => void;
}

const AddProductViewWithQuantity: React.FC<AddProductViewWithQuantityProps> = ({
  product,
  onSubmit,
  onBack,
}) => {
  const [quantity, setQuantity] = useState<number>(0);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(event.target.value));
  };

  const handleSubmit = () => {
    if (quantity > 0) {
      onSubmit(product, quantity);
    } else {
      alert("Please enter a valid quantity.");
    }
  };

  return (
    <div>
      <Typography variant="h6">{product.name}</Typography>
      <TextField
        label="Quantity (grams)"
        type="number"
        value={quantity}
        onChange={handleQuantityChange}
        fullWidth
        margin="normal"
      />
      <Button onClick={handleSubmit} color="primary">
        Add to Meal
      </Button>
      <Button onClick={onBack} color="secondary">
        Back to Product List
      </Button>
    </div>
  );
};

export default AddProductViewWithQuantity;
