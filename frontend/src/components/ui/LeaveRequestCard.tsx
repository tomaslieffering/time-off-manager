import { format, formatDistanceStrict } from 'date-fns'
import { type LeaveRequest } from '@/types/LeaveRequest';
import StatusPill from '@/components/ui/StatusPill';
import { Ban, CheckCircle2, CircleHelp, Clock, XCircle } from 'lucide-react';

export default function LeaveRequestCard({ leaveRequest }: { leaveRequest: LeaveRequest }) {
	const getStatusPill = (status: string) => {
		switch (status) {
			case 'approved':
				return <StatusPill icon={<CheckCircle2 />} className='bg-green-500' status={status} />
			case 'rejected':
				return <StatusPill icon={<XCircle />} className='bg-red-500' status={status} />
			case 'pending':
				return <StatusPill icon={<Clock />} className='bg-orange-500' status={status} />
			case 'cancelled':
				return <StatusPill icon={<Ban />} className='bg-blue-500' status={status} />
			default:
				return <StatusPill icon={<CircleHelp />} className='bg-grey-500' status={status} />
		}
	}

	return (
		<div className='border border-gray-200 rounded-xl p-4'>
			<div className='w-full'>
				<div className='flex'>
					<h2 className='grow text-xl mb-1 font-semibold tracking-tight text-balance text-gray-900'>
						{
							leaveRequest.reason + ': ' + formatDistanceStrict(new Date(leaveRequest.date_end), new Date(leaveRequest.date_start))
						}
					</h2>
					{
						getStatusPill(leaveRequest.status)
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