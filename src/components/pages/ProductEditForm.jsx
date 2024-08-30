import React, { useEffect, useState } from "react";
import { TextField, Button, InputAdornment, Grid2, Box, Divider, Typography } from "@mui/material";
import "./ProductForm.css"; // Import the CSS file
import useAxios from "../../app/hooks/useAxios";
import { API_ENDPOINT } from "../../app/constants/constant";
import { useNavigate, useParams } from "react-router-dom";

const ProductEditForm = () => {
    const {post} = useAxios();
    const navigate = useNavigate();
    const {id} = useParams();
    const { get } = useAxios();
    const [product, setProduct] = useState({
      id:"",
      name: "",
      price:"",
      quantity: "",
      description:"",
    });

    useEffect(() =>{
      get(`${API_ENDPOINT.GET_PRODUCT_BY_ID}${id}`, null, true)
      .then((response) => {
        console.log(response.data)
        if(response.data){
          setProduct({
            id:response.data.id,
            name: response.data.name,
            price: response.data.price,
            quantity: response.data.quantity,
            description: response.data.description,
          })
      }
      })
      .catch((error) => {
        console.error("Error fetching folders:", error);
      });
    },[])

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("quantity", product.quantity);
    formData.append("description", product.description);
  
    await post(API_ENDPOINT.GET_PRODUCT_BY_ID, formData, true)
    .then((response) => {
       console.log(response.data)
       navigate('/', {
        replace: true
      })
    })
    .catch((error) => {
      console.error("Error updating question", error);
    });

    if (response.ok) {
      alert("Product submitted successfully!");
      // Reset form or handle success
    } else {
      alert("Failed to submit product.");
    }
  };

  return (
    <Box className="product-form-container" sx={{width:'82%',padding:'0px'}}>
    <Typography className="font-title" variant='h6'sx={{marginBottom:"50px",font:"Gilroy",fontWeight:'700',backgroundColor:'#E7E8F7',paddingX:'16px',paddingY:'24px',borderStartEndRadius:'10px',borderStartStartRadius:'10px'}}>Product details</Typography>  
    {/* <Divider  /> */}
    <>
    <Box sx={{padding:'20px',paddingTop:'0px'}}>
    <form onSubmit={handleSubmit} >
      <Grid2 container spacing={2}>
        <Grid2 size={6} item xs={12} md={6}>
          <TextField
            label="Name"
            name="name"
            value={product.name}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
        </Grid2>
        <Grid2 size={6} item xs={12} md={6}>
          <TextField
            label="Price"
            name="price"
            value={product.price}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
          />
        </Grid2>
        <Grid2 size={6} item xs={12} md={6}>
          <TextField
            label="Quantity"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
        </Grid2>
        <Grid2 size={6} item xs={12}>
          <TextField
            label="Description"
            name="description"
            value={product.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            variant="outlined"
          />
        </Grid2>
        <Grid2 item xs={12} md={6}>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="image-upload"
            type="file"
            onChange={handleImageChange}
          />
    
        </Grid2>
        <Grid2 item xs={12}>
           <Button type="submit" variant="contained" sx={{  backgroundColor: '#4936EF', textTransform: "capitalize"}} >Save</Button>
        </Grid2>
      </Grid2>
    </form>
    </Box>
    </>
    </Box>
  );
};

export default ProductEditForm;
