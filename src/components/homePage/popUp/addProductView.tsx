import { Button, IconButton, TextField } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import { MealItem } from "../../../models/mealItem";
import { useCreateProductMutation } from "../../../api/productApi";
import { CreateProductDTO } from "../../../models/product";
import React from "react";
import { baseGrammPerDish } from "../../../constants";

interface AddProductViewProps {
  handleViewChange: (change: boolean) => void;
}

export const AddProductView: React.FC<AddProductViewProps> = ({
  handleViewChange,
}) => {
  const [createProduct] = useCreateProductMutation();
  const [formData, setFormData] = useState<MealItem>({
    id: 0,
    name: "",
    protein: 0,
    fat: 0,
    carb: 0,
    quantity: 0,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: id === "name" ? value : value === "" ? 0 : parseFloat(value),
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newProduct: CreateProductDTO = {
      name: formData.name,
      protein: formData.protein,
      fat: formData.fat,
      carb: formData.carb,
      perGram: formData.quantity || baseGrammPerDish,
    };

    try {
      await createProduct({ productDTO: newProduct }).unwrap();
      alert("Product created successfully!");
    } catch (error) {
      alert("Failed to create product.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid xs={4}>
          <IconButton onClick={() => handleViewChange(false)}>
            <ArrowBackIcon />
          </IconButton>
        </Grid>
        <Grid xs={12} sm={6}>
          <TextField
            required
            id="name"
            label="Product Name"
            variant="outlined"
            fullWidth
            value={formData.name}
            onChange={handleChange}
          />
        </Grid>
        <Grid xs={12} sm={6}>
          <TextField
            required
            id="protein"
            label="Protein (g)"
            variant="outlined"
            type="number"
            fullWidth
            value={formData.protein}
            onChange={handleChange}
            inputProps={{ min: "0", step: "0.01" }}
          />
        </Grid>
        <Grid xs={12} sm={6}>
          <TextField
            required
            id="fat"
            label="Fat (g)"
            variant="outlined"
            type="number"
            fullWidth
            value={formData.fat}
            onChange={handleChange}
            inputProps={{ min: "0", step: "0.01" }}
          />
        </Grid>
        <Grid xs={12} sm={6}>
          <TextField
            required
            id="carb"
            label="Carbohydrates (g)"
            variant="outlined"
            type="number"
            fullWidth
            value={formData.carb}
            onChange={handleChange}
            inputProps={{ min: "0", step: "0.01" }}
          />
        </Grid>
        <Grid xs={12} sm={6}>
          <TextField
            required
            id="quantity"
            label="Per dish (g)"
            variant="outlined"
            type="number"
            fullWidth
            value={formData.quantity}
            onChange={handleChange}
            inputProps={{ min: "0", step: "0.01" }}
          />
        </Grid>
        <Grid xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
