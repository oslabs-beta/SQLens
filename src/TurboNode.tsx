import React, { memo, ReactNode, useState } from 'react';
import { Handle, NodeProps, Position, Node } from 'reactflow';
import { FiCloud } from 'react-icons/fi';
import { AiOutlineDrag } from "react-icons/ai";
import { MdDragHandle } from "react-icons/md";
import TableMenu from "./TableMenu";
import { Check } from "@mui/icons-material";
import { IconButton, Typography, Box, Button } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import AddColumnDialog from "./AddColumnDialog";

export type TurboNodeData = {
  title: string;
  // icon?: ReactNode;
  // subline?: string;
  label: string;
  onDelete: ()=> void ;
};

export default function TurboNode ({ data }: NodeProps<TurboNodeData>) {
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedLabel, setEditedLabel] = useState(data.label);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement|null>(null);

//click handlers for delete table dialogue
const handleAlertOpen = () => {
  setAlertOpen(true);
};

const handleDeleteCancel = () => {
  setAlertOpen(false);
};

const handleTableDelete = async () => {
  console.log('deleting table:', editedLabel);
  //delete table function
  //need extra functionality to re render the node
  setAlertOpen(false);

  const response = await fetch("/api/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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

  const final = await response.json();
  if (final.errors) {
    console.error(final.errors[0].message);
    alert(final.errors[0].message);
    throw new Error("Error deleting table");
    //add a user alert
  } else {
    console.log(final);
  }
};

//click handlers for pop up menu
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
  console.log("Edit Table Name for:", data.label);
};

const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
  console.log(e.currentTarget.value);
  setEditedLabel(e.currentTarget.value);
};

const handleEditCancel = () => {
  setIsEditing(false);
}

const handleEditSubmit = async () => {
  setEditedLabel(editedLabel.trim().replace(/[^A-Za-z0-9_]/g, '_'));
  const response = await fetch("/api/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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
    data.label = editedLabel;
    setIsEditing(false);
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
    <>
      <div className="cloud gradient">
        <div>
          <MdDragHandle />
        </div>
      </div>
      <div className="wrapper gradient">
        {/* <div className="inner"> */}
          {/* <div className="body"> */}
            {/* {data.icon && <div className="icon">{data.icon}</div>} */}
            {/* <div> */}
              {/* <div className="title">{data.label}</div> */}
              {/* {data.subline && <div className="subline">{data.subline}</div>} */}
            {/* </div> */}
          {/* </div> */}
          {/* <Handle type="target" position={Position.Left} /> */}
          {/* <Handle type="source" position={Position.Right} /> */}

          {isEditing ? (
            <div className="inner">
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <input
              type="text"
              value={editedLabel}
              onChange={handleInputChange}
              placeholder={data.label}
              className="table-name-input"
              autoFocus={true}
            />
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
          </Box>
          </div>
        ) : (
          <div className="inner">
          {/* <Box sx={{ display: "flex", justifyContent: 'space-between' }}> */}
          <div className="title">{editedLabel}</div>
          <TableMenu
          tableData={data}
          handleEditTableName={handleEditTableName}
          anchorEl={anchorEl}
          handleClose={handleMenuClose}
          handleClick={handleMenuClick}
          handleAlertOpen={handleAlertOpen}
          handleAddColumnOpen={handleAddColumnOpen}
        />
          {/* </Box> */}
          </div>
        )}
          
        {/* </div> */}
      </div>
    </>
  );
}

TurboNode.displayName = 'TurboNode';