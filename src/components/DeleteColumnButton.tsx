import { IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

const DeleteColumnButton = ({
  data,
}: {
  data: { label: string; parent: string; fetchAndUpdateTables: () => void };
}) => {
  const [alertOpen, setAlertOpen] = React.useState(false);
  //   const [focusNode, setFocusNode] = React.useState(null)

  //delete column function
  const deleteCol = async function () {
    const response = await fetch('/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // This query is used to delete a column from a table
      // This is a graphQL query, not a SQL query
      body: JSON.stringify({
        query: `
          mutation deleteColumn($tableName: String!, $columnName: String!){
            deleteColumn(tableName: $tableName, columnName: $columnName)
          }
        `,
        variables: { columnName: data.label, tableName: data.parent },
      }),
    });

    const final = await response.json();
    if (final.errors) {
      console.error(final.errors[0].message);
      alert(final.errors[0].message);
    } else {
      console.log(final);
      // await data.fetchAndUpdateTables();
      setAlertOpen(false);
    }
  };

  //click handlers
  const handleAlertOpen = () => {
    setAlertOpen(true);
  };
  const handleYesDelete = async () => {
    console.log('deleting column', data.label, ' from table ', data.parent);
    try {
      await deleteCol();
      //call refresh function
      // data.onDelete(); // not functional
    } catch (error) {
      console.error('Error during deletion:', error);
    }
    setAlertOpen(false);
  };
  const handleNoDelete = () => {
    setAlertOpen(false);
  };

  return (
    <>
      <IconButton aria-label='delete' size='small' onClick={handleAlertOpen}>
        <DeleteIcon fontSize='inherit' />
      </IconButton>

      {/** dialog for alert */}
      <Dialog
        open={alertOpen}
        onClose={() => setAlertOpen(false)}
        aria-describedby='alert-dialog-description'
      >
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure you want to delete this column?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNoDelete}>No</Button>
          <Button onClick={handleYesDelete} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

DeleteColumnButton.displayName = 'DeleteColumnButton';

export default DeleteColumnButton;
// export default memo(CustomNode);
