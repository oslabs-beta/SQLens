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
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DataTypeSelector from './DataTypeSelector';
import useStore from '../store';
export default function AddColumnDialog({ tableName, handleAddColumnClose, openColDialog, }) {
    const [columnName, setColumnName] = useState('');
    const [selectedDataType, setSelectedDataType] = useState('');
    const tables = useStore((state) => state.tables);
    const setTables = useStore((state) => state.setTables);
    const queries = useStore((state) => state.queries);
    const setQueries = useStore((state) => state.setQueries);
    const handleColumnNameChange = (event) => {
        setColumnName(event.currentTarget.value);
    };
    const handleDataTypeChange = (event) => {
        // console.log(event.target.value);
        setSelectedDataType(event.target.value);
    };
    const handleSaveClick = () => __awaiter(this, void 0, void 0, function* () {
        const selectedTable = tables.filter((table) => table.name === tableName)[0];
        if (selectedTable.columns.includes(columnName) || columnName.match(/[^A-Za-z0-9_]/g) || columnName.length === 0) {
            alert(`Please select a valid name. \n\nNames may include underscores, but must not include spaces or other special characters. \n\nNames must be unique.`);
        }
        else {
            handleAddColumnClose();
            const updatedTables = tables.map((table) => {
                if (table.name === tableName) {
                    table.columns.push(columnName);
                }
                return table;
            });
            setTables(updatedTables);
            const query = `ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${selectedDataType};`;
            setQueries([...queries, query]);
        }
    });
    return (_jsx(React.Fragment, { children: _jsxs(Dialog, { open: openColDialog, onClose: handleAddColumnClose, children: [_jsxs(DialogContent, { children: [_jsx(DialogTitle, { children: "Add Column and Data Type" }), _jsx(TextField, { autoFocus: true, required: true, margin: 'dense', id: 'columnName', name: 'columnName', label: 'Column Name', type: 'text', variant: 'standard', onChange: handleColumnNameChange, fullWidth: true }), _jsx(DataTypeSelector, { handleDataTypeChange: handleDataTypeChange, selectedDataType: selectedDataType })] }), _jsxs(DialogActions, { children: [_jsx(Button, { onClick: handleAddColumnClose, children: "Cancel" }), _jsx(Button, { onClick: handleSaveClick, children: "Save" })] })] }) }));
}
