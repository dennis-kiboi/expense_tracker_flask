import AddTransaction from '../../components/AddTransaction';
import SectionHeading from '../../components/SectionHeading';
import TotalCard from '../../components/TotalCard';
import Table from '../../components/CustomTable';

import { data, totalCardsData } from '../../data';

export default function Home() {
	return (
		<div className="mt-10">
			<div className="grid grid-cols-3 gap-5">
				{totalCardsData.map((data) => (
					<TotalCard
						key={data.id}
						title={data.title}
						amount={data.amount}
						description={data.description}
					/>
				))}
			</div>

			{/* list transactions */}
			<div className="mt-20">
				<div className="flex items-center justify-between">
					<SectionHeading
						title={'Transactions'}
						description={'List of your recent transactions'}
					/>

					<AddTransaction />
				</div>

				{/* Transaction table */}
				<div className="mt-10">
					<Table data={data} />
				</div>
			</div>
		</div>
	);
}
