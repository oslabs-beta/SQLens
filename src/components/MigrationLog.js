import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Typography } from '@mui/material';
import useStore from '../store';
// import style sheet?
export default function MigrationLog() {
    const queries = useStore((state) => state.queries);
    const logs = queries.map((string) => _jsx(Typography, { variant: 'h6', sx: { ml: 3 }, children: string }));
    return (_jsx(_Fragment, { children: logs }));
}
