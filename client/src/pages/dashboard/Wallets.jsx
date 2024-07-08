import AddWallet from '../../components/AddWallet';
import WalletCard from '../../components/WalletCard';
import { walletData } from '../../data';

export default function Wallets() {
	return (
		<div className="mt-10">
			<div className="grid grid-cols-3 xl:grid-cols-4 gap-5">
				<AddWallet />

				{walletData.map((data) => (
					<WalletCard
						name={data.name}
						key={data.id}
						balance={data.balance}
						createdAt={data.createdAt}
					/>
				))}
			</div>
		</div>
	);
}
