/// <reference types="vite/client" />

interface TableColumnsObject {
    columns: string[];
    foreignKeys: foreignKeysObj[];
}

interface foreignKeysObj {
    columnName: string;
    foreignTableName: string;
    foreignColumnName: string;
}

