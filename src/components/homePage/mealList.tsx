import { Typography, List, ListItem, ListItemText, IconButton, Container } from "@mui/material";
import { MealItem, MealType } from "../../models/mealItem";
import AddIcon from '@mui/icons-material/Add';
import ProductPopup from "./popUp/productPopup";
import { useState } from "react";
import RemoveIcon from '@mui/icons-material/Remove';
import Box from '@mui/material/Box';

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
      <Container sx={{ display: 'flex' }}>
        <Typography variant="h6">{meal}</Typography>
        <IconButton onClick={() => handleOpenPopup()}>
          <AddIcon />
        </IconButton>
      </Container>
      <List>
        {items.map((item, index) => (
          <ListItem key={index}>
            <ListItemText primary={item.name} />
            <IconButton onClick={() => deleteItem(meal, item.id)}>
              <RemoveIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <ProductPopup meal={meal} open={popupOpen} onClose={handleClosePopup} />
    </Box>
  );
};
