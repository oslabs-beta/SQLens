import useStore from '../store';
import { TableState } from '../vite-env';
//

export default function MigrationLog(): JSX.Element {
    const queries = useStore((state: TableState) => state.queries);
    const logs = queries.map((string) =>
        <div>{string}</div>)
    return (
        <>{logs}</>
    );
}
