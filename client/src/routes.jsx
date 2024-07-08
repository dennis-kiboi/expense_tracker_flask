import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import Home from './pages/dashboard/Home';
import Wallets from './pages/dashboard/Wallets';
import Categories from './pages/dashboard/Categories';
import Transactions from './pages/dashboard/Transactions';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Profile from './pages/dashboard/Profile';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
	},
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/register',
		element: <Register />,
	},
	{
		path: '/dashboard',
		element: <DashboardLayout />,
		children: [
			{
				path: '/dashboard',
				element: <Home />,
			},
			{
				path: '/dashboard/wallets',
				element: <Wallets />,
			},
			{
				path: '/dashboard/categories',
				element: <Categories />,
			},
			{
				path: '/dashboard/transactions',
				element: <Transactions />,
			},
			{
				path: '/dashboard/profile',
				element: <Profile />,
			},
		],
	},
]);
