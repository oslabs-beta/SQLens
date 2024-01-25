// import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { IconButton, Typography, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteColumnButton from './DeleteColumnButton';
import { useState } from 'react';
import { Check } from '@mui/icons-material';

const ColumnNameNode = ({
  data,
}: {
  data: { label: string; parent: string, onDelete: ()=>void };
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedLabel, setEditedLabel] = useState(data.label);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
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
          mutation editColumn($newColumnName: String!, $columnName: String!, $tableName: String!){
            editColumn( newColumnName: $newColumnName, columnName: $columnName, tableName: $tableName)
          }
        `,
        variables: {
          newColumnName: editedLabel,
          columnName: data.label,
          tableName: data.parent,
        },
      }),
    });

    const final = await response.json();
    if (final.errors) {
      console.error(final.errors[0].message);
      alert(final.errors[0].message);
    }
    console.log(final);
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
          className='table-name-input'
        />
      ) : (
        <Typography className='column-label' variant="body2" noWrap>
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
