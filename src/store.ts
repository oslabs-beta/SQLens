import { create } from 'zustand';
import { getTables, getTableDetails } from './utilities/utility.ts';
import { TableState }  from './vite-env';


const useStore = create<TableState>((set, get) => ({
  // Table state that will be used to store the tables
  tables: [],
  setTables: (tables) => set({ tables }),
  
  // may not need
  searchValue: '',
  setSearchValue: (searchValue: string) => set({ searchValue }),

  // Fetch all tables, columns, and foreign keys from the database. To be executed once at load time
  fetchTables: async () => {
    try {
      const res = await getTables();
      set({ tables: res });
    } catch (error) {
      console.error('Error fetching tables:', error);
    }
  },

  // Fetch updated table information from the database including table name, columns and foreign keys
  fetchAndUpdateTableDetails: async (tableName: string, oldName?: string) => {
    try {
      const updatedTableDetails = await getTableDetails(tableName);
      const tables = get().tables;

      let updatedTables;
      // If the table name has been updated, update the table name in the table state as well as column and foreign key data
      if (oldName) {
        updatedTables = tables.map(table =>
          table.name === oldName ? updatedTableDetails : table);

      } else {
      // If the table name has not been updated, update the columns and foreign keys in the table state
        updatedTables = tables.map(table =>
        table.name === tableName ? updatedTableDetails : table);
      }
      set({ tables: updatedTables });

      // console.log(`table in store: ${tableName}`);
      // console.log('tables state in store: ', tables)
      console.log('updatedTable: ', updatedTableDetails)
    } catch (error) {
      console.error('Error fetching updated table details:', error);
    }
  },
}));

export default useStore;
