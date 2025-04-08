import { CircleOff } from 'lucide-react';

export default function NoRequestsToShow() {
	return (
		<div className='flex items-center border border-dashed border-gray-200 text-gray-400 rounded-xl px-4 py-8'>
			<CircleOff className='mr-2' />
			<span>
				No requests to show
			</span>
		</div>
	)
}