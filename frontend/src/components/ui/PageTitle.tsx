import { cx } from '@/lib/utils';

export default function PageTitle({ title, className }: { title: string, className?: string }) {
	return (
		<h1
			className={cx('mt-8 text-3xl font-semibold tracking-tight text-balance text-gray-900',
				className
			)}>
			{title}
		</h1>
	)
}