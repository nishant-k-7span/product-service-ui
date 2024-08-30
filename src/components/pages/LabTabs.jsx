import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ProductTable from './ProductTable';

export default function LabTabs() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className="product-table-container" sx={{ width: '100%', typography: 'body1'}}>
      <TabContext value={value} >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example"sx={{background:'#ffff'}}>
            <Tab label="All" value="1" />
            <Tab label="Home & Decor" value="2" />
            <Tab label="Travel" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1"><ProductTable/></TabPanel>
        <TabPanel value="2">Home & Decor</TabPanel>
        <TabPanel value="3">Travel</TabPanel>
      </TabContext>
    </Box>
  );
}
