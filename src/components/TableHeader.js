var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
const TableHeader = ({ data, }) => {
    const [alertOpen, setAlertOpen] = React.useState(false); // state of the alert dialog for deleting a table
    const [isEditing, setIsEditing] = useState(false); // state of whether the table name is being edited
    const [editedLabel, setEditedLabel] = useState(data.label); // stores the edited label while name is being edited
    const [anchorEl, setAnchorEl] = React.useState(null); // sets anchor element for expanded table menu
    const tables = useStore((state) => state.tables); // all tables from database
    const setTables = useStore((state) => state.setTables); // function to set all tables from database
    const queries = useStore((state) => state.queries);
    const setQueries = useStore((state) => state.setQueries);
    // click handlers for delete table dialogue. Some of these will be passed into TableMenu
    const handleAlertOpen = () => {
        setAlertOpen(true);
    };
    const handleDeleteCancel = () => {
        setAlertOpen(false);
    };
    const handleTableDelete = () => {
        // console.log('deleting table:', editedLabel);
        setAlertOpen(false);
        const updatedTables = tables.filter((table) => table.name !== data.label);
        setTables(updatedTables);
        const query = `DROP TABLE ${data.label};`;
        setQueries([...queries, query]);
    };
    // click handlers for expanding table menu
    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    //click handlers for editing table
    const handleEditTableName = () => {
        handleMenuClose();
        setIsEditing(true);
    };
    const handleInputChange = (e) => {
        // console.log(e.currentTarget.value);
        setEditedLabel(e.currentTarget.value);
    };
    const handleEditCancel = () => {
        setEditedLabel(data.label);
        setIsEditing(false);
    };
    // function to edit table name with fetch request to back end
    const handleEditSubmit = () => __awaiter(void 0, void 0, void 0, function* () {
        const tableNames = tables.map((table) => table.name);
        if (tableNames.includes(editedLabel) ||
            editedLabel.match(/[^A-Za-z0-9_]/g)) {
            alert(`Please select a valid name. \n\nNames may include underscores, but must not include spaces or other special characters. \n\nNames must be unique.`);
        }
        else {
            const updatedTables = tables.map((table) => {
                if (table.name === data.label) {
                    table.name = editedLabel;
                }
                return table;
            });
            setTables(updatedTables);
            const query = `ALTER TABLE ${data.label} RENAME TO ${editedLabel};`;
            setQueries([...queries, query]);
            data.label = editedLabel;
            setIsEditing(false);
        }
    });
    // click handlers for Add Column Dialog
    const [openColDialog, setColDialogOpen] = React.useState(false);
    const handleAddColumnOpen = () => {
        handleMenuClose();
        setColDialogOpen(true);
    };
    const handleAddColumnClose = () => {
        setColDialogOpen(false);
    };
    return (_jsxs(Box, { className: 'group-node', sx: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            justifyContent: 'space-between',
            width: 1,
        }, children: [isEditing ? (_jsxs(Box, { sx: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }, children: [_jsx("input", { type: 'text', value: editedLabel, onChange: handleInputChange, placeholder: data.label, className: 'table-name-input', autoFocus: true }), _jsxs("div", { children: [_jsx(IconButton, { "aria-label": 'edit', size: 'small', onClick: handleEditSubmit, children: _jsx(Check, { fontSize: 'inherit' }) }), _jsx(IconButton, { "aria-label": 'cancel', size: 'small', onClick: handleEditCancel, children: _jsx(ClearIcon, { fontSize: 'inherit' }) })] })] })) : (_jsxs(Box, { sx: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }, children: [_jsx(Typography, { variant: 'h6', noWrap: true, sx: { flexGrow: 1, maxWidth: 200 }, children: editedLabel }), _jsx(TableMenu, { handleEditTableName: handleEditTableName, anchorEl: anchorEl, handleClose: handleMenuClose, handleClick: handleMenuClick, handleAlertOpen: handleAlertOpen, handleAddColumnOpen: handleAddColumnOpen })] })), _jsxs(Dialog, { open: alertOpen, onClose: () => setAlertOpen(false), "aria-describedby": 'alert-dialog-description', children: [_jsx(DialogContent, { children: _jsx(DialogContentText, { id: 'alert-dialog-description', children: "Are you sure you want to delete this table?" }) }), _jsxs(DialogActions, { children: [_jsx(Button, { onClick: handleDeleteCancel, children: "No" }), _jsx(Button, { onClick: handleTableDelete, autoFocus: true, children: "Yes" })] })] }), _jsx(AddColumnDialog, { tableName: editedLabel, handleAddColumnOpen: handleAddColumnOpen, openColDialog: openColDialog, handleAddColumnClose: handleAddColumnClose })] }));
};
export default TableHeader;
