import axiosInstance from '@/lib/api'
import { cx } from '@/lib/utils'
import { AddRequestForm } from '@/types/AddRequestForm'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ChevronDown, LoaderCircle } from 'lucide-react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

export default function AddRequestPage() {
	const { isPending, data } = useQuery({
		queryKey: ['userInfo'],
		queryFn: () =>
			axiosInstance.get('/api/user').then((response) => {
				return response.data
			})
	})

	const navigate = useNavigate()
	const queryClient = useQueryClient();

	const addRequestSchema = z.object({
		reason: z.string().min(1, 'Leave reason is required'),
		date_start: z.coerce.date({
			errorMap: ({ code }, { defaultError }) => {
				if (code == 'invalid_date') return { message: 'Please enter a valid date' }
				return { message: defaultError }
			}
		}).min(new Date(), 'Date can not be in the past'),
		date_end: z.coerce.date({
			errorMap: ({ code }, { defaultError }) => {
				if (code == 'invalid_date') return { message: 'Please enter a valid date' }
				return { message: defaultError }
			}
		}).min(new Date(), 'Date can not be in the past'),
		other_reason: z.string().optional()
	}).superRefine((data, ctx) => {
		if (data.date_start > data.date_end) {
			ctx.addIssue({
				message: "Please choose a start date before the end date",
				code: z.ZodIssueCode.custom,
				path: ['date_start']
			})
		}
		if (data.reason === 'Other' && data.other_reason === '') {
			ctx.addIssue({
				message: "Please enter an explanation",
				code: z.ZodIssueCode.custom,
				path: ['other_reason']
			})
		}
	})

	type AddRequestFormValues = z.infer<typeof addRequestSchema>

	const mutation = useMutation({
		mutationFn: (data: AddRequestFormValues) => {
			return axiosInstance.post('/api/requests', data)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['userInfo'] })
			navigate('/requests')
		},
	})

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<AddRequestFormValues>({
		resolver: zodResolver(addRequestSchema),
	})

	const onSubmit: SubmitHandler<AddRequestForm> = (data) => {
		mutation.mutate(data)
	}

	return (
		<div className='flex flex-col w-full my-16'>
			<div className='flex mt-8'>
				<div className='grow'>
					<h1 className="text-strong text-xl/8 font-medium">Submit a new leave request</h1>
					<p className="text-default  mt-1.5 mb-8 text-gray-500">Please enter the start date, end date and reason for your leave</p>
				</div>
				<div className='shrink-0 flex flex-col items-center text-gray-500 font-semibold'>
					Days of leave left:
					{
						isPending ?
							<div>
								...
							</div> :
							<div className='text-3xl font-semibold text-black'>
								{data.data.days}
							</div>
					}
				</div>
			</div>
			<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center w-full'>

				<div className='grid grid-cols-2 w-full gap-4'>
					<div className='mb-5 w-full'>
						<label htmlFor='date_start' className='block mb-2 text-sm font-medium text-gray-900'>Leave start date</label>
						<input type='date' placeholder='Email' {...register('date_start')} id='date_start'
							className={cx(
								'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5',
								errors.date_start ? 'border-red-600' : ''
							)}
						/>
						{errors.date_start && <span className='block mt-2 text-sm font-medium text-red-600'>{errors.date_start.message}</span>}
					</div>

					<div className='mb-5 w-full'>
						<label htmlFor='date_end' className='block mb-2 text-sm font-medium text-gray-900'>Leave end date</label>
						<input type='date' placeholder='Email' {...register('date_end')} id='date_end'
							className={cx(
								'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5',
								errors.date_end ? 'border-red-600' : ''
							)}
						/>
						{errors.date_end && <span className='block mt-2 text-sm font-medium text-red-600'>{errors.date_end.message}</span>}
					</div>
				</div>

				<div className='grid grid-cols-2 w-full gap-4'>
					<div className='mb-5 w-full'>
						<label htmlFor='reason' className='block mb-2 text-sm font-medium text-gray-900'>Reason</label>
						<div className='relative'>
							<select {...register('reason')} id='reason'
								className={cx(
									'appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5',
									errors.reason ? 'border-red-600' : ''
								)}
							>
								<option value="">Select a reason...</option>
								<option value="Sick leave">Sick leave</option>
								<option value="Bereavement leave">Bereavement leave</option>
								<option value="Dependents leave">Dependents leave</option>
								<option value="Annual leave">Annual leave</option>
								<option value="Other">Other</option>
							</select>
							<ChevronDown className='text-gray-700 absolute top-0 right-0 pb-1 translate-y-1/2 -translate-x-1/2' />
						</div>
						{errors.reason && <span className='block mt-2 text-sm font-medium text-red-600'>{errors.reason.message}</span>}
					</div>

					{
						watch('reason') === 'Other' &&
						<div className='mb-5 w-full'>
							<label htmlFor='other_reason' className='block mb-2 text-sm font-medium text-gray-900'>Explanation</label>
							<input placeholder='Explanation' {...register('other_reason')} id='other_reason'
								className={cx(
									'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5',
									errors.other_reason ? 'border-red-600' : ''
								)}
							/>
							{errors.other_reason && <span className='block mt-2 text-sm font-medium text-red-600'>{errors.other_reason.message}</span>}
						</div>
					}
				</div>

				{
					mutation.error &&
					<span className='block mb-4 text-sm font-medium text-red-600'>Oops, something went wrong, please resubmit.</span>
				}

				<button disabled={mutation.isPending} type='submit'
					className={cx('flex items-center  justify-center min-w-48 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center',
						mutation.isPending ? 'bg-blue-400 hover:bg-blue-400' : ''
					)}>
					{
						mutation.isPending ?
							<span>
								Submitting leave request...
							</span> :
							<span>
								Submit leave request
							</span>
					}
					{
						mutation.isPending &&
						<LoaderCircle className='animate-spin ml-2' />
					}
				</button>
			</form >
		</div >
	)
}