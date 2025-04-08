import { cx } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthProvider'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { LoaderCircle } from 'lucide-react'

export default function LogInPage() {
	const auth = useAuth()
	const navigate = useNavigate()
	const [logInFailed, setLoginFailed] = useState(false)
	const [logInPending, setLogInPending] = useState(false)

	const loginSchema = z.object({
		email: z.string().min(1, 'Email is required').email('Please enter a valid email.'),
		password: z.string().min(1, 'Password is required')
	})

	type LogInFormValues = z.infer<typeof loginSchema>

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LogInFormValues>({
		resolver: zodResolver(loginSchema),
	})

	const onSubmit: SubmitHandler<LogInFormValues> = async (data) => {
		setLogInPending(true)
		const success = await auth.logIn(data)
		if (!success) {
			setLoginFailed(true)
			setLogInPending(false)
		} else {
			setLoginFailed(false)
			setLogInPending(false)
			navigate('/requests')
		}
	}

	return (
		<div className='flex flex-col items-center w-full my-16'>
			<h1 className="text-strong text-xl/8 font-medium mt-8">Log in</h1>
			<p className="text-default  mt-1.5 mb-8 text-gray-500">Log in to use Time Off Manager</p>
			<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center w-full max-w-96'>
				<div className='mb-5 w-full'>
					<label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900'>Email</label>
					<input placeholder='Email' {...register('email')} id='email'
						className={cx(
							'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5',
							errors.email ? 'border-red-600' : ''
						)}
					/>
					{errors.email && <span className='block mt-2 text-sm font-medium text-red-600'>{errors.email.message}</span>}
				</div>
				<div className='mb-5 w-full'>
					<label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900'>Password</label>
					<input type='password' placeholder='Password' id='password' {...register('password')}
						className={cx(
							'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5',
							errors.password ? 'border-red-600' : ''
						)}
					/>
					{errors.password && <span className='block mt-2 text-sm font-medium text-red-600'>{errors.password.message}</span>}
				</div>
				{
					logInFailed &&
					<span className='block mb-4 text-sm font-medium text-red-600'>Log in failed, credentials did not match</span>
				}

				<button disabled={logInPending} type='submit'
					className={cx('flex items-center  justify-center min-w-48 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center',
						logInPending ? 'bg-blue-400 hover:bg-blue-400' : ''
					)}>
					{
						logInPending ?
							<span>
								Logging in...
							</span> :
							<span>
								Log in
							</span>
					}
					{
						logInPending &&
						<LoaderCircle className='animate-spin ml-2' />
					}
				</button>
			</form>
		</div>
	)

}