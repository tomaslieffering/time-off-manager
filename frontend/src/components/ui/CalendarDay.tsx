import { cx, getUserColour } from '@/lib/utils';
import { LeaveRequest } from '@/types/LeaveRequest';
import { format } from 'date-fns';

export default function CalendarDay({ date, onLeave, inPast }: { date: Date, onLeave: LeaveRequest[], inPast: boolean }) {
	return (
		<div
			className={cx(
				'h-48 p-1.5 shadow-xl bg-white rounded hover:translate-y-2 overflow-hidden',
				inPast ? 'text-gray-500 bg-gray-100 shadow-none opacity-60' : ''
			)}>
			<div className='border-b pt-1 font-semibold border-gray-300 mb-2'>
				{format(new Date(date), 'MMMM do')}
			</div>
			{inPast}
			<div className='flex flex-col gap-0.5 font-semibold'>
				{
					onLeave.map((leaveRequest: LeaveRequest) => {
						return (
							<div className={cx('rounded py-0.5 px-1', getUserColour(leaveRequest.requester.name))}>
								{
									leaveRequest.requester.name
								}
							</div>
						)
					})
				}
			</div>
		</div>
	)
}