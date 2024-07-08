export default function Table({ data }) {
	return (
		<table className="table-auto w-full bg-white border border-gray-300 overflow-hidden shadow-md rounded-xl">
			<thead className="rounded-xl border">
				<tr className="bg-gray-100">
					{Object.keys(data[0]).map((column) => (
						<th
							key={column}
							className="p-4 text-left text-gray-600 text-sm font-bold capitalize"
						>
							{column}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{data.map((item) => (
					<tr key={item.id}>
						{Object.values(item).map((item, index) => (
							<td
								className="p-4 border-b text-sm border-gray-200"
								key={index}
							>
								{item}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
}
