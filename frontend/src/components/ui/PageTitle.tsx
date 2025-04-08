export default function PageTitle({ title }: { title: string }) {
	return (
		<h1 className='pt-8 text-3xl font-semibold tracking-tight text-balance text-gray-900'>
			{title}
		</h1>
	)
}