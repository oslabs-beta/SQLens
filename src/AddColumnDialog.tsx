import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DataTypeSelector from './DataTypeSelector';

export default function AddColumnDialog({
  tableName,
  handleAddColumnClose,
  handleAddColumnOpen,
  openColDialog,
}) {
  const [columnName, setColumnName] = useState('');
  const [selectedDataType, setSelectedDataType] = useState('');

  const handleColumnNameChange = (event: React.FormEvent<HTMLInputElement>) => {
    setColumnName(event.currentTarget.value);
  };

  const handleDataTypeChange = (event: React.FormEvent<HTMLInputElement>) => {
    setSelectedDataType(event.currentTarget.value);
  };

  const handleSaveClick = async () => {
    handleAddColumnClose();
    setColumnName(columnName.trim().replace(/[^A-Za-z0-9_]/g, '_'));
    const response = await fetch('/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // This mutation is used to change the table name in the database
      // This is a graphQL query, not a SQL query
      body: JSON.stringify({
        query: `
          mutation addColumnToTable($tableName: String!, $columnName: String!, $dataType: String!){
            addColumnToTable( tableName: $tableName, columnName: $columnName, dataType: $dataType)
          }
        `,
        //addColumnToTable(tableName: String!, columnName: String!, dataType: String!): String
        variables: {
          tableName: tableName,
          columnName: columnName,
          dataType: selectedDataType,
        },
      }),
    });

    const final = await response.json();
    if (final.errors) {
      console.error(final.errors[0].message);
      alert(final.errors[0].message);
      // throw new Error("Error changing table name");
      //add a user alert
    } else {
      console.log(final);
    }
  };

  return (
    <React.Fragment>
      <Dialog
        open={openColDialog}
        onClose={handleAddColumnClose}
        PaperProps={{
          component: 'form',
          // onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          //   handleSubmit;
          // },
        }}
      >
        {/* <DialogTitle>Add Column</DialogTitle> */}
        <DialogContent>
          <DialogTitle>Add Column and Data Type</DialogTitle>
          <TextField
            autoFocus
            required
            margin='dense'
            id='columnName'
            name='columnName'
            label='columnName'
            type='text'
            // fullWidth
            variant='standard'
            onChange={handleColumnNameChange}
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
