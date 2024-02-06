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
  const queries = useStore((state: TableState) => state.queries);
  const setQueries = useStore((state: TableState) => state.setQueries);

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
    const selectedTable = tables.filter((table) => table.name === tableName)[0];
    if (selectedTable.columns.includes(columnName) || columnName.match(/[^A-Za-z0-9_]/g)) {
      alert(`Please select a valid name. \n\nNames may include underscores, but must not include spaces or other special characters. \n\nNames must be unique.`);
    } else {
      handleAddColumnClose();
      const updatedTables: Table[] = tables.map((table) => {
        if (table.name === tableName) {
          table.columns.push(columnName);
        }
        return table;
      });
      setTables(updatedTables);
      const query = `ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${selectedDataType};`
      setQueries([...queries, query]);
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
