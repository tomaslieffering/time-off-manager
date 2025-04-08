export default function DaysOfTheWeek() {
	const daysOfTheWeek = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	]

	return (
		<div className='hidden grid-cols-7 lg:grid border-b border-gray-300 mt-8 mb-4 font-semibold'>
			{
				daysOfTheWeek.map((day) => {
					return (
						<div className='p-1.5'>
							{day}
						</div>
					)
				})
			}
		</div>
	)
}