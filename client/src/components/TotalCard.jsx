export default function TotalCard({ title, amount, description }) {
	return (
		<div className="border px-4 py-5 shadow-md rounded-xl">
			<h1 className="text-lg font-bold tracking-tight text-primary">
				{title}
			</h1>
			<p className="text-xs text-gray-500">{description}</p>
			<h1 className="text-2xl font-bold tracking-tight mt-5">
				KES {amount}
			</h1>
		</div>
	);
}
