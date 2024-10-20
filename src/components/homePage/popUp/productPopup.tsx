import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
} from "@mui/material";
import { useEffect, useState } from "react";
import { MealItem, MealType } from "../../../models/mealItem";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { ListProductPopUp } from "./productListPopUp";
import { AddProductView } from "./addProductView";
import { ProductDTO } from "../../../models/product";
import { useGetProductsQuery } from "../../../api/productApi";
import { addMealDailyLogAsync } from "../../../thunk/addMealDailyLogAsync";
import React from "react";
import useInfiniteScroll from "../../../hooks/useInfinityScroll";

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

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const { lastElementRef } = useInfiniteScroll({
    isLoading,
    isFetching,
    onLoadMore: handleLoadMore,
  });

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
            ref={lastElementRef}
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
