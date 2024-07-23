/**  This is a menu button component used on the main table node that
 * gives users access to editing the table name, adding a column to
 * the table, or deleting the table */

import Popover from "@mui/material/Popover";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuItem from "@mui/material/MenuItem";

interface TableMenuProps {
  handleAddColumnOpen: () => void;
  handleAlertOpen: () => void;
  handleEditTableName: () => void;
  anchorEl: HTMLButtonElement | null;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleClose: () => void;
}

export default function TableMenu({
  handleAddColumnOpen,
  handleAlertOpen,
  handleEditTableName,
  anchorEl,
  handleClick,
  handleClose,
}: TableMenuProps) {
  // boolean for whether or not the expanded menu is open
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className="table-menu-dots">
      <IconButton
        aria-label="expandTableMenu"
        style={{ color: "white" }}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={{
          // Target the Paper component inside Popover
          ".MuiPaper-root": {
            backgroundColor: "rgba(200, 200, 200, 0.9)",
          },
        }}
      >
        <MenuItem onClick={handleEditTableName} style={{ color: "black" }}>
          Edit Table Name
        </MenuItem>
        <MenuItem onClick={handleAddColumnOpen} style={{ color: "black" }}>
          Add Column
        </MenuItem>
        <MenuItem onClick={handleAlertOpen} style={{ color: "black" }}>
          Delete Table
        </MenuItem>
      </Popover>
    </div>
  );
}
