import { Dialog, DialogTitle, DialogContent, TextField, Button, List, ListItem, ListItemText, DialogActions, Box, IconButton } from "@mui/material";
import { useState } from "react";
import { MealItem, MealType } from "../../../models/mealItem";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { addMealItem } from "../../../store/slicers/mealSlicer";
import { ListProductPopUp } from "./productListPopUp";
import { AddProductView } from "./addProductView";


interface ProductPopupProps {
  open: boolean;
  onClose: () => void;
  meal: MealType;
}

export const initialProducts: MealItem[] = [
  { id: 1, name: 'Apple', protein: 0.3, fat: 0.2, carb: 14 },
  { id: 2, name: 'Banana', protein: 1.3, fat: 0.3, carb: 23 },
  { id: 3, name: 'Orange', protein: 0.9, fat: 0.1, carb: 12 },
  { id: 4, name: 'Strawberry', protein: 0.7, fat: 0.3, carb: 8 },
  { id: 5, name: 'Grapes', protein: 0.7, fat: 0.2, carb: 17 },
  { id: 6, name: 'Blueberry', protein: 0.7, fat: 0.3, carb: 14 },
];

const ProductPopup: React.FC<ProductPopupProps> = ({ open, onClose, meal }) => {

  const dispatch = useAppDispatch();
  const [isNewView, setNewView] = useState<boolean>(false);

  const lastIdByType = useAppSelector((state) => state.meals.lastUsedId[meal]);

  const handleAddProductToList = (item: MealItem) => {
    const newItem = { ...item, id: lastIdByType + 1 };

    dispatch(addMealItem({ type: meal, item: newItem }))
  }

  const handleNewView = (changeState: boolean) => {
    setNewView(changeState);
  }

  // const handleAddProduct = () => {
  //   if (newProduct.trim()) {
  //     setProducts([...products, newProduct.trim()]);
  //     setNewProduct('');
  //   }
  // };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Product List</DialogTitle>
      <DialogContent>
        {isNewView ?
          <AddProductView handleViewChange={handleNewView} /> :
          <ListProductPopUp
            items={initialProducts}
            handleAddProductToList={handleAddProductToList}
            handleNewView={handleNewView}
          />
        }

      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductPopup;