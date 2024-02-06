import { Typography } from '@mui/material';
import useStore from '../store';
import { TableState } from '../vite-env';
// import style sheet?

export default function MigrationLog(): JSX.Element {
    const queries = useStore((state: TableState) => state.queries);
    const logs = queries.map((string) =>
        <Typography variant='h6' sx={{ml:3}}>{string}</Typography>)
    return (
        <>{logs}</>
    );
}
