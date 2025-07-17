
//@ts-nocheck

import { create } from 'zustand';
import { persist } from 'zustand/middleware'

export const useAuthValidator = create()(persist((set) => ({
    isAuthenticate: false,
    user: {},
    handleAuthenticate: (value) => set(() => {
        return { isAuthenticate: value };
    }),
    handleUserDetails: (value) => set(() => {
        return { user: value };
    }),
}),
    {
        name: "auth-storage",
        getStorage: () => localStorage,
    }))