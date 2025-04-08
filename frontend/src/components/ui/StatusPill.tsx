import { cx } from '@/lib/utils';
import { CheckCircle2, CircleHelp, Clock, ListCheck, XCircle } from 'lucide-react';
import { ReactElement } from 'react';

export const getStatusPill = (status: string) => {
	function StatusPill({ icon, className, status }: { icon: ReactElement, className: string, status: string }) {
		return (
			<div className={cx('py-1 px-2 flex items-center text-white rounded-full', className)}>
				<span className='mr-1 uppercase text-xs tracking-wider font-semibold'>
					{status}
				</span>
				{icon}
			</div>
		)
	}

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