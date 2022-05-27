import CartItem from './Cart'; 
import { useCart } from "react-use-cart"; 
import { useNavigate} from "react-router-dom"; 
import Grid from '@mui/material/Grid'; 
import Button from '@mui/material/Button'; 
import StripeCheckout from 'react-stripe-checkout'; 
import React, { useState } from 'react'; 
import axios from 'axios'; 
import Swal from 'sweetalert2'; 
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal); 
const CartProduct = () => { 
let navigate = useNavigate (); 
 const { 
 isEmpty, 
 items, 
 totalItems, 
 cartTotal, 
 emptyCart, 
 clearCartMetadata 
 } = useCart();
 const publishableKey = 
 'pk_test_51L2uC6AF4FHT1VvcVR8uDrEc9ZBAjJcLe3h7v7jP6PgkjSxyXJ8jC8OmwOqg6W9lloBjUCDMwWCqSQwF7DmnplR100Jn78wNc3';  
 const [product, setProduct] = useState({ 
    name: 'Headphone', 
    price: 5, 
    }); 
    const priceForStripe = product.price * 100; 
    const handleSuccess = () => { 
    MySwal.fire({ 
    icon: 'success', 
    title: 'Payment was successful', 
    time: 4000, 
    }); 
    }; 
    const handleFailure = () => { 
    MySwal.fire({ 
    icon: 'error', 
    title: 'Payment was not successful', 
    time: 4000, 
    }); 
    }; 
 const payNow = async token => { 
    try { 
    const response = await axios({ 
    url: 'http://localhost:3001/api/payment', 
    method: 'post', 
    data: { 
    amount: product.price * 100, 
    token, 
    }, 
    }); 
    if (response.status === 200) { 
    handleSuccess(); 
    } 
    } catch (error) { 
    handleFailure(); 
    console.log(error); 
    } 
    };
 const more=()=>{ 
 navigate("/"); 
 } 
 const clear=()=>{ 
 //Vider le cart
 emptyCart(); 
 clearCartMetadata(); 
 } 
if (isEmpty || totalItems===0) return <h1>Cart Empty</h1>; 
 return ( 
 
 <Grid container spacing={2} columns={15} marginTop={10}
marginLeft={10}>
 <Grid item xs={5}>
 {
 items.map(item => <CartItem key={item._id} item={item}/>) 
 } 
 </Grid> 
 <Grid item xs={5}> 
 
 <Button color="error" variant="outlined"
onClick={more}>Ajouter des articles</Button>
 <p>Total Articles</p>
<h4>{totalItems}</h4>
 <p>Total Payement</p>
<h3>{cartTotal} TND</h3>
 <hr />
<div>
<StripeCheckout
 stripeKey={publishableKey}
 label="Pay Now"
 name="Pay With Credit Card"
 billingAddress
 shippingAddress
 amount={cartTotal}
 description={`Your total is $${cartTotal}`}
 token={payNow}

 />

 <Button color="info" variant="outlined"
onClick={clear}>Annuler</Button>
 </div>
 </Grid>
 
 </Grid>
 ); 
} 
 
export default CartProduct; 