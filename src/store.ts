import { create } from 'zustand';
// import type { StateCreator } from 'zustand';
import { getTables } from './utilities/utility.ts';
// import { devtools } from 'zustand/middleware';
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
