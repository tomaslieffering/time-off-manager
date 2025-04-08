export default function LeaveRequestSkeleton() {
	return (
		<div className='border border-gray-200 rounded-xl p-4 pt-8'>
			<div role='status' className='max-w-sm animate-pulse'>
				<div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4'></div>
				<div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5'></div>
				<div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5'></div>
				<div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px]'></div>
				<span className='sr-only'>Loading...</span>
			</div>
		</div>
	)
}