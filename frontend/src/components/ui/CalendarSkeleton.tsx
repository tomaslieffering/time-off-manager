export default function CalendarSkeleton() {
	return (
		<div className='grid lg:grid-cols-7 gap-2 lg:gap-1 grid-cols-3'>
			<div className='hidden lg:block col-span-2'>
			</div>
			{
				Array.from(Array(28).keys()).map(() => {
					return (
						<div className='h-48 p-1.5 shadow-xl bg-white rounded hover:translate-y-2'>
							<div role='status' className='max-w-sm animate-pulse'>
								<div className='border-b pt-1 font-semibold border-gray-300 mb-2'>
									<div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-12 mb-1'></div>
								</div>
								<div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-20 mb-2.5'></div>
								<div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2.5'></div>
								<div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px]'></div>
							</div>
						</div>
					)
				})
			}
		</div>
	)
}