var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import useStore from '../store';
const DeleteColumnButton = ({ data, }) => {
    const [alertOpen, setAlertOpen] = React.useState(false);
    const tables = useStore((state) => state.tables);
    const setTables = useStore((state) => state.setTables);
    const queries = useStore((state) => state.queries);
    const setQueries = useStore((state) => state.setQueries);
    //delete column function
    const deleteCol = function () {
        return __awaiter(this, void 0, void 0, function* () {
            if (data.label === '_id') {
                setAlertOpen(false);
                alert(`Cannot delete primary key`);
            }
            else {
                const selectedTable = tables.filter((table) => table.name === data.parent)[0];
                const updatedTables = tables.map((table) => {
                    selectedTable.columns.forEach((column, index) => {
                        if (data.label === column) {
                            table.columns.splice(index, 1);
                        }
                    });
                    return table;
                });
                setTables(updatedTables);
                const query = `ALTER TABLE ${data.parent} DROP COLUMN ${data.label};`;
                setQueries([...queries, query]);
                setAlertOpen(false);
            }
        });
    };
    //click handlers
    const handleAlertOpen = () => {
        setAlertOpen(true);
    };
    const handleYesDelete = () => __awaiter(void 0, void 0, void 0, function* () { return yield deleteCol(); });
    const handleNoDelete = () => {
        setAlertOpen(false);
    };
    return (_jsxs(_Fragment, { children: [_jsx(IconButton, { "aria-label": 'delete', size: 'small', onClick: handleAlertOpen, children: _jsx(DeleteIcon, { fontSize: 'inherit' }) }), _jsxs(Dialog, { open: alertOpen, onClose: () => setAlertOpen(false), "aria-describedby": 'alert-dialog-description', children: [_jsx(DialogContent, { children: _jsx(DialogContentText, { id: 'alert-dialog-description', children: "Are you sure you want to delete this column?" }) }), _jsxs(DialogActions, { children: [_jsx(Button, { onClick: handleNoDelete, children: "No" }), _jsx(Button, { onClick: handleYesDelete, autoFocus: true, children: "Yes" })] })] })] }));
};
DeleteColumnButton.displayName = 'DeleteColumnButton';
export default DeleteColumnButton;
