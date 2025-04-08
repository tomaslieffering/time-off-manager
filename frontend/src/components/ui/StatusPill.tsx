import { cx } from '@/lib/utils';
import { ReactElement } from 'react';

export default function StatusPill({ icon, className, status }: { icon: ReactElement, className: string, status: string }) {
	return (
		<div className={cx('py-2 px-4 flex items-center text-white rounded-full', className)}>
			<span className='mr-1 uppercase text-sm tracking-wider font-semibold'>
				{status}
			</span>
			{icon}
		</div>
	)
}