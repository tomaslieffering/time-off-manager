import { cx } from '@/lib/utils';
import { Clock } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export default function Footer() {
	return (
		<footer className='w-full max-w-screen-xl mx-auto p-4 md:py-8'>
			<div className='sm:flex sm:items-center sm:justify-between'>
				<NavLink to='/' className='flex items-center space-x-3 rtl:space-x-reverse'>
					<Clock className='text-blue-600' />
					<span className='self-center text-2xl font-semibold whitespace-nowrap'>Time Off Manager</span>
				</NavLink>
				<div className='flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0'>
					<NavLink to='/about'
						className={({ isActive }) => cx(
							'block py-2 px-3 text-gray-500 rounded-sm border-0 hover:text-blue-700',
							isActive ? 'text-blue-500' : ''
						)}>
						About
					</NavLink>
				</div>
			</div>
			<hr className='my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8' />
			<span className='block text-sm text-gray-500 sm:text-center dark:text-gray-400'>© {new Date().getFullYear()} <a href='https://github.com/tomaslieffering' className='hover:underline'>Tomas Lieffering</a>. All Rights Reserved.</span>
		</footer>
	)
}