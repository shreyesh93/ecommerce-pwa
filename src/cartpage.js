import React from "react";
import { Container, Typography, List, ListItem, ListItemText, Button, Divider, ListItemAvatar, Avatar, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

function CartPage({ cartItems, setCartItems }) {
  const navigate = useNavigate();

  // Calculate total bill
  const totalBill = cartItems.reduce((total, item) => total + parseFloat(item.price.replace("$", "")), 0);

  // Handle order button click
  const handleOrder = () => {
    alert("Order placed successfully!");
    setCartItems([]); // Clear the cart after order
    navigate("/"); // Redirect to home
  };

  return (
    <Container style={{ marginTop: "20px", textAlign: "center" }}>
      <Typography variant="h4">Shopping Cart</Typography>

      {cartItems.length === 0 ? (
        <Typography variant="h6" style={{ marginTop: "20px" }}>
          Nothing added
        </Typography>
      ) : (
        <>
          <List>
            {cartItems.map((item, index) => (
              <React.Fragment key={index}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar
                      variant="square"
                      src={item.image}
                      alt={item.name}
                      sx={{ width: 70, height: 70, marginRight: 2 }} // Added marginRight for spacing
                    />
                  </ListItemAvatar>
                  <Box>
                    <ListItemText primary={item.name} secondary={`Price: ${item.price}`} />
                  </Box>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>

          <Typography variant="h6" style={{ marginTop: "20px" }}>
            Total Bill: ${totalBill.toFixed(2)}
          </Typography>

          {/* Order Button (Visible only if cart is not empty) */}
          <Button variant="contained" color="primary" style={{ marginTop: "20px", marginRight: "10px" }} onClick={handleOrder}>
            Order Now
          </Button>

          {/* Back to Products Button */}
          <Button variant="outlined" color="secondary" style={{ marginTop: "20px" }} onClick={() => navigate("/")}>
            Back to Products
          </Button>
        </>
      )}
    </Container>
  );
}

export default CartPage;
