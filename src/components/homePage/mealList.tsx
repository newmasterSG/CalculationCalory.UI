import {
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Container,
} from "@mui/material";
import { MealItem, MealType } from "../../models/mealItem";
import AddIcon from "@mui/icons-material/Add";
import ProductPopup from "./popUp/productPopup";
import { useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import Box from "@mui/material/Box";
import { ProductContainer } from "./ProductItem/ProductContainer";

interface MealProps {
  meal: MealType;
  items: MealItem[];
  deleteItem: (type: MealType, id: number) => void;
}

export const MealList: React.FC<MealProps> = ({ meal, items, deleteItem }) => {
  const [popupOpen, setPopupOpen] = useState(false);

  const handleOpenPopup = () => setPopupOpen(true);
  const handleClosePopup = () => setPopupOpen(false);

  return (
    <Box mb={2}>
      <Container sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="h6" sx={{ color: "#00ffff" }}>
          {meal}
        </Typography>
        <IconButton onClick={() => handleOpenPopup()} sx={{ color: "#00ffff" }}>
          <AddIcon />
        </IconButton>
      </Container>
      <List>
        {items.map((item, index) => (
          <ListItem key={index}>
            <ListItemText primary={<ProductContainer product={item} />} />
            <IconButton onClick={() => deleteItem(meal, item.uniqueId!)}>
              <RemoveIcon sx={{ color: "#e0e0e0" }} />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <ProductPopup meal={meal} open={popupOpen} onClose={handleClosePopup} />
    </Box>
  );
};
