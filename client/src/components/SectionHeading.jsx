export default function SectionHeading({ title, description }) {
	return (
		<div className="flex flex-col gap-y-1.5">
			<h2 className="text-2xl font-bold tracking-tight text-gray-800">
				{title}
			</h2>

			{description && (
				<p className="text-sm text-gray-500">{description}</p>
			)}
		</div>
	);
}
