import { NavLink } from 'react-router-dom';

export default function NotAuthorizedPge() {

	return (
		<div className='bg-white'>
			<div className="mx-auto max-w-2xl py-16">
				<div className="text-center">
					<h1 className="text-3xl font-semibold tracking-tight text-balance text-gray-900">
						You are not authorized to visit this page
					</h1>
					<div className="mt-10 flex items-center justify-center gap-x-6">
						<NavLink to='/' className='flex items-center  justify-center min-w-48 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'>
							Go to home page
						</NavLink>
					</div>
				</div>
			</div>
		</div>
	)
}