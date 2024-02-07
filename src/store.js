var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { create } from 'zustand';
const useStore = create((set) => ({
    // Table state that will be used to store the tables
    tables: [],
    setTables: (tables) => set({ tables }),
    queries: [],
    setQueries: (queries) => set({ queries }),
    // may not need
    searchValue: '',
    setSearchValue: (searchValue) => set({ searchValue }),
    // Fetch all tables, columns, and foreign keys from the database. To be executed once at load time
    fetchTables: () => __awaiter(void 0, void 0, void 0, function* () {
        console.log('not fetching');
    }),
    // Fetch updated table information from the database including table name, columns and foreign keys
    fetchAndUpdateTableDetails: (tableName, oldName) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("not fetching from backend ", tableName, oldName);
    }),
}));
export default useStore;
