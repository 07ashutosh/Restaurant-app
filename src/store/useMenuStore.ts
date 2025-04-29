import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
// import { RestaurantFormSchema } from "@/schema/restaurantSchema";
import { toast } from "sonner";
import { useRestaurantStore } from "./useRestaurantStore";

const API_END_POINT = "http://localhost:5000/api/v1/menu"
axios.defaults.withCredentials = true;

type MenuState = {
    loading: boolean;
    menu: null;
    createMenu: (formData: FormData) => Promise<void>;
    editMenu: (formData: FormData, menuId: string) => Promise<void>;
}

export const useMenuStore = create<MenuState>()(persist((set) => ({
    loading: false,
    menu: null,
    createMenu: async (formData: FormData) => {
        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.success) {
                toast.success(response.data.message);
                set({ loading: false, menu: response.data.menu });
            }
            ("addmenu:",response.data.menu)

            useRestaurantStore.getState().addMenuToRestaurant(response.data.menu);

        } catch (error: any) {
            toast.error(error.response.data.message);
            set({ loading: false });

        }
    },
    editMenu: async (formData: FormData, menuId: string) => {
        try {
            set({ loading: true });
            const response = await axios.put(`${API_END_POINT}/${menuId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.success) {
                toast.success(response.data.message);
                set({ loading: false, menu: response.data.menu });
            }
            ("editmenu:",response.data);
            useRestaurantStore.getState().updateMenuToRestaurant(response.data.menu);
        } catch (error: any) {
            toast.error(error.response.data.message);
            set({ loading: false });

        }
    }
}),
    {
        name: "menu-name",
        storage: createJSONStorage(() => localStorage),
    }));