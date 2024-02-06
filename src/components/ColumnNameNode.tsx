import { Handle, Position } from 'reactflow';
import { IconButton, Typography, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteColumnButton from './DeleteColumnButton';
import { useState } from 'react';
import { Check } from '@mui/icons-material';
import ClearIcon from '@mui/icons-material/Clear';
import useStore from '../store';
import { TableState, Table } from '../vite-env';

const ColumnNameNode = ({
  data,
}: {
  data: { label: string; parent: string };
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedLabel, setEditedLabel] = useState(data.label);
  const tables = useStore((state: TableState) => state.tables);
  const setTables = useStore((state: TableState) => state.setTables);
  // const fetchAndUpdateTableDetails = useStore((state: TableState) => state.fetchAndUpdateTableDetails);

  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleEditCancel = () => {
    setEditedLabel(data.label);
    setIsEditing(false);
  };

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    setEditedLabel(e.currentTarget.value);
  };

  const handleCheckClick = async () => {
    setIsEditing(false);
    setEditedLabel(editedLabel.trim().replace(/[^A-Za-z0-9_]/g, '_'));


    const updatedTables: Table[] = tables.map((table) => {
      if (table.name === data.parent) {
        table.columns.map((column) =>
        column === data.label ? editedLabel : column)
      }
      return table;
    });
    setTables(updatedTables);


  };

  return (
    <div className="column-name-node">
      {/* These handles are currently transparent, set in the css */}
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />

      {/* If editing: render text box with the label name as placeholder; Otherwise render the label name */}
      {isEditing ? (
        <input
          type="text"
          value={editedLabel}
          onChange={handleInputChange}
          placeholder={data.label}
          className="table-name-input"
        />
      ) : (
        <Typography className="column-label" variant="body2" noWrap>
          {editedLabel}
        </Typography>
      )}

        {/* If editing: render check button to save; Otherwise render the edit button*/}
        {isEditing ? (
        <Box sx={{ minWidth: 56 }}>
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
      ) : (
        <Box sx={{ minWidth: 56 }}>
          <IconButton aria-label='edit' size='small' onClick={handleEditClick}>
            <EditIcon fontSize='inherit' />
          </IconButton>
          <DeleteColumnButton data={data} />
        </Box>
      )}
    </div>
  );
};

ColumnNameNode.displayName = 'ColumnNameNode';

export default ColumnNameNode;
