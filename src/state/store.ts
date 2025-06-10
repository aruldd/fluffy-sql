import { produce } from 'immer';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import sampleData from './sampleData.json'; // Assuming you have a sample data file

interface FluffySql {
  id: string;
  sql: string;
  title: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  lastRunAt?: Date;
  result: {
    data?: any[];
    error?: string;
    status?: 'success' | 'error';
  };
}
interface FluffySqlState {
  fluffySqls: {
    [key: string]: FluffySql;
  };
  openedFluffySqlIds: string[];
  activeFluffySqlId?: string;
  activeFluffySql?: FluffySql;
  // Actions
  openFluffySql: (id: string) => void;
  closeFluffySql: (id: string) => void;
  activateFluffySql: (id: string) => void;
  createFluffySql: (title: string, description?: string) => void;
  updateFluffySql: (id: string, title?: string, description?: string, sql?: string) => void;
  deleteFluffySql: (id: string) => void;
  runFluffySql: (id: string, sql: string) => void;
}

const useFluffySqlStore = create<FluffySqlState>()(
  devtools(
    persist(
      immer((set) => ({
        fluffySqls: {},
        openedFluffySqlIds: [],
        activeFluffySqlId: undefined,
        createFluffySql: (title, description) =>
          set(
            produce((state) => {
              const newId = crypto.randomUUID();
              const newFluffySql = {
                id: newId,
                title,
                description: description || '',
                sql: `-- Fluffy SQL ID : ${newId}\n\n-- Description: ${description || 'No description provided'}\n\n-- Example SQL Query:\n\n-- Write your SQL query here\nSELECT * FROM your_table;  
                `,
                createdAt: new Date(),
                updatedAt: new Date(),
              };

              state.fluffySqls[newFluffySql.id] = newFluffySql;
              state.openedFluffySqlIds.push(newFluffySql.id);
              state.activeFluffySqlId = newFluffySql.id;
              state.activeFluffySql = newFluffySql;

              return state;
            })
          ),
        updateFluffySql: (id, title, description, sql) =>
          set(
            produce((state) => {
              if (state.fluffySqls[id]) {
                if (title !== undefined) {
                  state.fluffySqls[id].title = title;
                }
                if (sql !== undefined) {
                  state.fluffySqls[id].sql = sql;
                }

                if (description !== undefined) {
                  state.fluffySqls[id].description = description;
                }
                state.fluffySqls[id].updatedAt = new Date();
              }
              return state; // If the ID does not exist, do nothing
            })
          ),
        deleteFluffySql: (id) =>
          set(
            produce((state) => {
              delete state.fluffySqls[id];
              if (state.openedFluffySqlIds) {
                state.openedFluffySqlIds = state.openedFluffySqlIds.filter(
                  (openedId: string) => openedId !== id
                );
                if (state.activeFluffySqlId === id) {
                  state.activeFluffySqlId = state.openedFluffySqlIds[0] || undefined; // Set to first opened or undefined
                }
              }
              return state;
            })
          ),
        openFluffySql: (id) =>
          set(
            produce((state) => {
              if (!state.openedFluffySqlIds) {
                state.openedFluffySqlIds = [];
              }
              if (!state.openedFluffySqlIds.includes(id)) {
                state.openedFluffySqlIds.push(id);
              }
              state.activeFluffySqlId = id;
              return state;
            })
          ),
        closeFluffySql: (id) =>
          set(
            produce((state) => {
              if (state.openedFluffySqlIds) {
                state.openedFluffySqlIds = state.openedFluffySqlIds.filter(
                  (openedId: string) => openedId !== id
                );
                if (state.activeFluffySqlId === id) {
                  state.activeFluffySqlId = state.openedFluffySqlIds[0] || undefined; // Set to first opened or undefined
                }
              }
              return state;
            })
          ),
        activateFluffySql: (id) =>
          set(
            produce((state) => {
              if (state.openedFluffySqlIds.includes(id)) {
                state.activeFluffySqlId = id;
              } else {
                state.openedFluffySqlIds.push(id);
                state.activeFluffySqlId = id;
              }
              return state;
            })
          ),
        runFluffySql: (id, sql) =>
          set(
            produce((state) => {
              const responses = [
                {
                  data: sampleData,
                  error: undefined,
                  status: 'success',
                },
                {
                  data: [],
                  error: 'An error occurred while executing the SQL query.',
                  status: 'error',
                },
              ];
              if (state.fluffySqls[id]) {
                state.fluffySqls[id].sql = sql;
                state.lastUpdatedAt = new Date();
                state.fluffySqls[id].result =
                  responses[Math.floor(Math.random() * responses.length)];
                state.fluffySqls[id].lastRunAt = new Date();
              }
              return state;
            })
          ),
      })),
      {
        name: 'fluffy-sql-storage', // unique name
        storage: createJSONStorage(() => localStorage), // use localStorage for persistence
      }
    )
  )
);

export default useFluffySqlStore;
