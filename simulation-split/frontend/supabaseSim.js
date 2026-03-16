// This is a simulation of the Supabase Client
// On a real project, you would install @supabase/supabase-js

export const supabase = {
  from: (table) => ({
    insert: async (data) => {
      console.log(`[Supabase Simulation] Inserted into ${table}:`, data);
      return { data, error: null };
    },
    select: () => ({
      eq: () => ({
        single: async () => {
          console.log(`[Supabase Simulation] Selecting from ${table}`);
          return { data: {}, error: null };
        }
      })
    })
  }),
  auth: {
    getUser: async () => {
      return { data: { user: { id: 'simulated-user-id' } }, error: null };
    }
  }
};

export const SUPABASE_URL = 'https://xyz.supabase.co';
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
