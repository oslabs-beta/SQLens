import * as React from 'react';
import Popover from '@mui/material/Popover';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuItem from '@mui/material/MenuItem';

// export   const handleClose = () => {
//   setAnchorEl(null);
// };

function TableMenu({ tableData, handleEditTableName, anchorEl, handleClick }) {

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  export const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddColumn = () => {
    console.log("Add Column to:", tableData.label);
    handleClose();
  };

  const handleDeleteTable = () => {
    console.log("Delete Table:", tableData.label);
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <IconButton aria-label="more" style={{color: 'black'}} onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        sx={{ 
          // Target the Paper component inside Popover
          '.MuiPaper-root': { 
            backgroundColor: 'rgba(200, 200, 200, 0.9)', 
          }
        }}
      >
        <MenuItem onClick={handleEditTableName} style={{color: 'black'}}>Edit Table Name</MenuItem>
        <MenuItem onClick={handleAddColumn} style={{color: 'black'}}>Add Column</MenuItem>
        <MenuItem onClick={handleDeleteTable} style={{color: 'black'}}>Delete Table</MenuItem>
      </Popover>
    </div>
  );
}

export TableMenu