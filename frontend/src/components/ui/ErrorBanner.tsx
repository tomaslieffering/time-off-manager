import { Info } from 'lucide-react';

export default function ErrorBanner() {
	return (
		<div className='mt-8 p-4 mb-4 text-red-800 border border-red-300 rounded-lg bg-red-50' role='alert'>
			<div className='flex items-center'>
				<Info className='mr-2' />
				<h3 className='text-lg font-medium'>Something went wrong, please refresh the page</h3>
			</div>
		</div>
	)
}