import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import { userLogin, userSingup } from "@/schema/UserSchema";
import { toast } from "sonner";
import { useRestaurantStore } from "@/store/useRestaurantStore";

const API_END_POINT = "http://localhost:5000/api/v1/user"
axios.defaults.withCredentials = true;

const STORE_KEYS = [
    "user-name",
    "restaurant-name",
    "order-name",
];

type User = {
    fullName: string;
    email: string;
    contact: number;
    address: string;
    city: string;
    country: string;
    profilePhoto: string;
    admin: boolean;
    isVerified: boolean;
}

type UserState = {
    user: User | null;
    isAuthenticated: boolean;
    isCheckingAuth: boolean;
    loading: boolean;
    signup: (input: userSingup) => Promise<void>;
    login: (input: userLogin) => Promise<void>;
    verifyEmail: (verificationCode: string) => Promise<void>;
    checkAuthentication: () => Promise<void>;
    logout: () => Promise<void>;
    forgotPassword: (email: string) => Promise<void>;
    resetPassword: (token: string, newPassword: string) => Promise<void>;
    updateProfile: (input: any) => Promise<void>;
    getCurrentUser: () => Promise<void>;
}

export const useUserStore = create<UserState>()(persist((set) => ({
    user: null,
    isAuthenticated: false,
    isCheckingAuth: true,
    loading: false,

    signup: async (input: userSingup) => {
        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/signup`, input, {
                headers: { 'Content-Type': 'application/json' }
            });
            if (response.data.success) {
                toast.success(response.data.message);
                set({ loading: false, user: response.data.data.user, isAuthenticated: true });
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Signup failed");
            set({ loading: false });
        }
    },
    login: async (input: userLogin) => {
        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/login`, input, {
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.data.success) {
                toast.success(response.data.message);
                set({ loading: false, user: response.data.data.data, isAuthenticated: true });
                useRestaurantStore.getState().getRestaurant();
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Login failed");
            set({ loading: false });
        }
    },
    verifyEmail: async (verificationCode: string) => {
        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/verify-email`, { verificationCode }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.data.success) {
                toast.success(response.data.data);
                set({ loading: false, user: response.data.data, isAuthenticated: true });
            }
        } catch (error: any) {
            toast.success(error.response.data.message);
            set({ loading: false });
        }
    },
    checkAuthentication: async () => {
        try {
            set({ isCheckingAuth: true });
            const response = await axios.get(`${API_END_POINT}/check-auth`);
            if (response.data.success) {
                set({ user: response.data.data, isAuthenticated: true, isCheckingAuth: false });
            }
        } catch (error) {
            set({ isAuthenticated: false, isCheckingAuth: false });
        }
    },
    logout: async () => {
        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/logout`);
            if (response.data.success) {
                toast.success(response.data.data);
                set({ loading: false, user: null, isAuthenticated: false });
                STORE_KEYS.forEach(key => localStorage.removeItem(key));
                window.location.href = "/login";
            }
        } catch (error: any) {
            toast.error(error.response?.data?.data || "Logout failed");
            set({ loading: false });
        }
    },
    forgotPassword: async (email: string) => {
        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/forget-password`, { email });
            if (response.data.success) {
                toast.success(response.data.message);
                set({ loading: false });
            }
        } catch (error: any) {
            toast.error(error.response.data.message);
            set({ loading: false });
        }
    },
    resetPassword: async (token: string, newPassword: string) => {
        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/reset-password/${token}`, { newPassword });
            if (response.data.success) {
                toast.success(response.data.data);
                set({ loading: false });
            }
        } catch (error: any) {
            toast.error(error.response.data.message);
            set({ loading: false });
        }
    },
    updateProfile: async (input: any) => {
        try {
            const response = await axios.put(`${API_END_POINT}/profile/update`, input, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.data.success) {
                toast.success(response.data.message);
                set({ user: response.data.data, isAuthenticated: true });
            }
        } catch (error: any) {
            toast.error(error.response.data.message);
        }

    },
    getCurrentUser: async () => {
        try {
            const response = await axios.get(`${API_END_POINT}/`);
            if (response.data.success) {
                set({ user: response.data.user, isAuthenticated: true });
            }
        } catch (error: any) {
            toast.error(error.response.data.message);
        }
    },

}),
    {
        name: 'user-name',
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
            user: state.user,
            isAuthenticated: state.isAuthenticated
        }),

    }
))