import { cx } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthProvider'
import { Clock, LoaderCircle, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

export default function Header() {
	const auth = useAuth()
	const navigate = useNavigate()

	const [logOutPending, setLogOutPending] = useState(false)
	const [headerOpen, setHeaderOpen] = useState(false)

	const handleLogOut = async () => {
		setLogOutPending(true)
		const success = await auth.logOut()
		console.log(success)
		if (!success) {
			setLogOutPending(false)
		} else {
			setLogOutPending(false)
			navigate('/')
		}
	}

	return (
		<nav className='bg-white border-gray-200 drop-shadow-md'>
			<div className='max-w-screen-xl flex flex-col md:flex-row w-full items-center justify-between mx-auto p-4'>
				<div className='flex w-full grow'>
					<NavLink to='/' className='flex items-center space-x-3 rtl:space-x-reverse grow'>
						<Clock className='text-blue-600' />
						<span className='self-center text-2xl font-semibold whitespace-nowrap'>Time Off Manager</span>
					</NavLink>
					<div className='md:hidden'>
						{
							!headerOpen ?
								<button onClick={() => setHeaderOpen(true)}>
									<Menu />
								</button>
								:
								<button onClick={() => setHeaderOpen(false)}>
									<X />
								</button>
						}
					</div>
				</div>
				<div className={cx(
					'w-full md:w-auto flex flex-col md:shrink-0',
					!headerOpen ? 'hidden md:block' : 'block'
				)}>
					<div className='font-medium border-gray-100 rounded-lg  flex flex-col md:flex-row space-x-8 mt-0 border-0 bg-white'>
						<NavLink to='/about'
							className={({ isActive }) => cx(
								'block py-2 px-3 text-gray-900 rounded-sm border-0 hover:text-blue-700',
								isActive ? 'text-blue-600' : ''
							)}>
							About
						</NavLink>
						{
							auth.user ?
								<>
									<div className='block py-2 px-3 text-gray-500 rounded-sm border-0'>
										Logged in as {
											auth.user.name
										}
									</div>
									<button onClick={() => handleLogOut()} disabled={logOutPending} type='submit'
										className={cx('flex items-center justify-center cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center',
											logOutPending ? 'bg-blue-400 hover:bg-blue-400' : ''
										)}>
										{
											logOutPending ?
												<span>
													Logging Out...
												</span> :
												<span>
													Log Out
												</span>
										}
										{
											logOutPending &&
											<LoaderCircle className='animate-spin ml-2' />
										}
									</button>
								</> :
								<NavLink to='/login'
									className={({ isActive }) => cx(
										'block py-2 px-3 text-gray-900 rounded-sm border-0 hover:text-blue-700',
										isActive ? 'text-blue-500' : ''
									)}>
									Log In
								</NavLink>
						}
					</div>
				</div>
			</div>
		</nav >
	)
}