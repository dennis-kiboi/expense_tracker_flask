export default function WalletCard({ name, balance, createdAt }) {
	return (
		<div className="border px-4 py-5 shadow-md rounded-xl">
			<h1 className="text-base font-bold tracking-tight text-primary">
				{name}
			</h1>

			<h1 className="text-xl font-bold tracking-tight my-5">
				KES {balance}
			</h1>
			<p className="text-xs text-gray-500 text-end">{createdAt}</p>
		</div>
	);
}
