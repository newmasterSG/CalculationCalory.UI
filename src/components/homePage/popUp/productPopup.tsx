import { Dialog, DialogTitle, DialogContent, TextField, Button, List, ListItem, ListItemText, DialogActions, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { MealItem, MealType } from "../../../models/mealItem";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { addMealItem } from "../../../store/slicers/mealSlicer";
import { ListProductPopUp } from "./productListPopUp";
import { AddProductView } from "./addProductView";
import Box from '@mui/material/Box';
import { ProductDTO } from "../../../models/product";
import { useGetProductsQuery } from "../../../api/productApi";

interface ProductPopupProps {
  open: boolean;
  onClose: () => void;
  meal: MealType;
}

const ProductPopup: React.FC<ProductPopupProps> = ({ open, onClose, meal }) => {
  const { data: products, isLoading } = useGetProductsQuery();

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

  if (isLoading) return <p>Loading...</p>;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Product List</DialogTitle>
      <DialogContent>
        {isNewView ?
          <AddProductView handleViewChange={handleNewView} /> :
          <ListProductPopUp
            items={products ?? []}
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