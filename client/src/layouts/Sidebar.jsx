import { Link, useLocation } from 'react-router-dom';
import { menuItems } from './MenuConfig';
import Logo from '../components/logo';

export default function Sidebar() {
	return (
		<aside className="top-0 w-72 h-screen border-r border-dashed p-3">
			<div className="px-2 cursor-pointer">
				<Link to={'/dashboard'}>
					<Logo />
				</Link>
			</div>
			<div className="mt-12 flex flex-col gap-2">
				<h5 className="text-gray-500 font-bold text-xs capitalize pl-3">
					Overview
				</h5>
				<ul className="flex flex-col gap-2">
					{menuItems.map((item, index) => (
						<SidebarItem
							path={item.path}
							title={item.title}
							icon={item.icon}
							key={index}
						/>
					))}
				</ul>
			</div>
		</aside>
	);
}

function SidebarItem({ path, title, icon }) {
	const location = useLocation();

	// compare the browser url with the currently selected path
	const active = path === location.pathname;

	return (
		<li className="relative">
			<Link
				to={path}
				className={
					active
						? 'bg-primary text-white flex cursor-pointer items-center gap-2 rounded-md p-2 font-medium'
						: 'text-gray-500 hover:bg-primary/[0.1] hover:text-primary flex cursor-pointer items-center gap-2 rounded-md p-2 font-medium'
				}
			>
				{icon}
				<span className="text-xs">{title}</span>
			</Link>
		</li>
	);
}
