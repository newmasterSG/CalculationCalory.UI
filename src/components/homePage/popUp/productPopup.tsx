import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  DialogActions,
  IconButton,
} from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { MealItem, MealType } from "../../../models/mealItem";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { addMealItem } from "../../../store/slicers/mealSlicer";
import { ListProductPopUp } from "./productListPopUp";
import { AddProductView } from "./addProductView";
import Box from "@mui/material/Box";
import { ProductDTO } from "../../../models/product";
import { useGetProductsQuery } from "../../../api/productApi";
import { addMealDailyLogAsync } from "../../../thunk/addMealDailyLogAsync";
import React from "react";

interface ProductPopupProps {
  open: boolean;
  onClose: () => void;
  meal: MealType;
}

const ProductPopup: React.FC<ProductPopupProps> = ({ open, onClose, meal }) => {
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching } = useGetProductsQuery({
    page,
    pageSize: 10,
  });

  useEffect(() => {
    if (data) {
      setProducts((prevProducts) => [...prevProducts, ...data]);
    }
  }, [data]);

  const dispatch = useAppDispatch();
  const [isNewView, setNewView] = useState<boolean>(false);

  const lastIdByType = useAppSelector((state) => state.meals.lastUsedId[meal]);

  const handleAddProductToList = async (item: MealItem, quantity: number) => {
    const newItem = { ...item, uniqueId: lastIdByType + 1, quantity: quantity };

    try {
      await dispatch(
        addMealDailyLogAsync({ type: meal, item: newItem })
      ).unwrap();
    } catch {}
  };

  const observer = useRef<IntersectionObserver | null>(null);
  const lastProductElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (isLoading || isFetching) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, isFetching]
  );

  const handleNewView = (changeState: boolean) => {
    setNewView(changeState);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Product List</DialogTitle>
      <DialogContent>
        {isNewView ? (
          <AddProductView handleViewChange={handleNewView} />
        ) : (
          <ListProductPopUp
            items={products ?? []}
            handleAddProductToList={handleAddProductToList}
            handleNewView={handleNewView}
            ref={lastProductElementRef}
          />
        )}
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
