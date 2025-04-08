import { format, formatDistanceStrict } from 'date-fns'
import { type LeaveRequest } from '@/types/LeaveRequest';
import { CheckCircle2, LoaderCircle, XCircle } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/api';
import { cx } from '@/lib/utils';
import { getStatusPill } from '@/components/ui/StatusPill';

export default function AdminLeaveRequestCard({ leaveRequest }: { leaveRequest: LeaveRequest }) {
	const queryClient = useQueryClient();

	const approveMutation = useMutation({
		mutationFn: () => {
			return axiosInstance.put(`/api/admin/requests/${leaveRequest.id}/approve`)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['adminRequests'] })
		}
	})

	const rejectMutation = useMutation({
		mutationFn: () => {
			return axiosInstance.put(`/api/admin/requests/${leaveRequest.id}/reject`)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['adminRequests'] })
		}
	})

	return (
		<div className='border border-gray-200 rounded-xl p-4 flex gap-2'>
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
			<div className='shrink-0 flex flex-col gap-1 items-end'>
				<button onClick={() => approveMutation.mutate()} disabled={approveMutation.isPending} type='submit'
					className={cx('flex items-center justify-center cursor-pointer text-white text-sm bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full w-fit px-4 py-2 text-center',
						approveMutation.isPending ? 'bg-green-600 hover:bg-green-600' : ''
					)}>
					<CheckCircle2 className='mr-2' />
					{
						approveMutation.isPending ?
							<span>
								Approving leave request...
							</span> :
							<span>
								Approve leave request
							</span>
					}
					{
						approveMutation.isPending &&
						<LoaderCircle className='animate-spin ml-2' />
					}
				</button>
				<button onClick={() => rejectMutation.mutate()} disabled={rejectMutation.isPending} type='submit'
					className={cx('flex items-center justify-center cursor-pointer text-white text-sm bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full w-fit px-4 py-2 text-center',
						rejectMutation.isPending ? 'bg-red-400 hover:bg-red-400' : ''
					)}>
					<XCircle className='mr-2' />
					{
						rejectMutation.isPending ?
							<span>
								Rejecting leave request...
							</span> :
							<span>
								Reject leave request
							</span>
					}
					{
						rejectMutation.isPending &&
						<LoaderCircle className='animate-spin ml-2' />
					}
				</button>
			</div>
		</div>
	)
}