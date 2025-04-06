import { cx } from '@/lib/utils'
import { Clock } from 'lucide-react'
import { NavLink } from 'react-router-dom'

export default function Header() {
	return (
		<nav className='bg-white border-gray-200'>
			<div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
				<NavLink to='/' className='flex items-center space-x-3 rtl:space-x-reverse'>
					<Clock className='text-blue-600' />
					<span className='self-center text-2xl font-semibold whitespace-nowrap'>Time Off Manager</span>
				</NavLink>
				<div className='block w-auto'>
					<div className='font-medium flex border-gray-100 rounded-lg  flex-row space-x-8 rtl:space-x-reverse mt-0 border-0 bg-white'>
						<NavLink to='/about'
							className={({ isActive }) => cx(
								'block py-2 px-3 text-gray-900 rounded-sm border-0 hover:text-blue-700',
								isActive ? 'text-blue-500' : ''
							)}>
							About
						</NavLink>
						<NavLink to='/login'
							className={({ isActive }) => cx(
								'block py-2 px-3 text-gray-900 rounded-sm border-0 hover:text-blue-700',
								isActive ? 'text-blue-500' : ''
							)}>
							Login
						</NavLink>
					</div>
				</div>
			</div>
		</nav>
	)
}