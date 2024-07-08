import { Outlet } from 'react-router-dom';
import Navbar from '../../layouts/Navbar';
import Sidebar from '../../layouts/Sidebar';

export default function DashboardLayout() {
	return (
		<div className="flex h-screen">
			<Sidebar />
			<div className="flex flex-col size-full overflow-y-auto">
				<Navbar />
				<main className="container mx-auto p-6">
					<Outlet />
				</main>
			</div>
		</div>
	);
}
