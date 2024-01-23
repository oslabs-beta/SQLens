import React from 'react';
import {TableMenu, handleClose} from './TableMenu';
import { useState } from 'react';
import { Check } from '@mui/icons-material';
import { IconButton, Typography, Box } from '@mui/material';



const GroupNode = ({ data }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedLabel, setEditedLabel] = useState(data.label);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditTableName = () => {
    setIsEditing(true);
    console.log("Edit Table Name for:", data.label);
    handleClose();
  };

  const handleInputChange = (e: MouseEvent) => {
    // console.log(e.target.value);
    setEditedLabel(e.target.value);
  };  

  const handleCheckClick = async () => {
    setIsEditing(false);
    const response = await fetch('/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // This mutation is used to change the table name in the database
      // This is a graphQL query, not a SQL query
      body: JSON.stringify({
        query: `
          mutation editTableName($oldName: String!, $newName: String!){
            editTableName( oldName: $oldName, newName: $newName)
          }
        `,
        variables: { newName: editedLabel, oldName: data.label},
        //deleteColumnFromTable(tableName: ${data.parent}, columnName: ${data.label}): Table <-- if we want to get a string back instead of a table
      }),
    });

    const final = await response.json();
    if (final.errors) {
      setEditedLabel(data.label); 
      console.error(final.errors);
      throw new Error('Error changing table name');
    }
    data.label = editedLabel;
    console.log(final);
  };



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

          {isEditing ? (
            <Box>
              <input
                type='text'
                value={editedLabel}
                onChange={handleInputChange}
                placeholder={data.label}
                className='table-name-input'
                autoFocus={true}
              />
              <IconButton aria-label='edit' size='small' onClick={handleCheckClick}>
                <Check fontSize='inherit' />
              </IconButton>
            </Box>
          ) : (
            <Typography variant="body1" sx={{ flexGrow: 1, marginLeft: '20px' }}>
              {editedLabel}
            </Typography>
          )}
          
   
          <TableMenu tableData={data} handleEditTableName={handleEditTableName} anchorEl={anchorEl} handleClose={handleClose} handleClick={handleClick}/>
      
        </Box>
      </Box>
    );
  };
  
  export default GroupNode;
