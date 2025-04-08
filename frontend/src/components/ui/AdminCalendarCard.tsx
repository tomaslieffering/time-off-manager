import { format, formatDistanceStrict, isAfter, isBefore } from 'date-fns'
import { type LeaveRequest } from '@/types/LeaveRequest';
import { getStatusPill } from '@/components/ui/StatusPill';

export default function AdminCalendarCard({ leaveRequest }: { leaveRequest: LeaveRequest }) {

	const today = new Date()

	return (
		<div className='border border-gray-200 rounded-xl p-4 flex'>
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
			<div className='shrink-0 flex flex-col text-gray-500 items-end text-sm'>
				<span>
					{
						'Requested by ' + leaveRequest.requester.name
					}
				</span>
				{
					leaveRequest.approver &&
					<span>
						{
							'Approved by ' + leaveRequest.approver.name
						}
					</span>
				}
				{
					isAfter(leaveRequest.date_end, today) && isBefore(leaveRequest.date_start, today) &&
					<span>
						{
							'Days till finished: ' + formatDistanceStrict(leaveRequest.date_end, today)
						}
					</span>
				}
			</div>
		</div>
	)
}