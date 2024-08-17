import { ListItem, ListItemText, List, Box, IconButton, TextField } from "@mui/material";
import { MealItem } from "../../../models/mealItem"
import styles from '../../../css/productPopUp.module.css'
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";

interface ListProductProps {
    items: MealItem[];
    handleAddProductToList: (product: MealItem) => void;
    handleNewView: (active: boolean) => void;
}

export const ListProductPopUp: React.FC<ListProductProps> = ({ items, handleAddProductToList, handleNewView }) => {
    const [products, setProducts] = useState(items);
    const [search, setSearch] = useState('');

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase())
    );

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
            <List>
                {filteredProducts.map((product) => (
                    <ListItem key={product.id}
                        className={styles.productItem}
                        onClick={(e) => handleAddProductToList(product)}>
                        <ListItemText primary={product.name} />
                    </ListItem>
                ))}
            </List>
        </>
    )
}