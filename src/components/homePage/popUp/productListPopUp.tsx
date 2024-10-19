import { ListItem, ListItemText, List, IconButton, TextField } from "@mui/material";
import { MealItem } from "../../../models/mealItem"
import AddIcon from '@mui/icons-material/Add';
import { forwardRef, useEffect, useState } from "react";
import Box from '@mui/material/Box';
import { ProductDTO } from "../../../models/product";
import React from "react";
import AddProductViewWithQuantity from "./AddProductViewWithQuantity";

interface ListProductProps {
    items: ProductDTO[];
    handleAddProductToList: (product: MealItem, quantity: number) => void;
    handleNewView: (active: boolean) => void;
}

export const ListProductPopUp = forwardRef<HTMLElement, ListProductProps>(({ items, handleAddProductToList, handleNewView }, ref) => {
    const [products, setProducts] = useState(items);
    const [search, setSearch] = useState('');
    const [selectedProduct, setSelectedProduct] = useState<ProductDTO>();

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        if (items) {
            setProducts(items);
        }
    }, [items])

    return (
        <>
            <Box display="flex" justifyContent="space-between">
                <TextField
                    label="Search"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <IconButton onClick={() => handleNewView(true)}>
                    <AddIcon></AddIcon>
                </IconButton>
            </Box>
            {selectedProduct
                ? <AddProductViewWithQuantity product={selectedProduct} onSubmit={handleAddProductToList} />
                : <List>
                    {filteredProducts.map((product, index) => (
                        <ListItem key={product.id}
                            onClick={(e) => setSelectedProduct(product)}>
                            <ListItemText ref={filteredProducts.length === index + 1 ? ref : null} primary={product.name + `${filteredProducts.length === index + 1}`} sx={{ color: '#e0e0e0', border: '2px solid #00ffff', padding: '10px' }} />
                        </ListItem>
                    ))}
                </List>}
        </>
    )
});