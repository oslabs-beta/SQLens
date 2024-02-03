import { create } from 'zustand';
import { getTables, getTableDetails } from './utilities/utility.ts';
import { TableState }  from './vite-env';


const useStore = create<TableState>((set, get) => ({
  tables: [],
  searchValue: '',
  setSearchValue: (searchValue: string) => set({ searchValue }),

  setTables: (tables) => set({ tables }),

  fetchTables: async () => {
    try {
      const res = await getTables();
      // console.log('res', res )
      set({ tables: res });
    } catch (error) {
      console.error('Error fetching tables:', error);
    }
  },

  fetchAndUpdateTableDetails: async (tableName: string, oldName?: string) => {
    try {
      const updatedTableDetails = await getTableDetails(tableName);
      const tables = get().tables;

      let updatedTables;
      if (oldName) {
        updatedTables = tables.map(table =>
          table.name === oldName ? updatedTableDetails : table);

      } else {
      // Update the specific table in your Zustand store
        updatedTables = tables.map(table =>
        table.name === tableName ? updatedTableDetails : table);
      }
      set({ tables: updatedTables });

      console.log(`table in store: ${tableName}`);
      console.log('tables state in store: ', tables)
      console.log('updatedTables: ', updatedTables)
    } catch (error) {
      console.error('Error fetching updated table details:', error);
    }
  },

  handleURISubmit: async () => {
    const { databaseURI } = get();
    try {
      const response = await fetch('/api/setDatabaseUri', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ databaseURI }),
      });
      const data = await response.json();
      if (
        response.ok &&
        data.message === 'Database connection updated successfully'
      ) {
        await get().fetchTables();
      } else {
        console.error(data.error || 'Failed to update database URI');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  },
}));

export default useStore;
