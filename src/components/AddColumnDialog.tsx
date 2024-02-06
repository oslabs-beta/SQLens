import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DataTypeSelector from './DataTypeSelector';
import { AddColumnDialogProps } from '../vite-env';
import { SelectChangeEvent } from '@mui/material';
import useStore from '../store';
import { TableState, Table } from '../vite-env';

export default function AddColumnDialog({
  tableName,
  handleAddColumnClose,
  openColDialog,
}: AddColumnDialogProps) {
  const [columnName, setColumnName] = useState('');
  const [selectedDataType, setSelectedDataType] = useState('');
  const tables = useStore((state: TableState) => state.tables);
  const setTables = useStore((state: TableState) => state.setTables);
  const selectedTable = tables.filter((table) => {
    table.name === tableName;
  })[0];
  // const fetchTables = useStore((state: TableState) => state.fetchTables);

  // const fetchAndUpdateTableDetails = useStore((state: TableState) => state.fetchAndUpdateTableDetails);

  const handleColumnNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setColumnName(event.currentTarget.value);
  };

  const handleDataTypeChange = (event: SelectChangeEvent<string>) => {
    // console.log(event.target.value);
    setSelectedDataType(event.target.value);
  };

  const handleSaveClick = async () => {
    handleAddColumnClose();
    setColumnName(columnName.trim().replace(/[^A-Za-z0-9_]/g, '_'));
    if (selectedTable.columns.includes(columnName)) {
      alert('Please select a valid name');
      return;
    } else {
      const updatedTables: Table[] = tables.map((table) => {
        if (table.name === tableName) {
          table.columns.push(columnName);
        }
        return table;
      });
      setTables(updatedTables);
    }
  };

  return (
    <React.Fragment>
      <Dialog open={openColDialog} onClose={handleAddColumnClose}>
        {/* <DialogTitle>Add Column</DialogTitle> */}
        <DialogContent>
          <DialogTitle>Add Column and Data Type</DialogTitle>
          <TextField
            autoFocus
            required
            margin='dense'
            id='columnName'
            name='columnName'
            label='Column Name'
            type='text'
            variant='standard'
            onChange={handleColumnNameChange}
            fullWidth
          />
          <DataTypeSelector
            handleDataTypeChange={handleDataTypeChange}
            selectedDataType={selectedDataType}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddColumnClose}>Cancel</Button>
          <Button onClick={handleSaveClick}>Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
