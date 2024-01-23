// import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { IconButton, Typography, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteColumnButton from './DeleteColumnButton';
// import React from 'react';

const ColumnNameNode = ({ data }: {data: { label: string, parent: string }}) => {

  const handleEditClick = () => {
    console.log('editing column', data.label, ' in table ', data.parent);
  }

  return (
    <div className="column-name-node">
      <Handle type='target' position={Position.Left} />
      <Handle type='source' position={Position.Right} />
      <Typography className='column-label' noWrap>{data.label}</Typography>
      <Box sx={{ minWidth: 56}}>
      <IconButton aria-label='edit' size='small' onClick={handleEditClick}>
        <EditIcon fontSize='inherit' />
      </IconButton>
      <DeleteColumnButton data={data} />
      </Box>
    </div>
  );
};

ColumnNameNode.displayName = 'ColumnNameNode';

export default ColumnNameNode;
