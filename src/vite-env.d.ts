/// <reference types="vite/client" />

export default interface TableObj {
    name: string;
    columns: string[];
    foreignKeys: foreignKeysObj[];
}

export default interface foreignKeysObj {
    columnName: string;
    foreignTableName: string;
    foreignColumnName: string;
}
