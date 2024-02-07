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
import { useState } from 'react';
import { Check } from '@mui/icons-material';
import { IconButton, Typography, Box } from '@mui/material';
import { ImPlus } from 'react-icons/im';
import ClearIcon from '@mui/icons-material/Clear';
import useStore from '../store';
const AddTable = ({ data, }) => {
    // manages the editing staus and edited label
    const [isEditing, setIsEditing] = useState(false);
    const [editedLabel, setEditedLabel] = useState('');
    const queries = useStore((state) => state.queries);
    const setQueries = useStore((state) => state.setQueries);
    // useStore to interact with the application's global state, fetching functions and state slices.
    // const fetchAndUpdateTableDetails = useStore((state: TableState) => state.fetchAndUpdateTableDetails);
    const tables = useStore((state) => state.tables);
    const setTables = useStore((state) => state.setTables);
    //function to initiate the editing mode
    const handleEditClick = () => {
        setIsEditing(true);
    };
    // function to cancel editing, reverting changes
    const handleEditCancel = () => {
        setIsEditing(false);
    };
    // function to update state with the new label
    const handleInputChange = (e) => {
        // console.log(e.currentTarget.value);
        setEditedLabel(e.currentTarget.value);
    };
    // finalize the addition of the table, sending a request to the backend and updating the global state.
    const handleCheckClick = () => __awaiter(void 0, void 0, void 0, function* () {
        const tableNames = tables.map(table => table.name);
        if (tableNames.includes(editedLabel) || editedLabel.match(/[^A-Za-z0-9_]/g) || editedLabel.length === 0) {
            alert(`Please select a valid name. \n\nNames may include underscores, but must not include spaces or other special characters. \n\nNames must be unique.`);
        }
        else {
            setIsEditing(false);
            setEditedLabel(editedLabel.trim().replace(/[^A-Za-z0-9_]/g, '_'));
            const newTable = { name: editedLabel, columns: [], foreignKeys: [] };
            setTables([...tables, newTable]);
            const query = `CREATE TABLE ${editedLabel} ( );`;
            setQueries([...queries, query]);
            setEditedLabel(data.label);
        }
    });
    // Render component, edit or view mode based on isEditing state
    return (_jsx(Box, { className: 'group-node', sx: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            justifyContent: 'space-between',
            width: 1,
        }, children: isEditing ? (_jsxs(Box, { sx: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }, children: [_jsx("input", { type: 'text', value: editedLabel, onChange: handleInputChange, placeholder: data.label, className: 'table-name-input' }), _jsxs(Box, { children: [_jsx(IconButton, { "aria-label": 'save', size: 'small', onClick: handleCheckClick, children: _jsx(Check, { fontSize: 'inherit' }) }), _jsx(IconButton, { "aria-label": 'cancel', size: 'small', onClick: handleEditCancel, children: _jsx(ClearIcon, { fontSize: 'inherit' }) })] })] })) : (_jsxs(Box, { sx: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }, children: [_jsx(Typography, { className: 'column-label', variant: 'h6', noWrap: true, children: data.label }), _jsx(IconButton, { "aria-label": 'edit', size: 'small', onClick: handleEditClick, children: _jsx(ImPlus, { fontSize: 'inherit' }) })] })) }));
};
export default AddTable;
