import React, { useEffect, useState } from 'react';
import { Button,Box, IconButton, styled, Typography } from '@mui/material';
import useAxios from '../../app/hooks/useAxios';
import { API_ENDPOINT } from '../../app/constants/constant';
import DataGrid from '../core/DataGrid';
import { Delete, Edit } from '@mui/icons-material';
import { GridActionsCellItem } from '@mui/x-data-grid';
import "./ProductTable.css"; // Import the CSS file
import MuiButton from '../core/MuiButton';
import { useNavigate } from 'react-router-dom';
import LabTabs from './LabTabs';


const ProductTable = () => {

    const { get } = useAxios();
    const { del } = useAxios();
    const navigate = useNavigate();

    const [data , setData] = useState([])
    const [isDeleted , setIsDeleted] = useState(false)


    const columns = [
      { field: 'id', headerName: '#', width: 100 },
      { field: 'name', headerName: 'Name', width: 150 },
      { field: 'description', headerName: 'Description', width: 350 },
      { field: 'price', headerName: 'Price', width: 150 },
      { field: 'quantity', headerName: 'Quantity', width: 168 },
      {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 270,
        cellClassName: 'actions',
        getActions: ({ id }) => {
  
        //   if (isInEditMode) {
        //     return [
        //       <GridActionsCellItem
        //         icon={<SaveIcon />}
        //         label="Save"
        //         sx={{
        //           color: 'primary.main',
        //         }}
        //         onClick={handleSaveClick(id)}
        //       />,
        //       <GridActionsCellItem
        //         icon={<CancelIcon />}
        //         label="Cancel"
        //         className="textPrimary"
        //         onClick={handleCancelClick(id)}
        //         color="inherit"
        //       />,
        //     ];
        //   }
  
          return [
            <GridActionsCellItem
              icon={<Edit />}
              label="Edit"
              className="textPrimary"
              onClick={(event) => handleEditClick(event,id)}
              color="inherit"
            />,
            <GridActionsCellItem
              icon={<Delete />}
              label="Delete"
              onClick={(event) => handleDeleteClick(event,id)}
              color="inherit"
            />,
          ];
        },
      },
    ];


    const handleEditClick = (event,id) =>{
        navigate(`/edit/${id}`, {
          replace: true
        })
    }

    
    const handleDeleteClick = (event,id) =>{
      setIsDeleted(false)
      del(`${API_ENDPOINT.GET_PRODUCT_BY_ID}${id}`, null, true)
        .then((response) => {
          setIsDeleted(true)
        })
        .catch((error) => {
          console.error("Error fetching folders:", error);
        });
    }

    const fetchAllProducts = () => {
        get(`${API_ENDPOINT.GET_PRODUCT_BY_ID}`, null, true)
          .then((response) => {
            console.log(response.data)
            setData(response.data)
          })
          .catch((error) => {
            console.error("Error fetching folders:", error);
          });
      };

      useEffect(() => {
        fetchAllProducts();
      }, [isDeleted]);

    
  //  const onClick = () => {
  //       navigate('/add', {
  //         replace: true
  //       })
  //   }  

  return (<>
    <Box sx={{width:'80%'}}>
    {/* <Typography className="w-full flex justify-end gap-6 " component="div">
        <MuiButton onClick={onClick}>Add New Product</MuiButton>
    </Typography>   */}
    <Typography sx={{font:"Gilroy",fontWeight:'700'}} variant='h5'>Product List </Typography>
    <DataGrid
      sx={{
        borderRadius: '10px',
        border:'1px solid',
        borderColor:'#E4E4E7',
        marginTop:"20px",
        background:'#FFFFFF',
        '& .MuiDataGrid-columnHeaders': {
          borderTop: 'none',
          borderBottom:'none'
        },
        '& .MuiDataGrid-columnHeaderTitle': {
          whiteSpace: 'normal'
        }
      }}
      rows={data}
      columns={columns}
      disableRowSelectionOnClick={true}
      checkboxSelection={false}
    />
  </Box>
  </>
  );
};

export default ProductTable;
