import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
// import { RestaurantFormSchema } from "@/schema/restaurantSchema";
import { toast } from "sonner";
import { MenuItem, RestaurantState } from "@/type/RestaurantType";
import { Orders } from "@/type/orderType";


const API_END_POINT = "http://localhost:5000/api/v1/restaurant"
axios.defaults.withCredentials = true;



export const useRestaurantStore = create<RestaurantState>()(persist((set,get) => ({
    loading: false,
    restaurant: null,
    searchedRestaurant: null,
    appliedFilter: [],
    singleRestaurant: null,
    restaurants: [],
    restaurantOrder: [],

    createRestaurant: async (formData: FormData) => {
        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (response.data.success) {
                toast.success(response.data.message);
                set({ loading: false });
            }
        } catch (error: any) {
            toast.error(error.response.data.message);
            set({ loading: false });
        }
    },
    getRestaurant: async () => {
        try {
            set({ loading: true });
            const response = await axios.get(`${API_END_POINT}/`);
            console.log("get restaurant response", response)
            if (response.data.success) {
                set({ loading: false, restaurant: response.data.data });
            }
        } catch (error: any) {
            if (error.response.status === 404) {
                set({ restaurant: null });
            }
            set({ loading: false });
        }
    },
    updateRestaurant: async (formData: FormData) => {
        try {
            set({ loading: true });
            const response = await axios.put(`${API_END_POINT}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.success) {
                toast.success(response.data.message);
                set({ loading: false });
            }
        } catch (error: any) {
            toast.error(error.response.data.message);
            set({ loading: false });
        }
    },
    searchRestaurant: async (searchText: string, searchQuery: string, selectedCuisines: any) => {
        try {
            set({ loading: true });

            const params = new URLSearchParams();
            params.set("searchQuery", searchQuery || "");
            params.set("selectedCuisines", (selectedCuisines || []).join(","));

            // await new Promise((resolve) => setTimeout(resolve, 2000));

            const response = await axios.get(`${API_END_POINT}/search/${searchText}?${params.toString()}`);
            if (response.data.success) {
                set({ loading: false, searchedRestaurant: response.data });
            }
        } catch (error: any) {
            console.error("Error fetching restaurants:", error);
            set({ loading: false });
            toast.error(error.response?.data?.message || "Failed to fetch restaurants.");
        }

    },
    //real time add
    addMenuToRestaurant: (menu: MenuItem) => {
        set((state: any) => ({
            restaurant: state.restaurant ? { ...state.restaurant, menus: [...state.restaurant.menus, menu] } : null
        }))
    },
    //real time updates
    updateMenuToRestaurant: (updatedMenu: MenuItem) => {
        set((state: any) => {

            if (state.restaurant) {
                const updatedMenuList = state.restaurant.menus.map((menu: any) => menu._id === updatedMenu._id ? updatedMenu : menu);
                return {
                    restaurant: {
                        ...state.restaurant,
                        menus: updatedMenuList
                    }
                }
            }
            return state;
        })
    },
    setAppliedFilter: (value: string) => {
        console.log("applied filter value", value)
        set((state) => {
            const isAlreadyApplied = state.appliedFilter.includes(value);
            const updatedFilter = isAlreadyApplied ? state.appliedFilter.filter((item) => item !== value) : [...state.appliedFilter, value];
            return { appliedFilter: updatedFilter }
        })
    },
    resetAppliedFilter: () => {
        set({ appliedFilter: [] })
    },
    getRestaurantOrders: async () => {
        try {
            const response = await axios.get(`${API_END_POINT}/order`);
            if (response.data.success) {
                set({ restaurantOrder: response.data.data });
            }
        } catch (error) {
            console.log(error);
        }
    },
    updateRestaurantOrder: async (orderId: string, status: string) => {
        try {
            const response = await axios.put(`${API_END_POINT}/order/${orderId}/status`, { status }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.data.success) {
                const updatedOrder = get().restaurantOrder.map((order: Orders) => {
                    return order._id === orderId ? { ...order, status: response.data.status } : order;
                })
                set({ restaurantOrder: updatedOrder });
                toast.success(response.data.message);
            }
        } catch (error: any) {
            toast.error(error.response.data.message);
        }
    },
    getSingleRestaurant: async (id: string) => {

        try {
            set({ loading: true });
            const response = await axios.get(`${API_END_POINT}/${id}`);
            if (response.data.success) {
                set({ loading: false, singleRestaurant: response.data.data });
            }
        } catch (error: any) {
            console.error("Error fetching single restaurant:", error);
            set({ loading: false });
            toast.error(error.response?.data?.message || "Failed to fetch restaurant.");
        }
    },
    fetchRestaurants: async () => {
        const res = await axios.get(`${API_END_POINT}/get/restaurants`);
        set({ restaurants: res.data.data });
      },    
}),

    {
        name: "restaurant-name",
        storage: createJSONStorage(() => localStorage),
    }));


    

