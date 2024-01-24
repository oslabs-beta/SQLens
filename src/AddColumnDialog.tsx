import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DataTypeSelector from './DataTypeSelector';

export default function AddColumnDialog({ data, handleAddColumnClose, handleAddColumnOpen, openColDialog }) {

  const handleSubmit = () => {
    event.preventDefault();
    //this is placeholder stuff from the dialog
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const columnName = formJson.columnName;
    console.log(columnName);
    handleAddColumnClose();
  }

  return (
    <React.Fragment>
      <Dialog
        open={openColDialog}
        onClose={handleAddColumnClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {handleSubmit
          },
        }}
      >
        {/* <DialogTitle>Add Column</DialogTitle> */}
        <DialogContent>
          <DialogTitle>
            Add Column and Data Type
          </DialogTitle>
          <TextField
            autoFocus
            required
            margin="dense"
            id="columnName"
            name="columnName"
            label="columnName"
            type="text"
            // fullWidth
            variant="standard"
          />
          <DataTypeSelector />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddColumnClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}