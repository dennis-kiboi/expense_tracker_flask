import {
	CreditCardIcon,
	Squares2X2Icon,
	SwatchIcon,
	TicketIcon,
	UserIcon,
} from '@heroicons/react/24/outline';

export const menuItems = [
	{
		path: '/dashboard',
		title: 'Home',
		icon: <Squares2X2Icon className="size-5" />,
	},
	{
		path: '/dashboard/wallets',
		title: 'Wallets',
		icon: <CreditCardIcon className="size-5" />,
	},
	{
		path: '/dashboard/categories',
		title: 'Categories',
		icon: <SwatchIcon className="size-5" />,
	},
	{
		path: '/dashboard/transactions',
		title: 'Transactions',
		icon: <TicketIcon className="size-5" />,
	},
	{
		path: '/dashboard/profile',
		title: 'Profile',
		icon: <UserIcon className="size-5" />,
	},
];
