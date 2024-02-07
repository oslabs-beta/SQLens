import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**  This is a menu button component used on the main table node that
 * gives users access to editing the table name, adding a column to
 * the table, or deleting the table */
import Popover from '@mui/material/Popover';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuItem from '@mui/material/MenuItem';
export default function TableMenu({ handleAddColumnOpen, handleAlertOpen, handleEditTableName, anchorEl, handleClick, handleClose }) {
    // boolean for whether or not the expanded menu is open
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return (_jsxs("div", { className: "table-menu-dots", children: [_jsx(IconButton, { "aria-label": "expandTableMenu", style: { color: 'white' }, onClick: handleClick, children: _jsx(MoreVertIcon, {}) }), _jsxs(Popover, { id: id, open: open, anchorEl: anchorEl, onClose: handleClose, anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left',
                }, sx: {
                    // Target the Paper component inside Popover
                    '.MuiPaper-root': {
                        backgroundColor: 'rgba(200, 200, 200, 0.9)',
                    }
                }, children: [_jsx(MenuItem, { onClick: handleEditTableName, style: { color: 'black' }, children: "Edit Table Name" }), _jsx(MenuItem, { onClick: handleAddColumnOpen, style: { color: 'black' }, children: "Add Column" }), _jsx(MenuItem, { onClick: handleAlertOpen, style: { color: 'black' }, children: "Delete Table" })] })] }));
}
