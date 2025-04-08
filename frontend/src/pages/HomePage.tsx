import { useAuth } from '@/contexts/AuthProvider'
import { NavLink } from 'react-router-dom'

export default function HomePage() {

	const auth = useAuth()

	return (
		<>
			{
				auth.user ?
					<div className='bg-white'>
						<div className="mx-auto max-w-2xl py-16">
							<div className="text-center">
								<h1 className="text-3xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
									Welcome {auth.user.name}
								</h1>
								<p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
									What would you like to do today?
								</p>
								<div className="mt-10 flex items-center justify-center gap-x-4">
									<NavLink to='/requests/new' className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
										Submit a new personal leave request
									</NavLink>
									<NavLink to='/requests' className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
										See current and previous personal leave requests
									</NavLink>
									<NavLink to='/calendar' className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
										See your teams upcoming leave
									</NavLink>
								</div>
							</div>
							{
								auth.user.is_admin &&
								<div className='pt-8 mt-8 border-t border-gray-500 text-center flex flex-col items-center justify-center'>
									<h2 className="text-3xl mb-4 font-semibold tracking-tight text-balance text-gray-900">
										Admin menu
									</h2>
									<div className='flex gap-x-4'>
										<NavLink to='/admin/requests' className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
											Manage pending leave requests
										</NavLink>
										<NavLink to='/admin/calendar' className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
											View all upcoming leave requests
										</NavLink>
									</div>
								</div>
							}
						</div>
					</div> :
					<div className='bg-white'>
						<div className="mx-auto max-w-2xl py-16">
							<div className="text-center">
								<h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
									Welcome to Time Off Manager
								</h1>
								<p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
									Please log in to continue
								</p>
								<div className="mt-10 flex items-center justify-center gap-x-6">
									<NavLink to='/login' className='flex items-center  justify-center min-w-48 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'>
										Log In
									</NavLink>
								</div>
							</div>
						</div>
					</div>
			}
		</>

	)
}