import { cx } from '@/lib/utils'
import { useAuth } from '@/providers/AuthProvider'
import { Clock, LoaderCircle } from 'lucide-react'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

export default function Header() {
	const auth = useAuth()
	const navigate = useNavigate()

	const [logOutPending, setLogOutPending] = useState(false)

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
								isActive ? 'text-blue-600' : ''
							)}>
							About
						</NavLink>
						{
							auth.user ?
								<>
									<div className='block py-2 px-3 text-gray-500 rounded-sm border-0'>
										{
											auth.user.name
										}
									</div>
									<button onClick={() => handleLogOut()} disabled={logOutPending} type='submit'
										className={cx('flex items-center  justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center',
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