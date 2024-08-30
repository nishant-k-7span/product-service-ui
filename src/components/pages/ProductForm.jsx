import React, { useState } from "react";
import { TextField, Button, MenuItem, InputAdornment, Grid2, Box, Divider, Typography } from "@mui/material";
import "./ProductForm.css"; // Import the CSS file
import useAxios from "../../app/hooks/useAxios";
import { API_ENDPOINT } from "../../app/constants/constant";
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form'

const ProductForm = () => {
    const {post} = useAxios();
    const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    quantity: "",
    description: "",
    image: null,
  });



  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({
    defaultValues: {
      id:"",
      name: "",
      price: "",
      quantity: "",
      description: ""
    }
  })

        // Watch name and email fields for changes
        const nameValue = watch('name')
  
        // Check if both fields are valid
        const isFormValid = !errors.name
    
        console.log(errors)

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
  };

  const onSubmit = async (e) => {
    // e.preventDefault();
    // const formData = new FormData();
    // formData.append("id", Math.floor((Math.random() * 100) + 1));
    // formData.append("name", product.name);
    // formData.append("price", product.price);
    // formData.append("quantity", product.quantity);
    // formData.append("description", product.description);
  
    await post(API_ENDPOINT.GET_PRODUCT_BY_ID, product, true)
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
    <Box sx={{padding:'20px',paddingTop:'0px'}} >
    <form onSubmit={handleSubmit(onSubmit)} >
      <Grid2 container spacing={2}>
        <Grid2 size={6} item xs={12} md={6}>
          <TextField
            label="Name"
            name="name"
            value={product.name}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            validate={register('name', {
              required: 'Name is required',
              maxLength: {
                value: 30,
                message: 'You can enter maximum 30 characters only.'
              }
            })}
          />
           {errors.name && (
                  <Typography className="text-[#b91c1c]">
                    {errors.name?.message}
                  </Typography>
           )}
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
           <Button type="submit" disabled={!isFormValid} variant="contained" sx={{  backgroundColor: '#4936EF', textTransform: "capitalize"}} >Save</Button>
        </Grid2>
      </Grid2>
    </form>
    </Box>
    </>

    </Box>
  );
};

export default ProductForm;
