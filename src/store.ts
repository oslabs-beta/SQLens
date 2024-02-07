import { create } from 'zustand';
// import { getTables, getTableDetails } from './utilities/utility.ts';
import { TableState }  from './vite-env';


const useStore = create<TableState>((set) => ({
  // Table state that will be used to store the tables
  tables: [],
  setTables: (tables) => set({ tables }),

  queries: [],
  setQueries: (queries) => set({ queries }),

  // may not need
  searchValue: '',
  setSearchValue: (searchValue: string) => set({ searchValue }),

  // Fetch all tables, columns, and foreign keys from the database. To be executed once at load time
  fetchTables: async () => {
    console.log('not fetching')
  },

  // Fetch updated table information from the database including table name, columns and foreign keys
  fetchAndUpdateTableDetails: async (tableName: string, oldName?: string) => {
    console.log("not fetching from backend ", tableName, oldName);
  },
}));

export default useStore;
