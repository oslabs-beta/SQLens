import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TableMenu from './TableMenu';

const GroupNode = ({ data }) => {
    return (
      <Box 
        className="group-node" 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          justifyContent: 'space-between',
            color: 'black',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body1" sx={{ flexGrow: 1, marginLeft: '20px' }}>
            {data.label}
          </Typography>
   
          <TableMenu tableData={data}/>
      
        </Box>
      </Box>
    );
  };
  
  export default GroupNode;
