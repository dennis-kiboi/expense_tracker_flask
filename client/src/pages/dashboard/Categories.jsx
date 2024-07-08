import AddCategory from '../../components/AddCategory';
import Table from '../../components/CustomTable';
import SectionHeading from '../../components/SectionHeading';
import { categories } from '../../data';

export default function Categories() {
	return (
		<div className="mt-10">
			<div className="flex items-center justify-between">
				<SectionHeading
					title={'Categories'}
					description={'Add your expense categories'}
				/>

				<AddCategory />
			</div>

			{/* Transaction table */}
			<div className="mt-10">
				<Table data={categories} />
			</div>
		</div>
	);
}
