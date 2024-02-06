import { IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import useStore from '../store';
import { TableState } from '../vite-env';

const DeleteColumnButton = ({
  data,
}: {
  data: { label: string; parent: string };
}) => {
  const [alertOpen, setAlertOpen] = React.useState(false);
  // const fetchTables = useStore((state: TableState) => state.fetchTables);
  const fetchAndUpdateTableDetails = useStore((state: TableState) => state.fetchAndUpdateTableDetails);

  //delete column function
  const deleteCol = async function () {

      setAlertOpen(false);

  };

  //click handlers
  const handleAlertOpen = () => {
    setAlertOpen(true);
  };

  const handleYesDelete = async () => await deleteCol();

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
