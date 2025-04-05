import React from 'react';
import { AppBar, Toolbar, Typography, Container, Grid, Card, CardMedia, CardContent, Button, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';

// Sample Product Data with correct image imports
const products = [
  { id: 1, name: "Product 1", price: "$10", image: require('./assets/product1.jpg') },
  { id: 2, name: "Product 2", price: "$20", image: require('./assets/product2.jpg') },
  { id: 3, name: "Product 3", price: "$30", image: require('./assets/product3.jpg') },
  { id: 4, name: "Product 4", price: "$40", image: require('./assets/product4.jpg') }
];

function EcommerceApp({ cartItems, setCartItems }) {

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  return (
    <>
      {/* Header Section */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            E-Commerce
          </Typography>
          <Link to="/cart">
            <Badge badgeContent={cartItems.length} color="error">
              <ShoppingCartIcon style={{ color: "white" }} />
            </Badge>
          </Link>
        </Toolbar>
      </AppBar>

      {/* Main Content Section */}
      <Container style={{ marginTop: "20px" }}>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={product.image} // Correctly use the imported image
                  alt={product.name}
                />
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body1">{product.price}</Typography>
                  <Button variant="contained" color="primary" fullWidth onClick={() => addToCart(product)}>
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default EcommerceApp;
