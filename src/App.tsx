// import './App.css'
// import Login from './auth/Login'
// import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import SignUp from './auth/SignUp'
// import ForgotPassword from './auth/ForgotPassword'
// import ResetPassword from './auth/ResetPassword'
// import VerifyEmail from './auth/VerifyEmail'
// import MainLayout from './layout/MainLayout'
// import HereSection from './components/HeroSection'
// import Profile from './components/Profile'
// import SearchPage from './components/SearchPage'
// import RestaurantDetail from './components/RestaurantDetails'
// import Cart from './components/Cart'
// import Restaurant from './admin/Restaurant'
// import AddMenu from './admin/AddMenu'
// import Order from './admin/Order'
// import Success from './components/Success'
// import { useUserStore } from './store/useUserStore'
// import { Navigate } from 'react-router-dom'
// import { useEffect } from 'react'
// import Loading from './components/Loading'
// import AllRestaurants from './components/AllRestaurant'
// import { useThemeStore } from './store/useThemeStore'
// import './i18n';

// const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
//   const { isAuthenticated, user } = useUserStore();
//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }
//   if(!user){
//     return <Navigate to="/login" replace />;
//   }

//   if (!user?.isVerified) {
//     return <Navigate to="/verify-email" replace />;
//   }
  
//   return children;
// };



// const AuthenticatedUser = ({ children }: { children: React.ReactNode }) => {
//   const { isAuthenticated, user } = useUserStore();
//   if (isAuthenticated && user?.isVerified) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
  
// };

// const AdminRoute = ({children}:{children:React.ReactNode}) => {
//   const {user, isAuthenticated} = useUserStore();
//   if(!isAuthenticated){
//     return <Navigate to="/login" replace/>
//   }
//   if(!user?.admin){
//     return <Navigate to="/" replace/>
//   }

//   return children;
// }

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <ProtectedRoutes><MainLayout/></ProtectedRoutes>,
//     children: [
//       {
//         path: '',
//         element: <HereSection />
//       },
//       {
//         path:'/profile',
//         element: <Profile /> 
//       },
//       {
//         path: "/search/:text",
//         element: <SearchPage />,
//       },
//       {
//         path: "/restaurant/:id",
//         element: <RestaurantDetail />,
//       },
//       {
//         path: "/cart",
//         element: <Cart />,
//       },
//       {
//         path: "/order/status",
//         element: <Success />,
//       },
//       {
//         path: "/Restaurants",
//         element: <AllRestaurants />,
//       },

//       {
//         path: "/admin/restaurant",
//         element: <AdminRoute><Restaurant /></AdminRoute>,
//       },
//       {
//         path: "/admin/menu",
//         element: <AdminRoute><AddMenu /></AdminRoute>,
//       },
//       {
//         path: "/admin/orders",
//         element: <AdminRoute><Order/></AdminRoute>,
//       },
//     ]
//   },
//   {
//     path: '/login',
//     element: <AuthenticatedUser><Login /></AuthenticatedUser>
//   },
//   {
//     path: '/signup',
//     element: <AuthenticatedUser><SignUp /></AuthenticatedUser>
//   },
//   {
//     path: '/forgot-password',
//     element: <AuthenticatedUser><ForgotPassword/></AuthenticatedUser>
//   },
//   {
//     path: '/reset-password/:token',
//     element: <ResetPassword/>
//   },
//   {
//     path: '/verify-email',
//     element: <VerifyEmail/>
//   },
// ])
// function App() {
//   const {checkAuthentication, isCheckingAuth} = useUserStore();
//   const initializeTheme = useThemeStore((state:any) => state.initializeTheme);

//   useEffect(()=>{
//     checkAuthentication();
//     initializeTheme();
//   },[checkAuthentication])

//   if(isCheckingAuth) return <Loading/>
    
//   return (
//     <>

//       <RouterProvider router={router} />

//     </>

//   )
// }

// export default App

import './App.css'
import Login from './auth/Login'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import SignUp from './auth/SignUp'
import ForgotPassword from './auth/ForgotPassword'
import ResetPassword from './auth/ResetPassword'
import VerifyEmail from './auth/VerifyEmail'
import MainLayout from './layout/MainLayout'
import HereSection from './components/HeroSection'
import Profile from './components/Profile'
import SearchPage from './components/SearchPage'
import RestaurantDetail from './components/RestaurantDetails'
import Cart from './components/Cart'
import Restaurant from './admin/Restaurant'
import AddMenu from './admin/AddMenu'
import Order from './admin/Order'
import Success from './components/Success'
import { useUserStore } from './store/useUserStore'
import { useEffect } from 'react'
import Loading from './components/Loading'
import AllRestaurants from './components/AllRestaurant'
import { useThemeStore } from './store/useThemeStore'
import './i18n';

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (!user?.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

const AuthenticatedUser = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();
  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated } = useUserStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (!user?.admin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '',
        element: <HereSection />,
      },
      {
        path: '/profile',
        element: (
          <ProtectedRoutes>
            <Profile />
          </ProtectedRoutes>
        ),
      },
      {
        path: '/search/:text',
        element: (
          <ProtectedRoutes>
            <SearchPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: '/restaurant/:id',
        element: (
          <ProtectedRoutes>
            <RestaurantDetail />
          </ProtectedRoutes>
        ),
      },
      {
        path: '/cart',
        element: (
          <ProtectedRoutes>
            <Cart />
          </ProtectedRoutes>
        ),
      },
      {
        path: '/order/status',
        element: (
          <ProtectedRoutes>
            <Success />
          </ProtectedRoutes>
        ),
      },
      {
        path: '/Restaurants',
        element: (
          <ProtectedRoutes>
            <AllRestaurants />
          </ProtectedRoutes>
        ),
      },
      {
        path: '/admin/restaurant',
        element: (
          <AdminRoute>
            <Restaurant />
          </AdminRoute>
        ),
      },
      {
        path: '/admin/menu',
        element: (
          <AdminRoute>
            <AddMenu />
          </AdminRoute>
        ),
      },
      {
        path: '/admin/orders',
        element: (
          <AdminRoute>
            <Order />
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: (
      <AuthenticatedUser>
        <Login />
      </AuthenticatedUser>
    ),
  },
  {
    path: '/signup',
    element: (
      <AuthenticatedUser>
        <SignUp />
      </AuthenticatedUser>
    ),
  },
  {
    path: '/forgot-password',
    element: (
      <AuthenticatedUser>
        <ForgotPassword />
      </AuthenticatedUser>
    ),
  },
  {
    path: '/reset-password/:token',
    element: <ResetPassword />,
  },
  {
    path: '/verify-email',
    element: <VerifyEmail />,
  },
]);

function App() {
  const { checkAuthentication, isCheckingAuth } = useUserStore();
  const initializeTheme = useThemeStore((state: any) => state.initializeTheme);

  useEffect(() => {
    checkAuthentication();
    initializeTheme();
  }, [checkAuthentication]);

  if (isCheckingAuth) return <Loading />;

  return <RouterProvider router={router} />;
}

export default App;
