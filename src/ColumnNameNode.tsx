// import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { IconButton, CheckIcon, Typography, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteColumnButton from './DeleteColumnButton';
import { useState } from 'react';
import { Check } from '@mui/icons-material';

const ColumnNameNode = ({
  data,
}: {
  data: { label: string; parent: string };
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedLabel, setEditedLabel] = useState(data.label);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    console.log(e.target.value);
    setEditedLabel(e.target.value);
  };

  const handleCheckClick = async () => {

    setIsEditing(false);
    const response = await fetch('/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // This query is used to get the table names and columns from the database
      // This is a graphQL query, not a SQL query
      body: JSON.stringify({
        query: `
          mutation editColumn($newColumnName: String!, $columnName: String!, $tableName: String!){
            editColumn( newColumnName: $newColumnName, columnName: $columnName, tableName: $tableName)
          }
        `,
        variables: { newColumnName: editedLabel, columnName: data.label, tableName: data.parent},
        //deleteColumnFromTable(tableName: ${data.parent}, columnName: ${data.label}): Table <-- if we want to get a string back instead of a table
      }),
    });

    const final = await response.json();
    if (final.errors) {
      console.error(final.errors);
      throw new Error('Error fetching tables');
    }
    console.log(final);

    // console.log(editedLabel);

    // Here, you can perform any actions you want with the edited label.
    // For example, you can make an API call to update the label in your database.
  };

  return (
    <div className='column-name-node'>
      {/* These handles are currently transparent, set in the css */}
      <Handle type='target' position={Position.Left} />
      <Handle type='source' position={Position.Right} />

      {/* If editing: render text box with the label name as placeholder; Otherwise render the label name */}
      {isEditing ? (
        <input
          type='text'
          value={editedLabel}
          onChange={handleInputChange}
          placeholder={data.label}
          className='column-input'
        />
      ) : (
        <Typography className='column-label' noWrap>
          {editedLabel}
        </Typography>
      )}
      <Box sx={{ minWidth: 56 }}>

        {/* If editing: render check button to save; Otherwise render the edit button*/}
        {isEditing ? (
          <IconButton aria-label='edit' size='small' onClick={handleCheckClick}>
            <Check fontSize='inherit' />
          </IconButton>
        ) : (
          <IconButton aria-label='edit' size='small' onClick={handleEditClick}>
            <EditIcon fontSize='inherit' />
          </IconButton>
        )}
        <DeleteColumnButton data={data} />
      </Box>
    </div>
  );
};

ColumnNameNode.displayName = 'ColumnNameNode';

export default ColumnNameNode;
