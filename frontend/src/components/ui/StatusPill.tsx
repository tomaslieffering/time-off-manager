import { cx } from '@/lib/utils';
import { ReactElement } from 'react';

export default function StatusPill({ icon, className, status }: { icon: ReactElement, className: string, status: string }) {
	return (
		<div className={cx('py-1 px-2 flex items-center text-white rounded-full', className)}>
			<span className='mr-1 uppercase text-xs tracking-wider font-semibold'>
				{status}
			</span>
			{icon}
		</div>
	)
}