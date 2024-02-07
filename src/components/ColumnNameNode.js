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
import { Handle, Position } from 'reactflow';
import { IconButton, Typography, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteColumnButton from './DeleteColumnButton';
import { useState } from 'react';
import { Check } from '@mui/icons-material';
import ClearIcon from '@mui/icons-material/Clear';
import useStore from '../store';
const ColumnNameNode = ({ data, }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedLabel, setEditedLabel] = useState(data.label);
    const tables = useStore((state) => state.tables);
    const setTables = useStore((state) => state.setTables);
    const queries = useStore((state) => state.queries);
    const setQueries = useStore((state) => state.setQueries);
    const handleEditClick = () => {
        setIsEditing(true);
    };
    const handleEditCancel = () => {
        setEditedLabel(data.label);
        setIsEditing(false);
    };
    const handleInputChange = (e) => {
        // console.log(e.target.value);
        setEditedLabel(e.currentTarget.value);
    };
    const handleCheckClick = () => __awaiter(void 0, void 0, void 0, function* () {
        const selectedTable = tables.filter((table) => table.name === data.parent)[0];
        if (selectedTable.columns.includes(editedLabel) || editedLabel.match(/[^A-Za-z0-9_]/g) || editedLavel.length === 0) {
            alert(`Please select a valid name. \n\nNames may include underscores, but must not include spaces or other special characters. \n\nNames must be unique.`);
        }
        else {
            setIsEditing(false);
            const updatedTables = tables.map((table) => {
                if (table.name === data.parent) {
                    table.columns.map((column) => column === data.label ? editedLabel : column);
                }
                return table;
            });
            setTables(updatedTables);
            setTables(updatedTables);
            const query = `ALTER TABLE ${data.parent}
            RENAME COLUMN ${data.label} to ${editedLabel};`;
            setQueries([...queries, query]);
            data.label = editedLabel;
        }
    });
    return (_jsxs("div", { className: "column-name-node", children: [_jsx(Handle, { type: "target", position: Position.Left }), _jsx(Handle, { type: "source", position: Position.Right }), isEditing ? (_jsx("input", { type: "text", value: editedLabel, onChange: handleInputChange, placeholder: data.label, className: "table-name-input" })) : (_jsx(Typography, { className: "column-label", variant: "body2", noWrap: true, children: editedLabel })), isEditing ? (_jsxs(Box, { sx: { minWidth: 56 }, children: [_jsx(IconButton, { "aria-label": 'edit', size: 'small', onClick: handleCheckClick, children: _jsx(Check, { fontSize: 'inherit' }) }), _jsx(IconButton, { "aria-label": 'cancel', size: 'small', onClick: handleEditCancel, children: _jsx(ClearIcon, { fontSize: 'inherit' }) })] })) : (_jsxs(Box, { sx: { minWidth: 56 }, children: [_jsx(IconButton, { "aria-label": 'edit', size: 'small', onClick: handleEditClick, children: _jsx(EditIcon, { fontSize: 'inherit' }) }), _jsx(DeleteColumnButton, { data: data })] }))] }));
};
ColumnNameNode.displayName = 'ColumnNameNode';
export default ColumnNameNode;
