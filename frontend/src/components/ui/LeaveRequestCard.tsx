import { format, formatDistanceStrict } from 'date-fns'
import { type LeaveRequest } from '@/types/LeaveRequest';
import StatusPill from '@/components/ui/StatusPill';
import { Ban, CheckCircle2, CircleHelp, Clock, ListCheck, LoaderCircle, XCircle } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/api';
import { cx } from '@/lib/utils';

export default function LeaveRequestCard({ leaveRequest }: { leaveRequest: LeaveRequest }) {
	const getStatusPill = (status: string) => {
		switch (status) {
			case 'approved':
				return <StatusPill icon={<CheckCircle2 />} className='bg-green-500' status={status} />
			case 'rejected':
				return <StatusPill icon={<XCircle />} className='bg-red-500' status={status} />
			case 'pending':
				return <StatusPill icon={<Clock />} className='bg-orange-500' status={status} />
			case 'completed':
				return <StatusPill icon={<ListCheck />} className='bg-blue-500' status={status} />
			default:
				return <StatusPill icon={<CircleHelp />} className='bg-grey-500' status={status} />
		}
	}

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: () => {
			return axiosInstance.delete(`/api/requests/${leaveRequest.id}`)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['userRequests'] })
		}
	})

	return (
		<div className='border border-gray-200 rounded-xl p-4'>
			<div className='w-full'>
				<div className='flex'>
					<div className='flex items-center grow gap-4'>
						<h2 className='text-xl font-semibold tracking-tight text-balance text-gray-900'>
							{
								leaveRequest.reason + ': ' + formatDistanceStrict(new Date(leaveRequest.date_end), new Date(leaveRequest.date_start))
							}
						</h2>
						{
							getStatusPill(leaveRequest.status)
						}
					</div>
					{
						leaveRequest.status === 'pending' &&
						<button onClick={() => mutation.mutate()} disabled={mutation.isPending} type='submit'
							className={cx('flex items-center justify-center cursor-pointer text-white text-sm bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full w-full sm:w-auto px-4 py-2 text-center',
								mutation.isPending ? 'bg-blue-400 hover:bg-blue-400' : ''
							)}>
							<Ban className='mr-2' />
							{
								mutation.isPending ?
									<span>
										Cancelling leave request...
									</span> :
									<span>
										Cancel leave request
									</span>
							}
							{
								mutation.isPending &&
								<LoaderCircle className='animate-spin ml-2' />
							}
						</button>
					}

				</div>
				<div className='mb-1'>
					<span>
						{
							format(new Date(leaveRequest.date_start), 'iiii, MMMM do, y')
						}
					</span>
					<span className='mx-2'>
						-
					</span>
					<span>
						{
							format(new Date(leaveRequest.date_end), 'iiii, MMMM do, y')
						}
					</span>
				</div>
				<div className='text-sm text-gray-500'>
					{
						'Submitted on ' +
						format(new Date(leaveRequest.submitted_date), 'MMMM do y') +
						' by ' +
						leaveRequest.requester.name +
						', last updated ' +
						format(new Date(leaveRequest.updated_date), 'MMMM do y')
					}
				</div>
			</div>
		</div>
	)
}