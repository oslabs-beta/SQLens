/** This component renders the name of the table and stores many of the functions for the table menu  */

import React from 'react';
import TableMenu from './TableMenu';
import { useState } from 'react';
import { Check } from '@mui/icons-material';
import { IconButton, Typography, Box, Button } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import AddColumnDialog from './AddColumnDialog';
import useStore from '../store';

const TableHeader = ({
  data,
}: {
  data: {
    label: string; // the passed in label is the table name
  };
}) => {
  const [alertOpen, setAlertOpen] = React.useState(false);    // state of the alert dialog for deleting a table
  const [isEditing, setIsEditing] = useState(false);          // state of whether the table name is being edited
  const [editedLabel, setEditedLabel] = useState(data.label); // stores the edited label while name is being edited
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );                                                          // sets anchor element for expanded table menu
  const fetchAndUpdateTableDetails = useStore(state => state.fetchAndUpdateTableDetails); // function on App-wide store to update table
  const tables = useStore(state => state.tables);             // all tables from database
  const setTables = useStore(state => state.setTables);       // function to set all tables from database

  // click handlers for delete table dialogue. Some of these will be passed into TableMenu
  const handleAlertOpen = () => {
    setAlertOpen(true);
  };

  const handleDeleteCancel = () => {
    setAlertOpen(false);
  };

  const handleTableDelete = async () => {
    // console.log('deleting table:', editedLabel);
    setAlertOpen(false);

    // send fetch request to backend to delete table
    const response = await fetch('/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // This mutation is used to change the table name in the database
      // This is a graphQL query, not a SQL query
      body: JSON.stringify({
        query: `
          mutation deleteTable($tableName: String!){
            deleteTable( tableName: $tableName)
          }
        `,
        variables: { tableName: data.label },
      }),
    });

    // get response from backend
    const final = await response.json();
    if (final.errors) {
      console.error(final.errors[0].message);
      // alert user if there was an error
      alert(final.errors[0].message);
      throw new Error('Error deleting table');
    } else {
      // update the store on the front end to delete table
      const updatedTables = tables.filter((table) => table.name !== editedLabel);
      setTables(updatedTables);
      fetchAndUpdateTableDetails(data.label);
      // console.log(final);
    }
  };

  // click handlers for expanding table menu
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  //click handlers for editing table
  const handleEditTableName = () => {
    handleMenuClose();
    setIsEditing(true);
    //use document.findElementByID to select input field and make focused or selected
    console.log('Edit Table Name for:', data.label);
  };

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);
    setEditedLabel(e.currentTarget.value);
  };

  const handleEditCancel = () => {
    setEditedLabel(data.label);
    setIsEditing(false);
  };

  // function to edit table name with fetch request to back end
  const handleEditSubmit = async () => {
    // Sanitizes data
    setEditedLabel(editedLabel.trim().replace(/[^A-Za-z0-9_]/g, '_'));
    // console.log(editedLabel, data.label);
    const response = await fetch('/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // This mutation is used to change the table name in the database
      // This is a graphQL query, not a SQL query
      body: JSON.stringify({
        query: `
          mutation editTableName($oldName: String!, $newName: String!){
            editTableName( oldName: $oldName, newName: $newName)
          }
        `,
        variables: { newName: editedLabel, oldName: data.label },

        //deleteColumnFromTable(tableName: ${data.parent}, columnName: ${data.label}): Table <-- if we want to get a string back instead of a table
      }),
    });

    const final = await response.json();
    if (final.errors) {
      setEditedLabel(data.label);
      console.error(final.errors[0].message);
      alert(final.errors[0].message);
      // throw new Error("Error changing table name");
      //add a user alert
    } else {
      // data.label = editedLabel;
      setIsEditing(false);
      await fetchAndUpdateTableDetails(editedLabel, data.label);
      console.log(final);
    }
  };

  // click handlers for Add Column Dialog
  const [openColDialog, setColDialogOpen] = React.useState(false);

  const handleAddColumnOpen = () => {
    handleMenuClose();
    setColDialogOpen(true);
  };

  const handleAddColumnClose = () => {
    setColDialogOpen(false);
  };

  return (
    <Box
      className="group-node"
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
            type="text"
            value={editedLabel}
            onChange={handleInputChange}
            placeholder={data.label}
            className="table-name-input"
            autoFocus={true}
          />
          <div>
            <IconButton
              aria-label="edit"
              size="small"
              onClick={handleEditSubmit}
            >
              <Check fontSize="inherit" />
            </IconButton>
            <IconButton
              aria-label="cancel"
              size="small"
              onClick={handleEditCancel}
            >
              <ClearIcon fontSize="inherit" />
            </IconButton>
          </div>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h6" noWrap sx={{ flexGrow: 1, maxWidth: 200 }}>
            {editedLabel}
          </Typography>

          <TableMenu

            handleEditTableName={handleEditTableName}
            anchorEl={anchorEl}
            handleClose={handleMenuClose}
            handleClick={handleMenuClick}
            handleAlertOpen={handleAlertOpen}
            handleAddColumnOpen={handleAddColumnOpen}
          />
        </Box>
      )}

      {/** dialog for alert */}
      <Dialog
        open={alertOpen}
        onClose={() => setAlertOpen(false)}
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this table?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>No</Button>
          <Button onClick={handleTableDelete} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <AddColumnDialog
        tableName={editedLabel}
        handleAddColumnOpen={handleAddColumnOpen}
        openColDialog={openColDialog}
        handleAddColumnClose={handleAddColumnClose}
      />
    </Box>
  );
};

export default TableHeader;

//
