import React from 'react';
import { useState } from 'react';
import { Check } from '@mui/icons-material';
import { IconButton, Typography, Box,  } from '@mui/material';
import { ImPlus } from 'react-icons/im';
import ClearIcon from '@mui/icons-material/Clear';

const AddTable = ({
  data,
}: {
  data: {
    label: string;
    // parent: string,
    // onDelete: () => void;
    fetchAndUpdateTables: ()=>void;
  };
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedLabel, setEditedLabel] = useState('');

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
  };

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);
    setEditedLabel(e.currentTarget.value);
  };

  const handleCheckClick = async () => {
    setIsEditing(false);
    setEditedLabel(editedLabel.trim().replace(/[^A-Za-z0-9_]/g, '_'));
    const response = await fetch('/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // This query is used to change the name of a column
      // This is a graphQL query, not a SQL query
      body: JSON.stringify({
        query: `
          mutation addTable($tableName: String!){
            addTable( tableName: $tableName)
          }

        `,
        variables: {
          tableName: editedLabel,
        },
      }),
    });

    const final = await response.json();
    if (final.errors) {
      console.error(final.errors[0].message);
      alert(final.errors[0].message);
    } else {
      setEditedLabel(data.label)
      await data.fetchAndUpdateTables();
    console.log(final);
    }
  };

  return (
    <Box
      className='group-node'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        width: 1,
      }}
    >
      {isEditing ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <input
            type='text'
            value={editedLabel}
            onChange={handleInputChange}
            placeholder={data.label}
            className='table-name-input'
          />
          <Box>
          <IconButton aria-label='edit' size='small' onClick={handleCheckClick}>
            <Check fontSize='inherit' />
          </IconButton>
          <IconButton
            aria-label='cancel'
            size='small'
            onClick={handleEditCancel}
          >
            <ClearIcon fontSize='inherit' />
          </IconButton>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography className='column-label' variant='h6' noWrap>
            {data.label}
          </Typography>

          <IconButton aria-label='edit' size='small' onClick={handleEditClick}>
            <ImPlus fontSize='inherit' />
          </IconButton>

        </Box>
      )}
    </Box>
  );
};

export default AddTable;

//
